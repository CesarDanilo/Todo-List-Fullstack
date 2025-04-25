const ControllerBuscarUsuarios = async (req, res, next) => {
    return res.status(200).json({
        msg: "Rota funcionando!"
    })
}

module.exports = ControllerBuscarUsuarios;