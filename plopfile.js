/*
 * @Author: bingbing.geng
 * @Date: 2023-01-05 11:19:48
 * @LastEditTime: 2023-01-05 13:15:57
 * @FilePath: \vue-tengyu-tools3.0\plopfile.js
 */
const viewGenerator = require('./plop-templates/view/prompt')
const jsGenerator = require('./plop-templates/js/prompt')
const storeGenerator = require('./plop-templates/store/prompt')

module.exports = function(plop) {
  plop.setGenerator('view', viewGenerator)
  plop.setGenerator('js', jsGenerator)
  plop.setGenerator('store', storeGenerator)
}