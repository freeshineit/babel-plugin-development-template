export default function () {
  return {
    name: 'debug',
    // 访问者模式
    // 对AST进行增删改
    visitor: {
      // https://astexplorer.net/
      // 标识符
      Identifier(path, state) {
        // console.log("type Identifier: ", path.node);
        // console.log("path.parentPath:", path.parentPath);
        if (path.node.name === 'DEBUG' && path.parent.type === 'IfStatement') {
          // t.remove(path.parent);
          path.parentPath.remove()
        }
      },
      StringLiteral(path) {
        // console.log('type StringLiteral: ', path.node)
      },
    },
  }
}
