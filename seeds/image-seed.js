const { Image } = require("../models");

const imageData = [
  {
    img_url: "https://upcdn.io/FW25au4JbmzeaAdCNF3GUEq",
  },
  {
    img_url: "https://upcdn.io/FW25au4JbmzeaAdCNF3GUEq",
  },
  {
    img_url: "https://upcdn.io/FW25au4JbmzeaAdCNF3GUEq",
  },
  {
    img_url: "https://upcdn.io/FW25au4JbmzeaAdCNF3GUEq",
  },
  {
    img_url: "https://upcdn.io/FW25au4JbmzeaAdCNF3GUEq",
  },
  {
    img_url: "https://upcdn.io/FW25au4JbmzeaAdCNF3GUEq",
  },
];
const seedImages = () => Image.bulkCreate(imageData);

module.exports = seedImages;
