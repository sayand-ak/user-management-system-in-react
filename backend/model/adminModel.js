import mongoose from "mongoose";
import bcrypt from 'bcryptjs';

const adminSchema = mongoose.Schema({
    username: {
        type: String,
        require: true
    },
    password: {
        type: String, 
        require: true
    }
},
{timestamp: true});

adminSchema.pre('save', async function(next){
    if(!this.isModified('password')){
        next()
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
})

adminSchema.methods.matchPassword = async function(enteredPassword){
    return bcrypt.compare(enteredPassword, this.password);
}

export default mongoose.model("Admin", adminSchema);