const { Image } = require("../models");

const imageData = [
  {
    img_url: "https://i.ytimg.com/vi/e-Ki0oCsC6g/maxresdefault.jpg",
  },
  {
    img_url: "https://upcdn.io/FW25au4JbmzeaAdCNF3GUEq",
  },
  {
    img_url: "https://i.ytimg.com/vi/IU8Vby9O8h4/maxresdefault.jpg",
  },
  {
    img_url:
      "https://images.mein-mmo.de/medien/2020/11/cod-cold-war-camos-streifen.jpg",
  },
  {
    img_url:
      "https://i.cbc.ca/1.3873596.1480460667!/fileImage/httpImage/roach-horse.jpg",
  },
  {
    img_url:
      "https://awfulannouncing.com/wp-content/uploads/sites/94/2017/09/Screen-Shot-2017-09-07-at-9.52.25-AM.png",
  },
];
const seedImages = () => Image.bulkCreate(imageData);

module.exports = seedImages;
