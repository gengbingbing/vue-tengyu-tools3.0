/*
 * @Author: bingbing.geng
 * @Date: 2023-01-05 11:26:15
 * @LastEditTime: 2023-01-05 13:14:20
 * @FilePath: \vue-tengyu-tools3.0\plop-templates\view\prompt.js
 */
const { notEmpty } = require('../utils.js')

module.exports = {
  description: '创建Vue页面',
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
      name: '<template>',
      value: 'template',
      checked: true
    },
    {
      name: '<script>',
      value: 'script',
      checked: true
    },
    {
      name: 'style',
      value: 'style',
      checked: true
    }
    ],
    validate(value) {
      if (value.indexOf('script') === -1 && value.indexOf('template') === -1) {
        return 'View require at least a <script> or <template> tag.'
      }
      return true
    }
  }
  ],
  actions: data => {
    const name = '{{name}}'
    const actions = [{
      type: 'add',
      path: `src/views/${name}/index.vue`,
      templateFile: 'plop-templates/view/index.hbs',
      data: {
        name: name,
        template: data.blocks.includes('template'),
        script: data.blocks.includes('script'),
        style: data.blocks.includes('style')
      }
    }]

    return actions
  }
}
