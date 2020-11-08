/**
 * user的数据模型
 * timestamps可以自动生成createAt和updateAt两个字段
 * @param {*} app 
 */
module.exports = app => {
    const mongoose = app.mongoose
    const Schema = mongoose.Schema
    const UserSchema = new Schema({
        email: { type: String, required: true },
        pwd: { type: String, required: true },
        nickname: { type: String, required: true },
        avatar: { type: String, required: false },
    }, {
        timestamps: true
    })
    return mongoose.model('User', UserSchema)
}