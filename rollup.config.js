import babel from 'rollup-plugin-babel'
import { terser } from 'rollup-plugin-terser'

import pkg from './package.json'

const production = !(
  process.env.NODE_ENV === 'production' && process.env.ROLLUP_WATCH
)

export default {
  input: 'src/index.js',
  output: { file: pkg.main, format: 'cjs' },
  plugins: [
    babel({
      exclude: 'node_modules/**',
      runtimeHelpers: true
    }),
    production && terser()
  ]
}
