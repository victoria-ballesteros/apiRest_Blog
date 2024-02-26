const validator = require("validator");

//Creamos todos los métodos

//Enviamos la request y la respuesta
const pruebaPrimaria = (req, res) => {
  return res.status(200).json({
    mensaje: "I'm a verification of the integrity of the api.",
  });
};

const crear = (req, res) => {
  const parameters = req.body;
  console.log(parameters);
  try {
    let validatedTitle = validator.isEmpty(parameters.title);
    let validatedBody = validator.isEmpty(parameters.content);

    if (validatedTitle || validatedBody) {
      throw new error("Request of validation denegaded.");
    }
  } catch (error) {
    return res.status(400).json({
      status: "error",
      mensaje: "Request is empty or incomplete.",
    });
  }

  return res.status(200).json({
    mensaje: "Database space succesfully created.",
  });
};

//Exportamos todos los métodos

module.exports = {
  pruebaPrimaria,
  crear,
};
