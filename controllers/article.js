//Creamos todos los métodos

//Enviamos la request y la respuesta
const pruebaPrimaria = (req, res) => {
  return res.status(200).json({
    mensaje: "I'm a verification of the integrity of the api.",
  });
};

//Exportamos todos los métodos

module.exports = {
  pruebaPrimaria,
};
