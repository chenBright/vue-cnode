// http://eslint.org/docs/user-guide/configuring

module.exports = {
  root: true,
  parser: 'babel-eslint',
  parserOptions: {
    sourceType: 'module'
  },
  env: {
    browser: true,
  },
  extends: 'airbnb-base',
  // required to lint *.vue files
  plugins: [
    'html'
  ],
  // check if imports actually resolve
  'settings': {
    'import/resolver': {
      'webpack': {
        'config': 'build/webpack.base.conf.js'
      }
    }
  },
  // add your custom rules here
  'rules': {
    // 4个空格缩进
    indent: ['error', 4, {
      SwitchCase: 1
    }],
    // 关闭 强制在模块顶部调用 require()
    'global-require': 'off',
    // 关闭 require()不能有表达式
    'import/no-dynamic-require': 'off',
    // 强制 typeof 表达式与有效的字符串进行比较
    "valid-typeof": ['error', {
      requireStringLiterals: false
    }],
    // 禁止混合使用不同的操作符 指定允许使用混合的两个操作符，前提是它们有同样的优先级
    'no-mixed-operators': ['error', {
      allowSamePrecedence: true
    }],
    // 关闭 要求使用const
    // 'prefer-const': 'off',
    // 提醒 禁止使用特定的语法
    'no-restricted-syntax': 'warn',
    // 关闭 要求或禁止末尾逗号
    'comma-dangle': 'off',
    // 禁止对函数参数再赋值，允许修改参数的属性
    'no-param-reassign': ['error', { 'props': false }],
    // don't require .vue extension when importing
    // import时 不需要 js 和 vue 后缀
    'import/extensions': ['error', 'always', {
      'js': 'never',
      'vue': 'never'
    }],
    // allow optionalDependencies
    'import/no-extraneous-dependencies': ['error', {
      'optionalDependencies': ['test/unit/index.js']
    }],
    'no-new': 'off',
    // 生产环境中 禁止debugger语句
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    // 生产环境中 禁止debugger语句
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off'
  }
}
