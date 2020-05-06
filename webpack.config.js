var UglifyJsPlugin = require('uglifyjs-webpack-plugin');
var MiniCssExtractPlugin = require("mini-css-extract-plugin");
const webpack = require('webpack');

module.exports = {
    mode: 'development',
    entry: {
        app: [
            './app/app.js',
            './app/services/services.module.js',
            './app/components/components.module.js',
            './app/components/map-selection-dialog.component.js',
            './app/demo/demo.module.js',
            './app/demo/demo.controller.js',
        ],
        vendor: [
            './node_modules/angular/angular.js',
            './node_modules/angular-animate/angular-animate.js',
            './node_modules/angular-aria/angular-aria.js',
            './node_modules/angular-messages/angular-messages.js',
            './node_modules/angular-material/angular-material.js',
            './node_modules/angular-route/angular-route.js',
            './node_modules/angular-uuid/angular-uuid.js'
        ],
        'vendor-less': [
            './node_modules/angular-material/angular-material.css',
        ],
        less: [
            './app/components/map.dialog.less',
            './app/app.less',
        ]
    },
    resolve: {
        extensions: ['.html', '.js', '.json', '.scss', '.css', '.png'],
        alias: {
            leaflet_css: __dirname + "/node_modules/leaflet/dist/leaflet.css",
            leaflet_geoman_css: __dirname + "/node_modules/@geoman-io/leaflet-geoman-free/dist/leaflet-geoman.css",
            leaflet_geoman_min: __dirname + "/node_modules/@geoman-io/leaflet-geoman-free/dist/leaflet-geoman.min.js",
            // leaflet_marker: __dirname + "/node_modules/leaflet/dist/images/marker-icon.png",
            // leaflet_marker_2x: __dirname + "/node_modules/leaflet/dist/images/marker-icon-2x.png",
            // leaflet_marker_shadow: __dirname + "/node_modules/leaflet/dist/images/marker-shadow.png"
        }
    },
    plugins: [
        new MiniCssExtractPlugin(),
      ],
    optimization: {
        minimizer: [
          new UglifyJsPlugin({
            cache: true,
            parallel: true,
            sourceMap: true, // set to true if you want JS source maps,
            exclude: 'vendor'
          })
        ]
      },
      module: {
        rules: [
            {
                test: /\.less$/,
                include: /app/,
                use: [
                  MiniCssExtractPlugin.loader,
                  'css-loader',
                  'less-loader',
                ],
              },
              {
                test: /\.css$/,
                include: /node_modules/,
                use: [
                  'style-loader',
                  // MiniCssExtractPlugin.loader,
                  'css-loader',
                ],
              },
              {
                test: /\.html$/,
                loaders: [
                  'html-loader'
                ]
              },
              {
                test: /\.(svg|png|jpe?g|gif)$/i,
                use: [
                  {
                    loader: 'file-loader',
                  },
                ],
              },
        ]
      }
  };