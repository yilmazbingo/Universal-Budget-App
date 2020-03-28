require("webpack-hot-middleware/client?reload=true");
require("regenerator-runtime/runtime");
require("@babel/register");
require("./main.css");
require("./app");
console.log(process.env.NODE_ENV);
