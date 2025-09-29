const mongoose = require("mongoose");
const Joi = require("joi");
const jwt = require("jsonwebtoken");

const countrySchema = new mongoose.Schema({
    name:String,
    capital:String,
    pop:Number,
    img:String,
    date:{
        type:Date, default:Date.now()
    },
    user_id:String
})

exports.CountryModel =mongoose.model("countries",countrySchema);

exports.createToken = (user_id) => {
    let token = jwt.sign
    ({_id:user_id},"JWT_SECRET",
        {expiresIn:"60mins"}
    )
    return token;
}

exports.validCountry = (_reqBody) => {
    let joiSchema = Joi.object({
        name:Joi.string().min(2).max(99).required(),
        capital:Joi.string().min(2).max(99).required(),
        pop:Joi.number().min(1).max(9999999).required(),
        img:Joi.string().min(1).max(9999999).required().allow(null,""),
        date: Joi.date().less('now').optional(),
        user_id:Joi.string().min(1).max(9999999).required(),
    })
    return joiSchema.validate(_reqBody);
}