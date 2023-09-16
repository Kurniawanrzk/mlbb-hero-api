const express = require("express"),
      router = express.Router(),
      HerosController = require("../controllers/HerosController")

router.get("/:name", HerosController.getHerosByName)
router.get("/", HerosController.getAllHeros)

module.exports = router