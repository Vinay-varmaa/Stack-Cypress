const { defineConfig } = require("cypress");

// module.exports = defineConfig({
//   e2e: {
//     setupNodeEvents(on, config) {
//       // implement node event listeners here
//     },
//   },
// });

// const webpack = require('@cypress/webpack-preprocessor');

module.exports = {
  ...(on) => {
    const options = {
      webpackOptions: {
        resolve: {
          extensions: [".ts", ".js"],
        },
        module: {
          rules: [
            {
              test: /\.ts$/,
              exclude: [/node_modules/],
              use: [
                {
                  loader: "ts-loader",
                },
              ],
            },
          ],
        },
      },
      watchOptions: {},
    };
    on("file:preprocessor", webpack(options));
  },

  e2e: {
    pageLoadTimeout: 120000, 
  },
};
