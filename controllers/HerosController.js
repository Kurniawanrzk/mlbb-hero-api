const scrapeIt = require("scrape-it");

const HerosController = {
  getAllHeros: async (req, res) => {
    scrapeIt("https://mobile-legends.fandom.com/wiki/List_of_heroes", {
      heroInfo: {
        listItem: "tbody tr",
        data: {
          name: "td b a",
          avatar: {
            selector: "td center a img",
            attr: "data-src",
          },
          role: {
            selector: "td a:nth-child(2)",
            attr: "title",
          },
          detail: {
            selector: "td b a",
            convert: (val) =>
              "http://localhost:5000/api/v1/heros/" + val.replaceAll(" ", "_"),
          },
        },
      },
    }).then(({ data }) => {
      res.json(data.heroInfo.slice(1));
    });
  },
  getHerosByName: async (req, res) => {
    const name = req.params.name;
    scrapeIt(`https://mobile-legends.fandom.com/wiki/${name}`, {
      name: "span.mw-page-title-main",
      avatar: {
        selector: "#infobox-hero > aside > figure > a > img",
        attr: "src",
      },
      lane: "#infobox-hero > aside > div:nth-child(6) > div > a",
      role: {
        listItem: "#infobox-hero > aside > div:nth-child(4) > div > a",
      },
      speciality: {
        listItem: "#infobox-hero > aside > div:nth-child(5) > div > a",
      },
      battlePointPrice:
        "#infobox-hero > aside > div:nth-child(7) > div > span:nth-child(1) > span:nth-child(2)",
      diamondPrice:
        "#infobox-hero > aside > div:nth-child(7) > div > span:nth-child(2) > span:nth-child(2)",
      quote:
        "#mw-content-text > div.mw-parser-output > table:nth-child(4) > tbody > tr:nth-child(1) > td:nth-child(2)",
      title: "#mw-content-text > div.mw-parser-output > p:nth-child(5)",
      backStory:"#mw-content-text > div.mw-parser-output > p:nth-child(17)"
    }).then(({ data }) => {
      res.json(data);
    }).catch((err) => {
        res.json(err)
    });
  },
};

module.exports = HerosController;
