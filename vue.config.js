module.exports = {
  pages: {
    index: {
      entry: 'examples/main.js',
      template: 'public/index.html',
      filename: 'index.html'
    }
  },
  devServer: {
    host: '0.0.0.0',
    port: 8080,
    overlay: {
      warnings: false,
      errors: false
    }
  },

  lintOnSave: false,
  publicPath: '',
  outputDir: "dist",
  assetsDir: "",
  indexPath: "index.html",
  filenameHashing: true,
}