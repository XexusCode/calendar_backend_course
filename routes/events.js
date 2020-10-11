const { Router } = require("express");
const { check } = require("express-validator");
const { isDate } = require("../helpers/isDate");
const {
  getEventos,
  crearEventos,
  actualizarEvento,
  eliminarEvento,
} = require("../controllers/events");
const { validarCampos } = require("../middlewares/validar-campos");
const { validarJWT } = require("../middlewares/validar-jwt");

const router = Router();

router.use(validarJWT);

router.get(
  "/",

  getEventos
);
router.post(
  "/",
  [
    check("title", "El titulo es obligatorio").not().isEmpty(),
    check("start", "fecha de inicio es obligatoria").custom(isDate),
    check("end", "fecha de finalizacion es obligatoria").custom(isDate),
  ],
  validarCampos,
  crearEventos
);
router.put("/:id", actualizarEvento);
router.delete("/:id", eliminarEvento);

module.exports = router;
