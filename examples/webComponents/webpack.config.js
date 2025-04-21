// const path = require("path");
// const HtmlWebpackPlugin = require("html-webpack-plugin");
// const MiniCssExtractPlugin = require("mini-css-extract-plugin");

// module.exports = {
//   mode: "development",
//   entry: "./src/index.js",
//   output: {
//     filename: "[name].bundle.js",
//     path: path.resolve(__dirname, "bundle_sin_babel"),
//   },
//   plugins: [
//     new MiniCssExtractPlugin({
//       filename: "[name].css"
//     }),
//     new HtmlWebpackPlugin({
//       template: "index.html"
//     })
//   ],
//   module: {
//     rules: [
//       {
//         test: /\.css$/i,
//         use: [MiniCssExtractPlugin.loader, "css-loader"],
//       },
//       {
//         test: /\.m?js$/,
//         exclude: /(node_modules)/,
//         use: {
//           loader: 'babel-loader',
//           options: {
//             presets: ['@babel/preset-env', '@babel/preset-react']
//           }
//         }
//       }
//     ],
//   },
// };
