const { Router } = require("express");
const router = Router();
const ArticleController = require("../controllers/article");
const multer = require("multer");
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./images/article/");
  },

  filename: function (req, file, cb) {
    cb(null, "article" + Date.now() + file.originalname);
  },
});
const uploads = multer({ storage: storage });

router.get("/ruta-de-prueba", ArticleController.pruebaPrimaria);
router.post("/new-article", ArticleController.createArticle);
router.get("/get-all-articles/:quantity?", ArticleController.retrieveAll);
router.get("/get-article/:id", ArticleController.findArticle);
router.delete("/delete-article/:id", ArticleController.deleteArticle);
router.put("/update-article/:id", ArticleController.updateArticle);
router.get(
  "/upload-image/:id",
  [uploads.single("file0")],
  ArticleController.upload
);
router.get("/get-image/:filePath", ArticleController.getImage);
router.get("/search-for", ArticleController.searcher);

module.exports = router;
