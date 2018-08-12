require("dotenv").config();
const express = require("express");
const PORT = 4000;
const app = express();
const path = require("path");
const webpackMiddleware = require("webpack-dev-middleware");
const webpack = require("webpack");
const config = require("../webpack.dev.config.js");
const compiler = webpack(config);
const axios = require("axios");
// Replace with your Flickr Key
const { FLICKR_KEY } = process.env;

app.use(
  webpackMiddleware(compiler, {
    noInfo: true,
    publicPath: config.output.publicPath,
  }),
);

const router = express.Router();

// Get "interesting" images (page 1 unless specified)
router.route("/images").get(function(req, res) {
  const extras =
    "description, date_upload, date_taken, owner_name, original_format, last_update, geo, tags, machine_tags, o_dims, views, media, url_sq, url_t, url_s, url_q, url_m, url_n, url_z, url_c, url_l, url_o";
  const page = req.query.page ? `&page=${req.query.page}` : "";
  axios
    .get(
      `https://api.flickr.com/services/rest/?method=flickr.interestingness.getList&api_key=${FLICKR_KEY}&format=json&extras=${extras}&per_page=10${page}&nojsoncallback=1`,
    )
    .then(response => {
      res.send(response.data);
    })
    .catch(err => res.send(err));
});

app.use("/api", router);

app.use("*", (req, res, next) => {
  const filename = path.join(compiler.outputPath, "index.html");
  compiler.outputFileSystem.readFile(filename, (err, result) => {
    if (err) {
      return next(err);
    }
    res.set("content-type", "text/html");
    res.send(result);
    res.end();
  });
});

module.exports = app;
