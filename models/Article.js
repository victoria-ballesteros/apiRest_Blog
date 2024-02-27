//Para elegir sólo objetos específicos de la dependencia
const { Schema, model } = require("mongoose");

const ArticleSchema = Schema({
  title: {
    type: String,
    required: true,
  },
  body: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  image: {
    type: String,
    default: "default.png",
  },
});

module.exports = model("Article", ArticleSchema, "articles");
