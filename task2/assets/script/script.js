// 2. На этой неделе вы будете работать с ещё одним открытым API — Swapi. Вот его [документация](https://swapi.dev/documentation), ознакомьтесь с ней.
//     Swapi — это доступный источник данных для всех данных из канонической вселенной «Звездных войн». Можно запросить данные о персонажах, кораблях и не только!
//     Нам нужно создать приложение, которое будет делать запрос к API и полученную информацию показывать на экране. Пример запроса:
//     ```jsx
//     https://swapi.nomoreparties.co/planets/1 — // планета с идентификатором 1
//     ```
//     То есть в запросе нам нужно передать, какую сущность хотим получить (фильмы, людей, планет starships) и её числовой идентификатор. В API есть по 10 сущностей каждого вида, поэтому идентификатор должен быть от 1 до 10:
//     ```jsx
//     // Attributes:
//     films string -- The URL root for Film resources
//     people string -- The URL root for People resources
//     planets string -- The URL root for Planet resources
//     species string -- The URL root for Species resources
//     starships string -- The URL root for Starships resources
//     vehicles string -- The URL root for Vehicles resources
//     ```
//     И указать числовой идентификатор, он должен быть от 1 до 10 (так как для каждого списка в API всего по 10 сущностей):
//     ```jsx
//     /people/  -- get all the people resources
//       // Пример запроса: https://swapi.dev/api/people
//     /people/:id/-- get a specific people resource 
//     // Пример запроса: https://swapi.dev/api/people/1/
//     ```
//     Запрос должен уходить на сервер при нажатии на кнопку (нужно добавить обработчик). В разметке HTML должно быть минимум два поля: в первое нужно выводить результат поиска, если данные пришли и всё хорошо, во втором — ошибку, если что-то пошло не так. (Добейтесь, чтобы ваше приложение выводило понятные пользователю сообщения в случае ошибки, например «Сервер не доступен»). Сообщения должны быть видны поочередно, если результат показан, ошибка должна быть сброшена. И наоборот. Обязательно добавьте обработчик ответа: если ответ успешный, следующий обработчик `then` получит объект ответа на вход, если с ответом что-то не так, отклоните промис (для этого верните `Promise.reject` с кодом статуса ответа). Блок `catch` и `finally` использовать обязательно.
//     Хороший интерфейс сообщает пользователю, что идёт загрузка надписью «Идёт загрузка» или крутящимся лоадером пока идёт запрос. Если хотите улучшить ваше приложение, то вы можете также реализовать этот функционал.


const form = document.forms[0];
const option = form.elements.name;
const id = form.elements.id;
let optionValue = "";
let idValue = "";

console.log(option);
console.log(id);

function showText() {
    form.addEventListener("change", function text (event) {
        if (event.target.name === "name") {
            optionValue = event.target.value;
            console.log(option.value);
        } 
        else if  (event.target.name === "id") {
            idValue = event.target.value;
            console.log(id.value);
        } else console.log("Err")
            }) 

	fetch(`https://swapi.dev/api/${option.value}/${id.value}`, {
		method: 'GET'
	})
	.then(response => response.json())
	.then((data) => {
        const info = document.querySelector(".info");
            info.innerHTML = `
                <p>Name: ${data.name}</p>
                `
        console.log(data)
    })
	.catch(error => {
        info.innerHTML = `
        <p>Ошибка: ${error.name}</p>
        `
    })

}
document.querySelector('.button').addEventListener('click', showText);