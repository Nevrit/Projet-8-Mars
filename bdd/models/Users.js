const mongoose = require('mongoose');
const bcrypt = require('bcrypt');


const UserSchema = new mongoose.Schema(
    {
        name : {type : String, required : true},
        email : {type : String, required: true, unique : true},
        password : {type : String, required : true},
        isConnected : {type : Boolean, default : false, required : false}
    }
)
// Middleware pour hacher le mot de passe avant la sauvegarde
UserSchema.pre('save', async function(next) {
    if (this.isModified('password') || this.isNew) {
        try {
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(this.password, salt);
            this.password = hashedPassword;
            next();
        } catch (error) {
            next(error);
        }
    } else {
        next();
    }
});

const User = mongoose.model('User', UserSchema);
module.exports = User;



