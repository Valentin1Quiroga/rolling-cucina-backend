const {Schema, model} = require("mongoose");

const PedidoSchema = new Schema({
    user:{
        type: Schema.Types.ObjectId,
        ref: "User",
        required: [true, "Es necesario estar loggeado para hacer el pedido."]
    },
    menu:{
        type: Array,
        required: [true, "Para hacer un pedido debes elegir un plato del menu."]
    },
    status:{
        type: String,
        enum:["pendiente","preparando","listo para entrega","entregado"],
        default:"pendiente"


    }
},{
    versionKey:false,
    timestamps:true
})