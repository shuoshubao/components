import babel from '@rollup/plugin-babel'
import scss from 'rollup-plugin-scss'

export default {
  input: 'lib/index.js',
  output: {
    file: 'dist/index.js',
    format: 'cjs'
  },
  plugins: [
    scss({
      fileName: 'index.css'
    }),
    babel({
      presets: ['@babel/preset-env', '@babel/preset-react']
    })
  ]
}
