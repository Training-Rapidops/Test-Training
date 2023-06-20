const express = require("express");
const bodyParser = require("body-parser");

const router = require("./rest-services");
const app = express();
// const cors = require("cors");
const PORT = 5000;

require("./handler");

app.use(express.json());
app.use("/employee", router);
app.use(bodyParser.urlencoded({ extended: true }));

app.listen(PORT, () => {
  console.log("Listening on port " + PORT);
});
const getAllUrls = (routes, prefix = "employee") => {
  const urls = [];
  routes.forEach((route) => {
    if (route.route) {
      const methods = Object.keys(route.route.methods).filter(
        (method) => method !== "_all"
      );
      urls.push(`${methods}:${prefix}${route.route.path}`);
    } else if (route.handle && route.handle.stack) {
      urls.push(...getAllUrls(route.handle.stack, `/${prefix}`));
    }
  });
  return urls;
};

const allUrls = getAllUrls(app._router.stack);

// Display all available URLs
console.log("Available URLs:");
allUrls.forEach((url) => {
  console.log(url);
});
// pg express umzug sequelize cors node-fetch joi cucumber nodemailer
