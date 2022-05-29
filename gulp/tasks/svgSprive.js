import svgSprite from "gulp-svg-sprite";

export const svgSrpive = () => {
  //  Ищем файлы шрифтов .otf
  return app.gulp.src(`${app.path.src.svgicons}`, {})
    .pipe(app.plugins.plumber(
      app.plugins.notify.onError({
        title: "SVG",
        message: "Error: <%= error.message %>"
      }))
    )
    .pipe(svgSprite({
        mode: {
          stack: {
            sprite: `../icons/icons.svg`,
            //  Создавать таблицу с перечнем иконок
            example: true
          }
        },
      }
    ))
    //  Выгружаем в исходную папку
    .pipe(app.gulp.dest(`${app.path.build.images}`));
}

//  Запуск npm run svgSrpive