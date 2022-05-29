import replace from "gulp-replace"  //  Поиск и замена
import plumber from "gulp-plumber"  //  Обработка ошибок
import notify from "gulp-notify"  //  Сообщения подсказки
import browsersync from "browser-sync"  //Локальный сервер
import newer from "gulp-newer"; //  Проверка обновления
import size from "gulp-size"; // Размер файла
import ifPlugin from "gulp-if";  // Условное ветвление
import inject from "gulp-inject";

//Экспортируем объект
export const plugins = {
  replace: replace,
  plumber: plumber,
  notify: notify,
  browsersync: browsersync,
  newer: newer,
  size: size,
  if: ifPlugin,
  inject: inject
}