const { Router } = require("express");
const { check } = require("express-validator");
const validarCampos = require("../middlewares/validar-campos");
const { validarJWT } = require("../middlewares/validar-jwt");
const {
  createUser,
  loginUser,
  revalidateToken,
} = require("./controllers/auth");

const router = Router();

router.post(
  "/new",
  [
    // middlewares
    check("name", "El nombre es obligatorio").not().isEmpty(),
    check("email", "El email es obligatorio").isEmail(),
    check("password", "El password debe de ser de 6 caracteres").isLength({
      min: 6,
    }),
  ],
  createUser
);

router.post(
  "/",
  [
    check("email", "El email es obligatorio").isEmail(),
    check("password", "El password debe de ser de 6 caracteres").isLength({
      min: 6,
    }),
  ],
  loginUser
);

router.get("/renew", validarJWT, revalidateToken);

module.exports = router;
