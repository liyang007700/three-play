const path = require('path')
module.exports = {
  publicPath: '//liyang007700.github.io/three-play/',
  devServer: {
    port: 8080,
    contentBase: path.join(__dirname, 'src/assets/')
  }
}