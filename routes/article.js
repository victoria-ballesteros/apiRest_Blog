const { Router } = require("express");
const router = Router();

const ArticleController = require("../controllers/article");

//esto es una petición individual
router.get("/ruta-de-prueba", ArticleController.pruebaPrimaria);
router.post("/new-article", ArticleController.createArticle);
router.get("/get-all-articles/:quantity?", ArticleController.retrieveAll);
router.get("/get-article/:id", ArticleController.findArticle);
router.delete("/delete-article/:id", ArticleController.deleteArticle);
router.put("/update-article/:id", ArticleController.updateArticle);

module.exports = router;
