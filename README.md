# **Проектная работа: "Mesto - (frontend + backend)". Создана в рамках учебы в Яндекс.Практикум**
*Является итоговой работой по 15 спринту*

---
## ***Описание и функциональность***

![image](https://github.com/Sibisov-Artem/react-mesto-auth/blob/main/screenshot/screenshot.jpg?raw=true)

Проект представляет из себя веб-приложение в сборе (frontend + backend).

***Frontend*** представляет из себя интерактивную страницу, которая позволяет пользователям регистрироваться, авторизироваться и делиться своими фотографиями.
Основой для создания этой части послужила работа [react-mesto-auth](https://github.com/Sibisov-Artem/react-mesto-auth).

Основой для ***Backend*** послужила работа [express-mesto-gha](https://github.com/Sibisov-Artem/express-mesto-gha).

<br>

***Функциональность:***

***Frontend:***
 * Регистрация и авторизация пользователя;
 * Редактирование профиля (имя и профессия);
 * Добавление/удаление своих фото-карточек;
 * Возможность поставить/снять лайк фото-карточке;
 * Просмотр фотографии на полный экран;
 * Плавное открытие/закрытие попапов;
 * Закрытие попапа по оверлею (фону) и по нажатию на Escape;
 * Все данные хранятся на сервере, использовано стороннее API.

***Backend:***
+ Регистрация
+ Авторизация
+ Обновление данных пользователя
+ Обновление аватара
+ Получение списка пользователей
+ Получение пользователя по ID 
+ Получение информации о текущем пользователе
+ Получение списка карточек
+ Создание карточки
+ Удаление карточки
+ Постановка лайка
+ Снятие лайка
+ Реализована централизованная обработка ошибок
+ Валидированы приходящие на сервер запросы
+ Валидированы данные на уровне схемы (с использование регулярных выражений)
+ Ограничение количества запросов (защита от DDoS атак)

---

## ***Используемые технологии:***

### <ins>***Frontend:***</ins>

* ***HTML***
  * Семантические теги
  * БЭМ-методология
  
* ***СSS***
  * БЭМ (Nested)
  * Flexbox
  * Grid Layout
  * Псевдоклассы CSS
  * Анимация элементов
  * Позиционирование блоков и элементов
  * Responsive верстка (отзывчивая) через сочетание адаптивной верстки через медиа-запросы и верстки резиновой через использование относительных размеров блоков

* ***JavaScript***
* ***React JS***
* ***React Router***
   
<br>

### <ins>***Backend:***</ins>

* ***JavaScript***

* ***NodeJS***

* ***Express***

* ***MongoDB***

<br>


---
## ***Инструкция по развёртыванию:***

Клонировать репозиторий на свой компьютер через командную строку:
```
git clone https://github.com/Sibisov-Artem/react-mesto-api-full-gha.git
```
или скачать архивом и распаковать.

**Запуск проекта:**

* ***Frontend:***
    * `npm ci` — установка зависимостей
    * `npm run build`  запуск сборки проекта
    * `npm run start` — запускает проект на локальном сервере

* ***Backend:***
    * `npm ci` — установка зависимостей
    * `npm lint` — запускает проверку линтером
    * `npm run start` — запускает сервер   
    * `npm run dev` — запускает сервер с hot-reload


<!--
## Ссылки на проект

Frontend https://a-sibisov.nomoredomains.xyz

Backend https://api.a-sibisov.nomoredomains.xyz

-->
