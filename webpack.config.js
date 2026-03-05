const path = require('path');
const { VueLoaderPlugin } = require('vue-loader');

module.exports = {
  mode: 'production', // ⬅️ Важливо для оптимізації
  entry: './src/public/js/_app.js',
  output: {
    path: path.resolve(__dirname, 'public/js'),
    filename: 'app.js'
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      },
      {
        test: /\.scss$/,
        use: [
          'vue-style-loader',
          'css-loader',
          {
            loader: 'sass-loader',
            options: {
              sassOptions: {
                // уникнути legacy API warning
                // dart-sass вже підтримує новий стиль за замовчуванням
              }
            }
          }
        ]
      },
      {
        test: /\.css$/,
        use: ['vue-style-loader', 'css-loader']
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      },
      {
        test: /\.pug$/,
        loader: 'pug-plain-loader'
      }
    ]
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src/vue')
    },
    extensions: ['.js', '.vue', '.json']
  },
  plugins: [new VueLoaderPlugin()],
  devtool: false, // ❌ Без source-map для продакшну, щоб зменшити розмір
  optimization: {
    splitChunks: {
      chunks: 'all' // ✅ Розбивка коду (code splitting)
    }
  },
  performance: {
    hints: 'warning',
    maxEntrypointSize: 300000, // ~293KiB
    maxAssetSize: 300000
  }
};
