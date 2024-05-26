import config from "../conf/index.js";

async function init() {
  //Fetches list of all cities along with their images and description
  let cities = await fetchCities();

  //Updates the DOM with the cities
  if (cities) {
    cities.forEach((key) => {
      addCityToDOM(key.id, key.city, key.description, key.image);
    });
  }
}

//Implementation of fetch call
async function fetchCities() {
  // TODO: MODULE_CITIES
  // 1. Fetch cities using the Backend API and return the data
  return await fetch(config.backendEndpoint+"/cities")
  .then(responce => responce.json())
  .then(res => {
    return res;
  })
  .catch((error) => {return null})
}

//Implementation of DOM manipulation to add cities
function addCityToDOM(id, city, description, image) {
  // TODO: MODULE_CITIES
  // 1. Populate the City details and insert those details into the DOM
  const container = document.createElement('div');
  container.setAttribute('class','col col-sm-6 col-lg-3');

  container.innerHTML = `
        <a id=${id} href="./pages/adventures/?city=${id}">
          <div class="tile">
            <img class="" src="${image}">
            <div class="tile-text text-center">
              <h6>${city}</h6>
              <p>${description}</p>
            </div>
          </div>
        </a>
  `
  document.getElementById('data').appendChild(container);
}

export { init, fetchCities, addCityToDOM };