const { Router } = require("express");
const router = Router();

const ArticleController = require("../controllers/article");

//esto es una petición individual
router.get("/ruta-de-prueba", ArticleController.pruebaPrimaria);

module.exports = router;
