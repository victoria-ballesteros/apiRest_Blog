const mongoose = require("mongoose");

//Funcion asincrona
const connection = async() => {
    try{
        await mongoose.connect("mongodb://localhost:27017/my_blog");
        console.log("Succesfully conected to database.");
    }catch(error){
        console.log(error);
        throw new error("The conection is currently unavailable.")
    }
}

module.exports = {
    connection
}