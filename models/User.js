const { Schema, model} = require("mongoose");

const UserSchema = new Schema({
    name:{
        type:String,
        required:[true,"El nombre es obligatorio"]
    },
    phone:Number,
    email:{
        type:String,
        required:[true,"El email es obligatorio"],
        unique:[true, "Ya hay una cuenta con esta direccion de correo"]
    },
    password:{
        type:String,
        required:[true, "La contraseña es obligatoria"]
    },
    admin:{
        type:Boolean,
        default:false,
    }
},{
versionKey:false,
timestamps:true,
});

UserSchema.methods.toJson = function () {
    const {password, ...user} = this.toObject();
    return user;
}


module.exports = model("User", UserSchema)