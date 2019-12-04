const path = require('path');

// Export a function. Accept the base config as the only param.
module.exports = async ({ config, mode }) => {
  config.module.rules.push({
    test: /.(js|jsx)$/,
    exclude: /node_modules/,
    use: ['babel-loader', 'eslint-loader'],
},
{
    test: /.(jpg|jpeg|png|gif|svg|webp)$/,
    use: [
        {
            loader: 'file-loader',
            options: {
                name: '[path][name]-[hash:8].[ext]',
            },
        },
    ],
},
{
    test: /\.s[ac]ss$/i,
    use: [
        // Creates `style` nodes from JS strings
        'style-loader',
        // Translates CSS into CommonJS
        'css-loader',
        // Compiles Sass to CSS
        'sass-loader',
    ],
},
);

  return config;
};