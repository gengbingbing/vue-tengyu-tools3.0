/*
 * @Author: bingbing.geng
 * @Date: 2023-01-05 11:32:49
 * @LastEditTime: 2023-01-05 13:16:27
 * @FilePath: \vue-tengyu-tools3.0\plop-templates\store\prompt.js
 */
const { notEmpty } = require('../utils.js')

module.exports = {
  description: '创建Vuex modules',
  prompts: [{
    type: 'input',
    name: 'name',
    message: '请输入文件夹名称',
    validate: notEmpty('name')
  },
  {
    type: 'checkbox',
    name: 'blocks',
    message: 'Blocks:',
    choices: [{
      name: 'state',
      value: 'state',
      checked: true
    },
    {
      name: 'mutations',
      value: 'mutations',
      checked: true
    },
    {
      name: 'actions',
      value: 'actions',
      checked: true
    }
    ],
    validate(value) {
      if (!value.includes('state') || !value.includes('mutations')) {
        return 'store require at least state and mutations'
      }
      return true
    }
  }
  ],
  actions(data) {
    const name = '{{name}}'
    const { blocks } = data
    const options = ['state', 'mutations']
    const joinFlag = `,
  `
    if (blocks.length === 3) {
      options.push('actions')
    }

    const actions = [{
      type: 'add',
      path: `src/store/modules/${name}.js`,
      templateFile: 'plop-templates/store/index.hbs',
      data: {
        options: options.join(joinFlag),
        state: blocks.includes('state'),
        mutations: blocks.includes('mutations'),
        actions: blocks.includes('actions')
      }
    }]
    return actions
  }
}
