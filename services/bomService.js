const fs = require("fs");
const csv = require("csv-parser");

function processBOM(filePath) {
  return new Promise((resolve) => {
    const results = [];

    fs.createReadStream(filePath)
      .pipe(csv())
      .on("data", (data) => {
        results.push({
          part: data.Part,
          quantity: data.Quantity,
          supplier: "LCSC",
          price: (Math.random() * 5).toFixed(2)
        });
      })
      .on("end", () => resolve(results));
  });
}

module.exports = { processBOM };