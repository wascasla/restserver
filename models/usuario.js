const { Schema, model } = require('mongoose');
const bcryptjs = require('bcryptjs');

const UsuarioSchema = Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre es obligaorio']
    },
    correo: {
        type: String,
        required: [true, 'El correo es obligaorio'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'El password es obligaorio']
    },
    img: {
        type: String,
    },
    rol: {
        type: String,
        required: true,
        //enum: ['ADMIN_ROLE','USER_ROLE']
    },
    estado: {
        type: Boolean,
        default: true
    },
    google: {
        type: Boolean,
        default: false
    },
});

UsuarioSchema.methods.toJSON = function() {
    const { __v, password, ...usuario } = this.toObject();
    return usuario;
}

module.exports = model('Usuario', UsuarioSchema);