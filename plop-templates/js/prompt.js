/*
 * @Author: bingbing.geng
 * @Date: 2023-01-05 13:05:12
 * @LastEditTime: 2023-01-05 13:13:39
 * @FilePath: \vue-tengyu-tools3.0\plop-templates\js\prompt.js
 */
const { notEmpty } = require('../utils.js')

module.exports = {
  description: "表格配置信息",
  prompts: [{
    type: 'input',
    name: 'name',
    message: '请输入文件夹名称',
    validate: notEmpty('name')
  }],
  actions: () => {
    const name = '{{name}}'
    const actions = [{
      type: 'add',
      path: `src/views/${name}/index.js`,
      templateFile: 'plop-templates/js/index.hbs',
      data: {
        name,
      }
    }]
    return actions
  },
}