const getUsers = (req,res) =>{
    try {
        const users=["diego","gabriel"]
        res.status(200).json({users})
        
    } catch (error) {
        res.status(error.code || 500).json({message: "Ocurrio un error. Motivo: "+ error.message})
    }
}

module.exports = {
    getUsers
}