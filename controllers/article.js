const Article = require("../models/Article");
const validator = require("validator");

//Creamos todos los métodos

//Enviamos la request y la respuesta
const pruebaPrimaria = (req, res) => {
  return res.status(200).json({
    mensaje: "I'm a verification of the integrity of the api.",
  });
};

const createArticle = (req, res) => {
  const parameters = req.body;
  try {
    let validatedTitle = validator.isEmpty(params.title);
    let validatedBody = validator.isEmpty(params.body);
    if (validatedTitle || validatedBody) {
      throw new error("Request of validation denegaded.");
    }
  } catch (error) {
    return res.status(400).json({
      status: "error",
      mensaje: "Request is empty or incomplete.",
    });
  }

  const article = new Article(parameters);

  article
    .save()
    .then((result) => {
      return res.status(200).json({
        mensaje: "Database space succesfully created.",
        status: "success",
        article: result,
      });
    })
    .catch((err) => {
      return res.status(404).json({
        status: "error",
        mensaje: "The data received cannot be saved.",
      });
    });
};

const retrieveAll = (req, res) => {
  let query = Article.find({}).sort({ date: -1 });

  if (req.params.quantity) {
    query.limit(req.params.quantity);
  }
  query
    .exec()
    .then((articles) => {
      return res.status(200).json({
        mensaje: "Data succesfully retrieved",
        status: "success",
        articles,
      });
    })
    .catch((error) => {
      return res.status(404).json({
        status: "error",
        mensaje:
          "An error ocurred with the database or there's no data to retrieve.",
      });
    });
};

const findArticle = (req, res) => {
  let id = req.params.id;
  let query = Article.findById(id)
    .exec()
    .then((articles) => {
      return res.status(200).json({
        mensaje: "Data succesfully retrieved",
        status: "success",
        articles,
      });
    })
    .catch((error) => {
      return res.status(404).json({
        status: "error",
        mensaje:
          "An error ocurred with the database or there's no data to retrieve.",
      });
    });
};

const deleteArticle = (req, res) => {
  let id = req.params.id;
  let query = Article.findOneAndDelete({ _id: id })
    .exec()
    .then((article) => {
      return res.status(200).json({
        mensaje: "Data succesfully deleted",
        status: "success",
        article,
      });
    })
    .catch((error) => {
      return res.status(404).json({
        status: "error",
        mensaje:
          "An error ocurred with the database or there's no data to delete.",
      });
    });
};

const updateArticle = (req, res) => {
  let id = req.params.id;
  let changedArticle = req.body;
  let lenghtOfArticle = 0;
  let validatedTitle = validator.isEmpty(changedArticle.title);
  let validatedBody = validator.isEmpty(changedArticle.body);

  for (let key in changedArticle) {
    lenghtOfArticle++;
  }

  try {
    if (validatedTitle || validatedBody) {
      throw new error("Request of validation denegaded.");
    }
  } catch (error) {
    return res.status(400).json({
      status: "error",
      mensaje: "Request is empty or incomplete.",
    });
  }

  if (!validatedTitle && !validatedBody) {
    console.log("Complete update of the article");
    Article.findOneAndUpdate({ _id: id }, changedArticle, { new: true })
      .exec()
      .then((article) => {
        return res.status(200).json({
          mensaje: "Data succesfully updated.",
          status: "success",
          article,
        });
      })
      .catch((err) => {
        return res.status(500).json({
          status: "error",
          mensaje: "An error ocurred with the updating proccess.",
        });
      });
  } else if (!validatedBody || !validatedTitle) {
    if (!validatedTitle) {
      console.log("Partial update of the article.");
      Article.findOneAndUpdate({ _id: id }, req.body.title)
        .exec()
        .then((article) => {
          return res.status(200).json({
            mensaje: "Data succesfully updated.",
            status: "success",
            article,
          });
        })
        .catch((err) => {
          return res.status(404).json({
            status: "error",
            mensaje: "An error ocurred with the updating proccess.",
          });
        });
    } else if (!validatedBody) {
    }
  }
};

//Exportamos todos los métodos

module.exports = {
  pruebaPrimaria,
  createArticle,
  retrieveAll,
  findArticle,
  deleteArticle,
  updateArticle,
};
