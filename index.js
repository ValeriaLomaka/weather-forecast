const searchForm = document.querySelector(".js-search-form");
const list = document.querySelector('.js-list');

searchForm.addEventListener('submit', handlerSearch);

function handlerSearch(event) {
    event.preventDefault();
    // console.dir(event.currentTarget);
    const { city, days } = event.currentTarget.elements;
    console.dir(city);
     console.dir(days);

    serviceWeather(city.value, days.value)
      .then(
        (data) => (list.innerHTML = createMarkup(data.forecast.forecastday))
      )
      .catch((error) => console.log(error))
      .finally(() => searchForm.reset())
    
}

function serviceWeather(city='', days=1) {
    const BASE_URL = 'http://api.weatherapi.com/v1';
    const API_KEY = '827a813fed674cf3ad0135419231605';

    return fetch(
        `${BASE_URL}/forecast.json?key=${API_KEY}&q=${city}&days=${days}&lang=uk`)
        .then(response => {
            console.log(response);
            if (!response.ok) {
                throw new Error(response.statusText)
            }
            return response.json();
        });
}

serviceWeather("Lviv", 5)
  .then((data) => console.log(data))
    .catch((error) => console.error(error));
  

function createMarkup(arr) {
        return arr
          .map(
            ({
              date,
              day: {
                avgtemp_c,
                condition: { text, icon },
              },
            }) => `<li>
            <img src="${icon}" alt="${text}">
            <h2>${date}</h2>
            <h3>${text}</h3>
            <h3>${avgtemp_c}</h3>
            </li>`
          )
          .join("");
    }