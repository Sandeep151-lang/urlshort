const mongoose = require("mongoose");
var jwt = require('jsonwebtoken')

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    verify: { type: Boolean },
    tokens: [
        {
            token: {
                type: String,
                required: true

            }
        }
    ],
    activetoken: { type: String },
    tokenss: { types: String }
})
userSchema.methods.generateAuthtoken = async function () {
    try {
        let token = jwt.sign({ _id: this._id }, "s")
        this.tokens = this.tokens.concat({ token: token });
        await this.save();
        return token;
    } catch {
        console.log(`err`);
    }
}
module.exports = mongoose.model('user', userSchema)