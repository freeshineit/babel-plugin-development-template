import { transformSync, transform } from '@babel/core'
// import { join } from 'path'
// import { readdirSync, readFileSync } from 'fs'
import plugin from 'babel-plugin-development-template'

describe('test', () => {
  it(`expect generate code`, () => {
    const code = `
            const g = 100;
        
            if (__DEV__) {
                const a =10;
                console.log(a)
            }
        
            console.log(g)
        
            const str = 'this is string'
        `
    const babelConfig = {
      plugins: [plugin],
    }
    const output = transformSync(code, babelConfig)
    // console.log(output.code)
    expect(output.code).toEqual(
      `const g = 100;\nconsole.log(g);\nconst str = 'this is string';`
    )
  })
})
