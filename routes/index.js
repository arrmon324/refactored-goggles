const express = require("express");
const router = express.Router();
const Country = require("../models/Country");

// @desc    Start page
// @route   GET /
router.get("/", (req, res) => {
  res.render("welcome", {
    layout: "layouts/main",
  });
});

// @desc    Country selection page
// @route   GET /addCountry
router.get("/addCountry", async (req, res) => {
  try {
    const countries = await Country.find();
    let states = [];
    countries.forEach((c) => {
      states = [...states, ...c.state];
    });
    console.log(states);
    console.log(countries);
    res.render("formCountry", {
      layout: "layouts/main",
      countries,
    });
  } catch (error) {
    console.error(error);
  }
});

// @desc    Country selection page
// @route   POST /addCountry
router.post("/addCountry", (req, res) => {
  const country = req.body.country;
  console.log(country);
  res.redirect("/addState");
});

// @desc    State selection page
// @route   GET /addState
router.get("/addState", (req, res) => {
  res.render("formState", {
    layout: "layouts/main",
  });
});

// @desc    State selection page
// @route   POST /addState
router.post("/addState", (req, res) => {
  // TODO: ERROR HANDLING
  const state = req.body.state;
  console.log(state);
  res.redirect("/addInfo");
});

// @desc    Personal information form page
// @route   GET /addInfo
router.get("/addInfo", (req, res) => {
  res.render("formInformation", {
    layout: "layouts/main",
  });
});

// @desc    Personal information form page
// @route   POST /addInfo
router.post("/addInfo", (req, res) => {
  // TODO: ERROR HANDLING
  const {
    firstName,
    lastName,
    gender,
    birthDate,
    dateOfTest,
    dateOfResult,
  } = req.body;

  res.redirect("/");
});

module.exports = router;
