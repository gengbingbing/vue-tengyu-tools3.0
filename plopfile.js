/*
 * @Author: bingbing.geng
 * @Date: 2023-01-05 11:19:48
 * @LastEditTime: 2023-01-05 13:28:19
 * @FilePath: \vue-tengyu-tools3.0\plopfile.js
 */
const viewGenerator = require('./plop-templates/view/prompt')
const componentsGenerator = require('./plop-templates/component/prompt')
const jsGenerator = require('./plop-templates/js/prompt')
const storeGenerator = require('./plop-templates/store/prompt')

module.exports = function(plop) {
  plop.setGenerator('view', viewGenerator)
  plop.setGenerator('component', componentsGenerator)
  plop.setGenerator('js', jsGenerator)
  plop.setGenerator('store', storeGenerator)
}