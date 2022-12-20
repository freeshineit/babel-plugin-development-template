## babel-plugin-development-template

![build](https://github.com/freeshineit/babel-plugin-development-template/workflows/build/badge.svg)

### Development

```bash
# clone and install
yarn install

# jest
yarn run test

# compile
yarn run build

# publish 
npm publish --access public
```

### Use

- `babel.config.json`
  
```json
{
    "plugins": ["babel-plugin-development-template"]
}
```

[codesandbox](https://codesandbox.io/s/bold-sun-npmb0m?file=/.babelrc)

<!-- ### Rename

- `jest.config.js`文件下别名，更新`moduleNameMapper`
- `tsconfig.json`文件下别名，更新`paths`
- `src/__tests__/`下文件 -->

