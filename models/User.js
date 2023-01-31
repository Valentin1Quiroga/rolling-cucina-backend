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
        select:false,
        required:[true, "La contraseña es obligatoria"]
    },
    admin:{
        type:Boolean,
        default:false,
    }
})

module.exports = model("User", UserSchema)