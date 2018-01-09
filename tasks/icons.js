const webfontsGenerator = require('webfonts-generator')
const glob = require('glob')
const path = require('path')

GenerateFonts = () =>
  new Promise((resolve, reject) =>
    webfontsGenerator(
      {
        types: ['eot', 'woff', 'ttf'],
        files: glob.sync(path.join(__dirname, '../icons/*.svg')),
        dest: path.join(__dirname, './../fonts/icons'),
        cssTemplate: path.join(__dirname, './templates/css.hbs'),
        cssDest: path.join(__dirname, './../styles/icons.styl'),
        fontName: 'icons',
        cssFontsUrl: '../fonts/icons/',
        html: true,
        htmlDest: path.join(__dirname, './../tests/icons/font.html'),
        htmlTemplate: path.join(__dirname, './templates/icons.hbs'),
        templateOptions: {
          classPrefix: 'ui-icon-',
          baseSelector: 'ui-icon'
        }
      },
      error => (error ? reject(error) : resolve())
    )
  )
GenerateFonts()
