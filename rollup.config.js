import babel from '@rollup/plugin-babel'

export default {
  input: 'lib/index.js',
  output: {
    file: 'dist/index.js',
    format: 'cjs'
  },
  plugins: [babel()]
}
