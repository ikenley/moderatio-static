const path = require("path");

module.exports = function(env, argv) {
  //Set default env args
  const envDefaults = { prod: false };
  env = Object.assign({}, envDefaults, env);

  return {
    mode: env.prod ? "production" : "development",
    devtool: env.prod ? false : "source-map",
    entry: "./src/index.js",
    output: {
      filename: "main.js",
      path: path.resolve(__dirname, "dist")
    },
    module: {
      rules: [
        {
          test: /\.m?js$/,
          exclude: /(node_modules|bower_components)/,
          use: {
            loader: "babel-loader",
            options: {
              presets: ["@babel/preset-env", "@babel/preset-react"]
            }
          }
        }
      ]
    }
  };
};
