# Тестовое задание для Effective Mobile 

Нужно реализовать 2 сервиса. Один сервис пользователей, другой сервис истории действий с
пользователями. В сервисе пользователей должно быть 3 endpoint:
1. Создание пользователя
2. Изменение пользователя
3. Получение списка пользователей  

В сервис “истории действий с пользователями” нужно отправлять события создания пользователя
и изменения. Общение сервисов может происходить любым способом. Сервис “истории действий
с пользователями” должен иметь ручку, которая отдаст историю действий с фильтрами по id
пользователя и постраничной навигацией. Фреймворк так же может быть любой. Один из
сервисов должен быть на JS, для второго можно использовать TS. СУБД - postgresql.

# Итоги

Сервис работы с пользователями написан на TS с фреймворком Nest. Имеет следующие эндпоинты, соответствующие заданию:
1. POST /users (body (json): email (unique), name (optional), password), возвращет созднный экземпляр пользователя в формате json
2. PATCH /users/:id возвращает новый экземпляр пользователя в json
3. GET /users возвращает всех пользователь в json  

Сервис истории действий написан на JS с фреймворком express. Имеет следующие эндпоинты:
1. POST /activity возвращает созданную активность
2. GET /activity возвращет html со списком пользователей с постраничной навигацией и фильтрацией по id пользователей


