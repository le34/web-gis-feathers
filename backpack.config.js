module.exports = {
  webpack: (config, options, webpack) => {
    config.module.rules.push({
      enforce: 'pre',
      test: /\.js$/,
      exclude: /node_modules/,
      loader: 'eslint-loader'
    })
    return config
  }
}
