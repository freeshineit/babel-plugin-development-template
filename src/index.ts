// babel插件是一个简单的函数，它必须返PluginObj对象
import type { PluginObj, PluginPass } from '@babel/core'
import type { NodePath } from '@babel/traverse'

// 插件参数
export interface Options {
  pluginParam: string
}
/**
 * https://babeljs.io/docs/en/plugins/
 * Babel 的编译流程主要分为三个部分：解析（parse），转换（transform），生成（generate）
 * source code -> AST -> transformed AST -> generate target code and sourcemap
 * 插件开发主要是对 AST 进行增删改查
 *
 * @param {PluginAPI} api 一个对象，包含了 types (@babel/types)、traverse (@babel/traverse)、template(@babel/template) 等实用方法，
 *                我们能从这个对象中访问到 @babel/core dependencies 中包含的方法
 * @param {Options} options 插件参数
 * @param {string} dirname 目录名。
 * @return {PluginObj}  {PluginObj}
 */
export default function (api, options: Options, dirname: string): PluginObj {
  // 断言 babel7
  api.assertVersion(7)
  console.log('options', options)

  return {
    // 插件名字 不是必须的
    name: 'development-template',
    // 用于修改 `options`，是在插件里面修改配置的方式， 在 `pre` 前。 不是必须的
    manipulateOptions(opts, parserOpts) {
      console.log('manipulateOptions', opts.plugins[0], parserOpts)
    },
    // 指定继承某个插件，通过 Object.assign 的方式，和当前插件的 options 合并。 不是必须的
    // inherits must be a function, or undefined
    inherits: undefined,
    // 遍历前调用, 不是必须的
    pre(state) {
      // console.log('pre state: ', state.opts)
    },
    // 访问者模式 https://refactoringguru.cn/design-patterns/visitor/typescript/example#lang-features
    // 对AST进行增删改
    // https://babeljs.io/docs/en/babel-types
    visitor: {
      // https://astexplorer.net/
      // NodePath 对象上访问到当前 AST 节点、父级 AST 节点、父级 NodePath 对象，还能访问到添加、更新、移动和删除节点等其他方法，这些方法提高了我们对 AST 增删改的效率。
      // 标识符
      Identifier(path: NodePath<any>, state: PluginPass) {
        console.log(path.type, path.node.name)
        // console.log("path.parentPath:", path.parentPath);
        if (
          path.node.name === '__DEV__' &&
          path.parent.type === 'IfStatement'
        ) {
          path.parentPath.remove()
        } else if (path.node.name === '__DEV__') {
          // path.node.id = api.types.Identifier('false')
          path.replaceWith(api.types.Identifier('false'))
        }

        console.log('Identifiers: ', state.opts)
      },
      // 字符串文字
      StringLiteral(path: NodePath<any>, state: PluginPass) {
        console.log(path.type, path.node.name)
        console.log('StringLiteral: ', state.opts)
      },
      // 函数声明
      FunctionDeclaration(path: NodePath<any>, state: PluginPass) {
        console.log(path.type, path.node.name)
      },
      // 箭头函数表达式
      ArrowFunctionExpression(path: NodePath<any>, state: PluginPass) {
        console.log(path.type, path.node.name)
      },
    },
    // 遍历后调用, 不是必须的
    post(state) {
      // console.log('post state: ', state)
    },
  }
}
