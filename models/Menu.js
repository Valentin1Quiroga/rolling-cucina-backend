const {Schema, model} = require("mongoose")

const MenuSchema = new Schema({
    name:{
        type:String,
        required:[true, "El nombre del menu es obiglatorio"],
        trim: true
    },
    description:{
        type:String,
        required:[true, "La descripcion del menu es obiglatoria"],
        trim: true
    },
    category:{
        type:String,
        required:[true, "La categoria del menu es obiglatoria"],
        trim: true,
        enum:["entrada","pizza","pasta","ensalada","otros","bebida","postre"]
    },
    price:{
        type:Number,
        required:[true, "El precio es obligatorio"],
        min:[0,"El precio debe ser mayor a 0"],
    },
    image:{
        type:String,
        trim:true,
        default:"https://animalgourmet.com/wp-content/uploads/2019/05/spaghetti-3547078_1920-e1578933714229.jpg" 
        //Imagen por defecto si al momento no se carga una ruta de enlace.

    }
},{
    versionKey:false,
    timestamps:true,
})

module.exports= model("Menu", MenuSchema)