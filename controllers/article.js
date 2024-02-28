const Article = require("../models/Article");
const validator = require("validator");
const fs = require("fs");
const path = require("path");

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
  let validatedTitle;
  let validatedBody;

  if (req.body.title == undefined && req.body.body != undefined) {
    validatedTitle = true;
    validatedBody = validator.isEmpty(req.body.body);
  } else if (req.body.title != undefined && req.body.body == undefined) {
    validatedBody = true;
    validatedTitle = validator.isEmpty(req.body.title);
  } else if (req.body.title != undefined && req.body.body != undefined) {
    return res.status(400).json({
      status: "error",
      mensaje: "Request is empty or incomplete.",
    });
  }

  try {
    if (validatedTitle && validatedBody) {
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
  } else if (!validatedTitle && validatedBody) {
    Article.findOneAndUpdate(
      { _id: id },
      { $set: { title: req.body.title } },
      { new: true }
    )
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
  } else if (!validatedBody && validatedTitle) {
    Article.findOneAndUpdate(
      { _id: id },
      { $set: { body: req.body.body } },
      { new: true }
    )
      .exec()
      .then((article) => {
        return res.status(200).json({
          mensaje: "Data succesfully updated.",
          status: "success",
          article,
        });
      })
      .catch((error) => {
        return res.status(500).json({
          status: "error",
          mensaje: "An error ocurred with the updating proccess.",
        });
      });
  }
};

const upload = (req, res) => {
  if (!req.file && !req.files) {
    return res.status(404).json({
      status: "Error",
      message: "Non-existent files",
    });
  }

  let nameFile = req.file.originalname;
  let fileSplit = nameFile.split(".");
  let fileExtension = fileSplit[1];

  if (
    fileExtension != "png" &&
    fileExtension != "jpg" &&
    fileExtension != "jpeg" &&
    fileExtension != "gif"
  ) {
    fs.unlink(req.file.path, (err) => {
      return res.status(404).json({
        status: "Error",
        message: "Invalid file",
      });
    });
  } else {
    let id = req.params.id;

    Article.findOneAndUpdate(
      { _id: id },
      { $set: { image: req.file.filename } },
      { new: true }
    )
      .exec()
      .then((article) => {
        return res.status(200).json({
          mensaje: "Image succesfully updated.",
          status: "success",
          article,
        });
      })
      .catch((error) => {
        return res.status(500).json({
          status: "Error",
          mensaje: "An error ocurred with the updating proccess.",
        });
      });
  }
};

const getImage = (req, res) => {
  let fileName = req.params.filePath;
  let filePath = "./images/article/" + fileName;
  fs.stat(filePath, (error, exists) => {
    if (exists) {
      return res.sendFile(path.resolve(filePath));
    } else {
      return res.status(404).json({
        status: "Error",
        mensaje: "The file does not exist.",
      });
    }
  });
};

const searcher = (req, res) => {
  let keyWord = req.body.keyWord;

  Article.find({
    $or: [
      { title: { $regex: keyWord, $options: "i" } },
      { body: { $regex: keyWord, $options: "i" } },
    ],
  })
    .sort({ date: -1 })
    .exec()
    .then((articles) => {
      if (articles.length > 0) {
        return res.status(200).json({
          mensaje: "Data succesfully retrieved.",
          status: "success",
          articles,
        });
      } else {
        return res.status(404).json({
          mensaje: "No data found to retrieve.",
          status: "Error",
        });
      }
    })
    .catch((error) => {
      return res.status(404).json({
        status: "error",
        mensaje: "There's no data related to the search.",
      });
    });
};

//Exportamos todos los métodos

module.exports = {
  pruebaPrimaria,
  createArticle,
  retrieveAll,
  findArticle,
  deleteArticle,
  updateArticle,
  upload,
  getImage,
  searcher,
};
