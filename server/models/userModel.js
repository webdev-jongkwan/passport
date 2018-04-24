const mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs'); // 암호화를 위한 모듈
const Schema = mongoose.Schema;
const autoIncrement = require('mongoose-auto-increment');

// 스키마 설정
var userSchema = new Schema({
    name : {type: String, required: true, unique: true},
    email : {type: String, required: true, unique: true},
    password : {type: String, required: true},
    createdAt: {type: Date, default: Date.now},
    updatedAt: Date
});

// hash 생성
userSchema.methods.generateHash = function(password){
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};
// 값 비교
userSchema.methods.validPassword = function(password){
    return bcrypt.compareSync(password, this.password)
};

module.exports = mongoose.model('User', userSchema);
autoIncrement.initialize(mongoose.connection);
userSchema.plugin(autoIncrement.plugin, { model: 'Users', field: 'id', startAt: 1});