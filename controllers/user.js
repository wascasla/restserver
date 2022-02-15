const bcryptjs = require('bcryptjs');
const {  request, response } = require('express');
const { validationResult } = require('express-validator');
const Usuario = require('../models/usuario');

const usuariosGet = async(req = request, res = response) => {

    const query = { estado: true };
    const { limite = 5, desde = 0 } = req.query;
    /* const usuarios = await Usuario.find(query)
        .skip(Number(desde))
        .limit(Number(limite));

    const total = await Usuario.countDocuments(query); */

    const [ total, usuarios] = await Promise.all([
        Usuario.countDocuments(query),
        Usuario.find(query)
            .skip(Number(desde))
            .limit(Number(limite))
    ])

    res.json({
        total,
        usuarios
    })
}

const usuariosPost = async(req, res = response) => {

    
    const { nombre, correo, password, rol} = req.body;
    const usuario = new Usuario({ nombre, correo, password, rol});

    
    // Encriptar la constraseña
    const salt = bcryptjs.genSaltSync();
    usuario.password = bcryptjs.hashSync(password, salt);

    // Guardar en BD
    usuario.save();

    res.json({
        ok: true,
        msg: 'post API - controlador',
        usuario
    })
}

const usuariosPut = async(req, res = response) => {

    const {id} = req.params;
    const { _id, password, google, correo, ...resto } = req.body;

    //TODO validar contra base de datos
    if (password) {
        // Encriptar la constraseña
        const salt = bcryptjs.genSaltSync();
        resto.password = bcryptjs.hashSync(password, salt);
    }

    const usuario = await Usuario.findByIdAndUpdate(id, resto);

    res.json({
        ok: true,
        msg: 'put API - controlador',
        usuario
    })
}

const usuariosPatch = (req, res = response) => {
    res.json({
        ok: true,
        msg: 'patch API - controlador'
    })
}

const usuariosDelete = async(req, res = response) => {

    const {id} = req.params;

    const usuario = await Usuario.findByIdAndUpdate(id, { estado: false});
    const usuarioAutenticado = req.usuario;

    res.json(usuario);
}

module.exports = {
    usuariosGet,
    usuariosPost,
    usuariosPut,
    usuariosPatch,
    usuariosDelete
}