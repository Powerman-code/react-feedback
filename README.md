# Приложение Feedback Сервер

## Краткое описание:

**_Сервер:_** Хранение имени и сообщения автора отзыва, валидация данных, а
также хранение текста сообщения до сохранения отзыва в базе.

> Технологии: NodeJs, Express, LowDb

**_Клиент:_** Приложение для отправки отзыва и сохранения его на сервере.

> Технологии: HTML, CSS/SCSS, JS, REACT

## Реализовано:

**_Сервер:_**

- код структурирован
- используется база данных (lowDb)
- обрабатываются ошибки
- при добавлении сообщения сервер возвращает статус и новое сообщение
- входящие данные валидируются

**_Клиент:_**

- использован CSS/SASS для оформления
- адаптивная верстка
- при наведении и других событиях элементы приложения не смещаются
- JS валидация формы и уведомления об ошибках
- нельзя отправить визуально пустые поля
- нельзя отправить поле имя с недопустимыми символами (допустимо: латинские
  буквы, цифры, знак нижнего подчеркивания)
- есть уведомление о том, какая в каком поле ошибка
- уведомление об ошибке скрывается при начале ввода в соответствующее поле
  (рендер по условию)
- уведомления об ошибках при появлении не сдвигают другие поля
- использованы регулярные выражения в валидации
- обработаны ответы сервера (сообщение добавлено, не добавлено...)
- отсутствуют лишние перерендеры
- использованы хуки useState, useCallback и прочие
- после отправки формы очищается поле текст сообщения
- после отправки формы не очищается поле автор сообщения
- использованы переменные окружения

## Функционал:

- структура формы отправки сообщения: имя, текст, кнопка
- сообщение отправляется по клику на кнопку и по Ctrl+Enter
- новое сообщение добавляется без перезагрузки страницы
- новое сообщение добавляется в начало (вверх) списка сообщений
- сообщения отсортированы по убыванию даты (новые вверху)
- новое сообщение содержит имя отправителя и текст
- после принудительной перезагрузки страницы сообщение не исчезает, не
  перемещается
- при заходе на страницу из другого браузера сообщение остается на месте
  (хранение данных на сервере)
- добавлен фильтр(поиск) отзывов по имени

## Ссылки на рабочую версию:

**_Сервер:_** [ссылка на сервер](http://example.com/ 'Необязательная подсказка')

**_Клиент:_**
[ссылка на клиент](https://github.com/Powerman-code/react-feedback 'Необязательная подсказка')

## Инструкция по запуску:

**_Сервер:_**

- Форкнуть или скачать приложение
- Прописать в терминале

      npm i

- После установки нод модулей прописать в терминале

      npm run start:dev

**_Клиент:_**

- Форкнуть или скачать приложение
- Прописать в терминале

      npm i

- После установки нод модулей прописать в терминале “npm start ”
