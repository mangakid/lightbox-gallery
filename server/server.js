const express = require("express");
const PORT = 4000;
const app = express();
const path = require("path");
const webpackMiddleware = require("webpack-dev-middleware");
const webpack = require("webpack");
const config = require("../webpack.dev.config.js");
const compiler = webpack(config);

app.use(
  webpackMiddleware(compiler, {
    noInfo: true,
    publicPath: config.output.publicPath,
  }),
);

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
