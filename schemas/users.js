var mongoose = require('mongoose');

//申明一个mongoons对象
var usersSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: true
  },
  password: {
    type: String,
    // 设置bcrypt加密
    // set(val) {
    //   return require('bcrypt').hashSync(val, 10)
    // }
    set: (val) => {
      return require('bcryptjs').hashSync(val, 5)
    }
  }
})

//查询的静态方法
// usersSchema.statics = {
//     fetch: function(cb) { //查询所有数据
//         return this
//           .find()
//           .exec(cb) //回调
//     },
//     findById: function(id, cb) { //根据id查询单条数据
//         return this
//           .findOne({_id: id})          
//           .exec(cb)
//     }
// }

//暴露出去的方法
module.exports = usersSchema