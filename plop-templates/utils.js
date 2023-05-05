/*
 * @Author: bingbing.geng
 * @Date: 2023-01-05 11:29:19
 * @LastEditTime: 2023-01-05 11:29:31
 * @FilePath: \vue-tengyu-tools3.0\plop-templates\utils.js
 */
exports.notEmpty = name => v =>
  !v || v.trim() === '' ? `${name} is required` : true