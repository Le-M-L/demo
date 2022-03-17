
const path = require('path');

function resolve(dir){
  return path.join(__dirname,dir)
}

module.exports = {
  devServer: {
    port: 8090
  },
  configureWebpack: {
    output: {
      libraryExport: 'default'
    }
  },
}