const express = require("express");
const bcrypt = require("bcrypt");

const { auth } = require("../middlewares/auth");

const jwt = require("jsonwebtoken");

const { CountryModel, validCountry } = require("../models/countryModel");

const router = express.Router();

router.get("/", auth, async (req, res) => {
  try {
    let countries = await CountryModel.find({ user_id: req.tokenData._id }, {});
    res.json(countries);
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: "err", err });
  }
});

router.post("/", auth, async (req, res) => {
  let validBody = validCountry(req.body);
  if (validBody.error) {
    return res.status(400).json(validBody.error.details);
  }
  try {
    let country = new CountryModel({
      ...req.body,
      user_id: req.tokenData._id,
    });
    await country.save();
    res.status(201).json(country);
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: "err", err });
  }
});

router.put("/:idEdit", auth, async (req, res) => {
  let validBody = validCountry(req.body);
  if (validBody.error) {
    return res.status(400).json(validBody.error.details);
  }
  req.body.user_id = req.tokenData._id;
  try {
    let country = await CountryModel.findOneAndUpdate(
      {
        _id: req.params.idEdit,
        user_id: req.tokenData._id,
      },
      req.body,
      { new: true }
    );
    if (!country) return res.status(404).json({ msg: "Country not found" });
    res.status(201).json(country);
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: "err", err });
  }
});

router.delete("/:idDel", auth, async (req, res) => {

  try {
    let country = await CountryModel.findOneAndDelete(
      {
        _id: req.params.idDel,
        user_id: req.tokenData._id,
      }
    );
    if (!country) return res.status(404).json({ msg: "Country not found" });
    res.status(201).json(country);
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: "err", err });
  }
});

module.exports = router;
