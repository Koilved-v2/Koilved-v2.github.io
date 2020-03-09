const autoprefixer = require('autoprefixer');
const inlineSvg = require('postcss-inline-svg');
const flexbugs = require('postcss-flexbugs-fixes');
const assets = require('postcss-assets');
const postcssCustomMedia = require('postcss-custom-media');

let config = {
  API: '',
  tasks: './tasks',
  preprocessor: 'sass',
  isDevelopment: !process.env.NODE_ENV || process.env.NODE_ENV === 'development',
  postcssConfig: [
    autoprefixer({
      overrideBrowserslist: ['last 2 versions'],
      cascade: false
    }),
    assets({
      baseUrl: '/',
      loadPaths: ['svg-icons/', 'images/']
    }),
    inlineSvg(),
    flexbugs(),
    postcssCustomMedia()
  ],
  paths: {
    // JS
    entry: {
      index: './js/index.js'
    },
    js: './js/**/**/*.{js,jsx}',
    // SVG
    svg_sprite: './svg-sprite/**/*.svg',
    // DIST
    dist: './public'
  },
  output: {
    js: 'js',
    css: 'css',
    images: 'images',
    svg: 'svg',
    sprite: 'images'
  }
};
// STYLES
config.paths.styles = config.preprocessor === 'sass' ? ['./styles/**/*.scss', './styles/**/*.css'] : ['./styles/**.less', './styles/layout/**.less', './styles/pages/**.less', './styles/plugins/**.less', './styles/service/**.less'];
config.paths.indexStyle = config.preprocessor === 'sass' ? ['./styles/index.scss'] : ['./styles/index.less'];
config.paths.pug = 'pug/**/*.pug';
config.paths._pugFolder = '!pug/**/_**';
config.paths.imagmin = 'img_min/**/*';
config.paths.img = 'public/images/';
config.paths.js = 'js';

module.exports = config;
