const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const spawn = require('child_process').spawn;

module.exports = {
  target: 'electron-renderer',
  mode: 'development',
  entry: './src/index.tsx',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/
      },{
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader',
        ]
      },{
        test: /\.less$/,
        use: [
          'style-loader',
          'css-loader',
          'less-loader'
        ]
      },
      {
        test: /\.scss$/,
        use: [
          'style-loader',
          'css-loader',
          'sass-loader'
        ]
      }
    ]
  },
  devServer: {
    port: 3000,
    after() {
      spawn('npm', ['run', 'start-electron'], {
        shell: true,
        env: process.env,
        stdio: 'inherit'
      })
        .on('close', code => process.exit(code))
        .on('error', spawnError => console.error(spawnError));
    }
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js','.css','.less','.scss'],
    alias: {
      "@src": path.resolve(__dirname, 'src/'),
      "@ipc": path.resolve(__dirname, 'ipc/')
    }
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './index.html'
    })
  ]
}