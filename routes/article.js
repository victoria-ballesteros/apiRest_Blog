const { Router } = require("express");
const router = Router();

const ArticleController = require("../controllers/article");

//esto es una petición individual
router.get("/ruta-de-prueba", ArticleController.pruebaPrimaria);
router.post("/new-Article", ArticleController.crear);
module.exports = router;
