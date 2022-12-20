/**
 *
 * @returns
 */
export default function () {
  return {
    // 访问者模式
    // 对AST进行增删改
    visitor: {
      // https://astexplorer.net/
      // 标识符
      Identifier(path: any, state: any) {
        // console.log("type Identifier: ", path.node);
        // console.log("path.parentPath:", path.parentPath);
        if (
          path.node.name === '__DEV__' &&
          path.parent.type === 'IfStatement'
        ) {
          // t.remove(path.parent);
          path.parentPath.remove()
        }
      },
      StringLiteral(path: any) {
        // console.log('type StringLiteral: ', path.node)
      },
    },
  }
}
