import fileInclude from "gulp-file-include";
import WebpHtmlNosvg from "gulp-webp-html-nosvg";
import versionNumber from "gulp-version-number";
// import pug from "gulp-pug";


export const html = () => {
  let sources = app.gulp.src([
    app.path.build.js + "/*.js",
    app.path.build.css + "/*.css"
  ]);
  console.log(app.path.build.js + "/*.js");

  return app.gulp.src(app.path.src.html)
    .pipe(app.plugins.plumber(
      app.plugins.notify.onError({
        title: "HTML",
        message: "Error: <%= error.message %>"
      })
    ))
    .pipe(fileInclude())
    //  Преобразование PUG в HTML
    // .pipe(pug({
    //   //Сжатие HTML файла
    //   pretty: true,
    //   //Показывать в терминале какой файл обработан
    //   verbose: true
    // }))

    .pipe(app.plugins.replace(/@img\//g, 'img/'))
    //  Преобразование в .webp формат
    .pipe(
      app.plugins.if(
        app.isBuild,
        WebpHtmlNosvg()
      )
    )
    //  Добавление версий
    .pipe(
      app.plugins.if(
        app.isBuild,
        versionNumber({
          'value': '%DT%',
          'append': {
            'key': '_v',
            'cover': 0,
            'to': ['css', 'js',]
          },
          'output': {
            'file': 'gulp/version.json'
          }
        }))
    )
    .pipe(app.gulp.dest(app.path.build.html))
    .pipe(app.plugins.inject(sources))
    .pipe(app.plugins.browsersync.stream());
}