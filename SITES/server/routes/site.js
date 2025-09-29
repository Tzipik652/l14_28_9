const express = require("express");
const { SiteModel, validateSite } = require("../models/siteModel");
const router = express.Router();

router.get("/", async (req, res) => {
  let perPage = Math.min(req.query.perPage, 20) ||4;
  let page = req.query.page || 1;
  let sort = req.query.sort || "_id";
  let reverse = req.query.reverse == "yes" ? -1 : 1;
  try{
    const count = await SiteModel.countDocuments({});
    let data = await SiteModel
    .find({})
    .limit(perPage)
    .skip((page -1)* perPage)
    .sort({[sort]: reverse});
    res.json({data,count});
  }
  catch(err){
    console.log(err);
    res.status(500).json({msg:"err", err});    
  }
});

router.get("/:id", async (req, res) => {
  let id = req.params.id;
  let data = await SiteModel.find({_id:id});
  res.json(data);
});

router.post("/", async (req, res) => {
  let validBody = validateSite(req.body);
  if(validBody.error){
    return res.status(400).json(validBody.error.details);
  }
  try{
    let site = new SiteModel(req.body);
    await site.save();
    return res.status(201).json(site);
  }
  catch(err){
    console.log(err);
    res.status(500).json({msg:"err",err})
  }
});

router.delete("/:delId", async (req, res) => {
  let delId = req.params.delId;
  let data = await SiteModel.deleteOne({ _id: delId });

  res.json(data);
});

router.put("/:idEdit", async (req, res) => {
  let validBody = validateSite(req.body);
  if(validBody.error){
    return res.status(400).json(validBody.error.details);
  }
  try{
    let idEdit = req.params.idEdit;
    let data = await SiteModel.updateOne({_id:idEdit},req.body);
    return res.status(201).json(data);
  }
  catch(err){
    console.log(err);
    res.status(500).json({msg:"err",err})
  }
});

module.exports = router;
