const { response } = require("express");
const { validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const Usuario = require("../../models/Usuario");
const { generarJSWT } = require("./helpers/jwt");

const createUser = async (req, res = response) => {
  const { email, password } = req.body;

  try {
    let usuario = await Usuario.findOne({ email });

    if (usuario) {
      return res.status(400).json({
        ok: false,
        msg: "Un usuario ya existe con ese correo",
      });
    }

    usuario = new Usuario(req.body);

    // Encriptar contraseña

    const salt = bcrypt.genSaltSync();
    usuario.password = bcrypt.hashSync(password, salt);

    // generar token
    await usuario.save();

    const token = await generarJSWT(usuario.id, usuario.name);

    res
      .status(201)
      .json({ ok: true, uid: usuario.id, nane: usuario.name, token });
  } catch (error) {
    res.status(500).json({
      ok: false,
      msg: "Por favor hable con el administrador",
    });
  }
};

const loginUser = async (req, res = response) => {
  const { email, password } = req.body;
  try {
    const usuario = await Usuario.findOne({ email });

    if (!usuario) {
      return res.status(400).json({
        ok: false,
        msg: "Un usuario no existe con ese email",
      });
    }
    // confirmar los password

    const validPassword = bcrypt.compareSync(password, usuario.password);

    if (!validPassword) {
      return res.status(400).json({
        ok: false,
        msg: "Password incorrecto",
      });
    }

    const token = await generarJSWT(usuario.id, usuario.name);

    res.json({
      ok: true,
      uid: usuario.id,
      name: usuario.name,
      token,
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      msg: "Por favor hable con el administrador",
    });
  }

  res.json({ ok: true, msg: "login", email, password });
};

const revalidateToken = async (req, res = response) => {
  const uid = req.uid;
  const name = req.name;
  const token = await generarJSWT(uid, name);

  res.json({ ok: true, uid, name, token });
};

module.exports = {
  createUser,
  revalidateToken,
  loginUser,
};
