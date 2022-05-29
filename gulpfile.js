//  Основной модуль
import gulp from "gulp";
//  Импорт путей
import {path} from "./gulp/config/path.js";
//  Импорт общих плагинов
import {plugins} from "./gulp/config/plugins.js";

//  Передаем значения в глобальную переменную
global.app = {
  isBuild: process.argv.includes('--build'),
  isDev: !process.argv.includes('--build'),
  path: path,
  gulp: gulp,
  plugins: plugins
}

//  Импорт задач
import {copy} from "./gulp/tasks/copy.js";
import {reset} from "./gulp/tasks/reset.js";
import {html} from "./gulp/tasks/html.js";
import {scss} from "./gulp/tasks/scss.js";
import {js} from "./gulp/tasks/js.js";
import {images} from "./gulp/tasks/images.js";
import {otfToTtf, ttfToWoff, fontsStyle} from "./gulp/tasks/fonts.js";
import {svgSrpive} from "./gulp/tasks/svgSprive.js";
import {zip} from "./gulp/tasks/zip.js";
import  {ftp} from "./gulp/tasks/ftp.js";
// import {server} from "./gulp/tasks/server.js";

//  Наблюдатель за изменениями файла
function watcher() { // При изменении любого другого файла отправлять на сервер.
  gulp.watch(path.watch.files, copy);     //  gulp.series(copy, ftp)
  gulp.watch(path.watch.html, html);      //  gulp.series(html, ftp)
  gulp.watch(path.watch.scss, scss);      //  gulp.series(scss, ftp)
  gulp.watch(path.watch.js, js);          //  gulp.series(js, ftp)
  gulp.watch(path.watch.images, images);  //  gulp.series(images, ftp)
}

export {svgSrpive}

//  Последовательная обработка шрифтов
const fonts1 = gulp.series(otfToTtf, ttfToWoff, fontsStyle);

//  Основные задачи
const mainTasks = gulp.series(fonts1, gulp.parallel(copy, scss, js, images, html));

//  Построение сценариев выполнения задач
const dev = gulp.series(reset, mainTasks, gulp.parallel(watcher));
const build = gulp.series(reset, mainTasks,);
const deployZip = gulp.series(reset, mainTasks, zip);
const deployFTP = gulp.series(reset, mainTasks, ftp);

//  Экспорт сценариев
export {dev}
export {build}
export {deployZip}
export {deployFTP}
//  Выполнения сценария по умолчанию
gulp.task('default', dev);