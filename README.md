# РАЗРАБОТКА ИНФОРМАЦИОННОЙ СИСТЕМЫ УЧЕТА РЕЗУЛЬТАТОВ ТЕХНОЛОГИЧЕСКОГО АУДИТА В УНИВЕРСИТЕТЕ

## Что использовалось
- [WebStorm](https://www.jetbrains.com/ru-ru/WebStorm/) - IDE
- [Node.js](https://nodejs.org/en/) - Программная платформа, основанная на движке V8 (транслирующем JavaScript в машинный код), превращающая JavaScript из узкоспециализированного языка в язык общего назначения
  - npm
- [TypeScript](https://www.typescriptlang.org/) - Язык программирования компилируемый в JavaScript
- [Next.js](https://nextjs.org/learn) - Фреймворк упрощающий разработку приложений
- [cookies](https://recoiljs.org/) - Фреймворк управления cookies приложения 
- [git](https://git-scm.com/) - 

## Начало разработки
- Устанавливаем IDE [WebStorm](https://www.jetbrains.com/ru-ru/WebStorm/)
- Устанавливаем Фреймворк [Node.js](https://nodejs.org/en/)
- ~~Ставим Фреймворк Next.js https://nextjs.org/learn/basics/create-nextjs-app/setup~~
- Создаем приложение из шаблона приложений
```shell
npx create-next-app bubu-diploma --use-npm --example "https://github.com/vercel/next-learn/tree/master/basics/typescript-final"
```
- Открываем папку bubu-diploma в WebStorm
- Для запуска веб-приложения выполняем команду ```next dev```
- В консоли должен появиться адрес сайта, который мы разрабатываем

## Как поднималось на сервере
- Клонируем репозиторий: git clone ...
- Ставим nodejs: https://github.com/nodesource/distributions/blob/master/README.md#installation-instructions
- cd bubu-diploma
- Ставим все зависимости: npm i
- Копируем config.example.ts в config.ts, заменяя все данные на реальные
- Собираем приложение: npm run build
- Запускаем: npm run start
- Проверяем, что все работает
- Выходим из приложения
- Ставим менеджер процессов: npm i pm2 -g
- Запускаем приложение в фоне: pm2 start "npm run start"

## Структура проекта
- components - Компоненты приложения
  - input.tsx - Компоненты форм (Поля ввода, выпадающие списки итд)
  - Layout.tsx - Компонент оборачивающий весь сайт (Заголовок, данные авторизации итд)
  - Popup.tsx - Компонент всплывающего окна
  - TablePage.tsx - Компонент таблицы
  - *.module.css - Стили указанного компонента
- lib - Модули приложения
  - auth.ts - Модуль с функциями авторизации
  - db.ts - Модуль для взаимодействия с базой данных
  - getPostBody.ts - Модуль для обработки POST запросов (Форм редактирования, добавления и удаления)
  - groupIdsSchema.tsx - Модуль описывающих схему отрисовки колонки с group_id
  - separateLines.tsx - Модуль для отрисовки нескольких строк разделенных различными символами
- pages - Страницы приложения
  - _app.tsx - Компонент оборачивающий сайт
  - index.tsx - Главная страница с меню
  - login.tsx - Страница авторизации
  - tables - Страницы таблиц
    - dissertations.tsx
    - groups.tsx
    - niokr.tsx
    - ntp.tsx
    - ois.tsx
    - schema.tsx - Вспомогательная страница с выводом типов таблиц
  - api - Функции взаимодействия с таблицами, необходимые для отрисовки страниц
    - departmentActions.ts
    - dissertationActions.ts
    - groupActions.ts
    - niokrActions.ts
    - ntpActions.ts
    - oisActions.ts
    - schemaActions.ts
    - trlAction.ts
- public - Публичные файлы
  - favicon.ico - Иконка сайта
- styles - Стили страниц
  - global.css - Глобальные стили
  - login.module.css - Стили страницы авторизации
  - utils.module.css - Вспомогательные стили
- types - Типы данных в приложении
  - db-types.ts - Типы описывающие таблицы, сгенерированные schema.tsx
- config.ts - Настройки приложения (Данные авторизации, данные базы данных, заголовок сайта)
- package.json - Файл описывающий зависимости
