const path = require('path')
module.exports = {
  publicPath: '/three-play/',
  chainWebpack: config => {
    config.output
      .publicPath('/three-play/')
  },
  devServer: {
    port: 8080,
    contentBase: path.join(__dirname, 'src/assets/')
  }
}