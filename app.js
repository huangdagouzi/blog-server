var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var mongoose = require("mongoose");
var Token = require("./token_verify");
var expressJwt = require("express-jwt");

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
var articlesRouter = require("./routes/articles");
var frontRouter = require("./routes/front");
var fileRouter = require("./routes/file");

var app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/public', express.static(path.join(__dirname, "public")));

//设置跨域访问
app.all('*', (req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header("Access-Control-Allow-Headers", "Content-Type,Content-Length, Authorization, Accept,X-Requested-With");
  res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
  next();
});

// 解析token获取用户信息
app.use(function(req, res, next) {
  var token = req.headers["Authorization"];
  if (token == undefined) {
    return next();
  } else {
    Token.verToken(token)
      .then(data => {
        console.log(data)
        req.data = data;
        return next();
      })
      .catch(error => {
        return next();
      });
  }
});

//验证token是否过期并规定哪些路由不用验证
app.use(
  expressJwt({
    secret: "huang_he_shen"
  }).unless({
    path: ["/users/register", "/users/login","/front/list", "/front/banner"] //除了这个地址，其他的URL都需要验证
  })
);

//当token失效返回提示信息

app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/articles", articlesRouter);
app.use("/front", frontRouter);
app.use("/file", fileRouter)

app.use(function(err, req, res, next) {
  console.log(err)
  if (err.status == 401) {
    return res.status(401).send({
      code: 401,
      message: "token失效"
    });
  }
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});


// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

mongoose.connect("mongodb://localhost:27017/blog", { useNewUrlParser: true });
mongoose.connection.on("connected", function() {
  console.log("连接成功");
});
mongoose.connection.on("error", function() {
  console.log("连接失败");
});
mongoose.connection.on("disconnected", function() {
  console.log("断开连接");
});

module.exports = app;
