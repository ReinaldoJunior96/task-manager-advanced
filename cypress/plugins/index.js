import { startDevServer } from '@cypress/webpack-dev-server'
import webpackConfig from '../../webpack.config.js'

export default (on, config) => {
  on('dev-server:start', (options) => {
    return startDevServer({
      options,
      framework: 'vue',
      webpackConfig
    })
  })
  return config
}
