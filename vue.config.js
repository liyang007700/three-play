const path = require('path')
module.exports = {
  devServer: {
    port: 8080,
    contentBase: path.join(__dirname, 'src/assets/')
  }
}