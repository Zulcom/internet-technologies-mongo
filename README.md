# internet-technologies-mongo
Решаю 8 лабу к курсу "Интернет-технологии" в ИКИТ по направлению 09.03.01
## Если прям ничего не понятно

В общем монго — нереляцинная бд (хранит не табличками).  
Там вместо них коллекции объектов.  
Вот я беру коллекцию с названием ad и пишу в неё новый объект(`routes/create`).   
Потом я читаю все объекты из коллекции и вывожу их (`routes/read`).  
Если нужно удалить какой-то — беру его айдишник, сую в новый объект и отдаю базе с командой "удалить" (`routes/delete`).  
### Как происходит взаимодействие с пользователем?
Благодаря HTML формам, которые умеют реагировать на кнопки и посылать на сервер (в роуты) данные из полей.   
На странице `/create` это видно лучше всего — заполнил поля, нажал кнопку,  
а HTML вытащил поля и отправил данные на сервер с типом запроса POST.  
В роуте два варианта — `router.get` и `router.post`  
`GET` — тип по умолчанию, браузеры делают всегда гет страниц,  
а формы HTML уходят в типе `POST` (атрибут `method` тега `form`).  
На сервере мы знаем, каким типом у нас пришел запрос и выбираем, какую из функций `router` выбрать.    
`GET` — вернет верстку HTML из шаблона, чтобы браузер увидел форму для заполнения, а пост примет данные от HTML,  
разберет их, сформирует объект и передаст в бд.На страничке / все происходит еще проще — один метод `GET`,  
который берет массив объектов из базы, передает в шаблон, тот пробегается ао массиву и формирует верстку HTML.  
В этой верстке мы формируем хитрую форму с `action=delete`, `method=post` и скрытым полем, в котором уже вписан ид.  
Добавляем к форме кнопку удалить, которая при нажатии отправит форму по адресу `action` типом `method`. В нашем случае `POST /delete`.  
Делит знает только тип `POST`, при запросе в который из скрытого поля берется айдишник записи,  
оборачивается в объект, отправляется этот объект с запросом на удаление,  
после чего нас перекидывает обратно на /, где мы еще разок отрисуем все объекты из базы,  
но уже без удаленного, ведь он удален.  
### Как работаем с базой?  
В файле `db.js` создаем подключение, потом просто подключаем этот файл с подключением там,
где нам нужно, вытаскивая из него объект подключения.   Делаем `dbconn.then`, как бы говоря «_после подключения к базе делй это_»  
и оперируя `.collection('ad')` делаем классические `insert, delete и select` (в моем коде `find`)  
### Важные замечания
HTML сам ничего не делает, это браузер смотрит что мы делаем с HTML и в зависимости от этого посылает разные запросы серверу  
`GET`, `POST` — методы протокола HTTP, a не типы запроса HTML, **у него вообще никаких запросов нет.**  
Но для упрощения рассказа я решил допустить две такие _ошибочки_.
