// place it with same level of package.json 
// vue.config.js 設定指南 : https://cli.vuejs.org/zh/config/#%E5%85%A8%E5%B1%80-cli-%E9%85%8D%E7%BD%AE
module.exports = {
  publicPath: process.env.NODE_ENV === 'production'
    ? '/Myshop01_byvue/'
    : '/'
}