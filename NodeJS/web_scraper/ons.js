const axios = require("axios");
const cheerio = require("cheerio");
const express = require("express");
const colors = require("colors");

const app = express();
const url = "https://www.ons.gov.uk/peoplepopulationandcommunity/healthandsocialcare/drugusealcoholandsmoking/bulletins/smokingprevalenceintheukandtheimpactofdatacollectionchanges/2020#adult-smoking-habits-in-the-uk-data";
axios
  .get(url)
  .then((response) => {
    const html = response.data;
    const $ = cheerio.load(html);
    const articles = [];

    $("#main-points li").each((i, element) => {
      const title = $(element).find("p").text().trim();
      articles.push({
        title,
      });
    });
    console.log(articles);
    console.log("--------------\n");
  })
  .catch((err) => console.log(err));
