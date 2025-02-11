
# Boilerplate12345

## Развертывание нового приложения на основе boilerplate

### 1. Скопировать в отдельную папку всё содержимое кроме папки .git
### 2. Заменить временные строки

Во всем проекте, включая этот файл, заменить (с учетом регистра):

1. Строку `Boilerplate12345` на название проекта в человеко-читаемом виде
2. Строку `boilerplate12345` на название проекта в gitlab - для путей в файловой системе, для ссылок и пр.

### 3. Добавить проект в новый репозиторий

### 4. Удалить раздел "Развертывание нового приложения на основе boilerplate" из этого README.md

## Разработка

Установка зависимостей:
```shell
yarn
```

Запуск в режиме разработки (hot reload):
```shell
yarn watch
```

Приложение будет доступно по адресу: http://localhost:9991/

## Разработка SSR-приложения

Сборка приложения для запуска на бэкенде:
```shell
yarn build-ssr
```

Запуск SSR-сервера:
```shell
yarn server
```

Общая команда для сборки и запуска SSR-сервера:
```shell
yarn ssr
```

Запуск SSR-сервера с отслеживанием измененных файлов (для разработки):
```shell
yarn watch-ssr
```

### Включение eslint в IDE

Для WebStorm/PhpStorm идем в `Настройки` -> `Languages & Frameworks` -> `Code Quality Tools` -> `ESLint`

И включаем там пункты `Automatic ESLint configuration` и `Run eslint --fix on save`

## Настройка выгрузки

### Выгрузка на dev

Для выгрузки на dev-сервер необходимо:
1. переименовать файл `.gitlab-ci.sample.yml` в `.gitlab-ci.yml`, при необходимости внести правки и запушить его в Git.
В дальнейшем любые пуши в ветку `master` будут запускать выгрузку проекта на dev-сервер.

2. Установка на сервере в PM2
   - Скопировать ./ecosystem.config.sample.js в файл ecosystem.config.js папку config на сервере
   - Отредактировать при необходимости
   - Запустить pm2 start ecosystem.config.js для добавления конфига проекта в PM2
   - Запустить pm2 save для сохранения изменений в PM2
   В случае если ecosystem.config.js уже существует, нужно конфигурацию текущего приложения добавить в этот существующий файл, в массив module.exports.apps.

### Выгрузка на production

Для выгрузки на prod нужно раскомментировать секции prod-секции в `.gitlab-ci.yml` и откорректировать их, как минимум
прописал реальные URL бэкенда, tag у gitlab-runner'а и папку для выгрузки.

### Добавление Sentry в проект

Для того чтобы приложение отправляло в Sentry ошибки, нужно:
1. в Sentry создать проект и получить Sentry DSN (url, на который приложение будет отправлять данные об ошибках)
2. В `.gitlab-ci.yml` в секцию `variables` в deploy в переменной `APP_SENTRY_DSN` указать полученный на шаге №1 Sentry DSN 
