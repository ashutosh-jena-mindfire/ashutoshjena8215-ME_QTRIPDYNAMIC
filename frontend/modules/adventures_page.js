import config from "../conf/index.js";

//Implementation to extract city from query params
function getCityFromURL(search) {
  // TODO: MODULE_ADVENTURES
  // 1. Extract the city id from the URL's Query Param and return it
  const params = new URLSearchParams(search);
  return params.get("city");
}

//Implementation of fetch call with a paramterized input based on city
async function fetchAdventures(city) {
  // TODO: MODULE_ADVENTURES
  // 1. Fetch adventures using the Backend API and return the data
  return await fetch(`${config.backendEndpoint}/adventures?city=${city}`)
    .then((responce) => responce.json())
    .then((res) => {
      return res;
    })
    .catch((error) => {
      return null;
    });
}

//Implementation of DOM manipulation to add adventures for the given city from list of adventures
function addAdventureToDOM(adventures) {
  // TODO: MODULE_ADVENTURES
  // 1. Populate the Adventure Cards and insert those details into the DOM
  for (const adventure of adventures) {
    const div = document.createElement("div");
    div.setAttribute("class", "col col-sx-6 col-sm-6 col-lg-3 mb-3");
    div.innerHTML = `
    <a href="detail/?adventure=${adventure.id}" id=${adventure.id}>
    <div class='activity-card'>
        <div class="category-banner">${adventure.category}</div>
        <div class="w-100 h-75"><img src="${adventure.image}" alt="${adventure.name}"></div>
        <div class="w-100 mt-3 px-3">
          <div class="d-flex justify-content-between flex-wrap">
            <div>${adventure.name}</div>
            <div><span>&#8377;</span> ${adventure.costPerHead}</div>
          </div>
          <div class="d-flex justify-content-between flex-wrap">
            <div >Duration</div>
            <div>${adventure.duration} hours</div>
          </div>
        </div>
        </div>
        </a>
    `;
    document.getElementById("data").appendChild(div);
  }
}

//Implementation of filtering by duration which takes in a list of adventures, the lower bound and upper bound of duration and returns a filtered list of adventures.
function filterByDuration(list, low, high) {
  // TODO: MODULE_FILTERS
  // 1. Filter adventures based on Duration and return filtered list
  return list.filter(item => item.duration >= low && item.duration <= high)

}

//Implementation of filtering by category which takes in a list of adventures, list of categories to be filtered upon and returns a filtered list of adventures.
function filterByCategory(list, categoryList) {
  // TODO: MODULE_FILTERS
  // 1. Filter adventures based on their Category and return filtered listcd
  return list.filter(e => categoryList.some(item => item === e.category))
}

// filters object looks like this filters = { duration: "", category: [] };

//Implementation of combined filter function that covers the following cases :
// 1. Filter by duration only
// 2. Filter by category only
// 3. Filter by duration and category together

function filterFunction(list, filters) {
  // TODO: MODULE_FILTERS
  // 1. Handle the 3 cases detailed in the comments above and return the filtered list of adventures
  // 2. Depending on which filters are needed, invoke the filterByDuration() and/or filterByCategory() methods

  if(filters?.category?.length) {
    list = filterByCategory(list,filters.category);
  }

  if(filters?.duration) {
    const duration = filters.duration.split('-');
    list =filterByDuration(list,duration[0],duration[1]);
  }

  // Place holder for functionality to work in the Stubs
  return list;
}

//Implementation of localStorage API to save filters to local storage. This should get called everytime an onChange() happens in either of filter dropdowns
function saveFiltersToLocalStorage(filters) {
  // TODO: MODULE_FILTERS
  // 1. Store the filters as a String to localStorage
  if(!filters) return false;
  localStorage.setItem("filters",JSON.stringify(filters))
  return true;
}

//Implementation of localStorage API to get filters from local storage. This should get called whenever the DOM is loaded.
function getFiltersFromLocalStorage() {
  // TODO: MODULE_FILTERS
  // 1. Get the filters from localStorage and return String read as an object
  const filters = localStorage.getItem("filters");
  if(filters) {
    return JSON.parse(filters);
  }
  // Place holder for functionality to work in the Stubs
  return null;
}

//Implementation of DOM manipulation to add the following filters to DOM :
// 1. Update duration filter with correct value
// 2. Update the category pills on the DOM

function generateFilterPillsAndUpdateDOM(filters) {
  // TODO: MODULE_FILTERS
  // 1. Use the filters given as input, update the Duration Filter value and Generate Category Pills
  const categoryList = document.getElementById('category-list')
  if(filters && filters["category"])
  {
    filters["category"].forEach(item => {
    const div = document.createElement("div");
    div.setAttribute('id',item["duration"]);
    div.classList.add("category-filter");
    div.textContent = item;
    categoryList.appendChild(div);
  })
}
// console.log("**",filters["category"]);
// if(filters && filters["duration"])
//   {
//     const div = document.createElement("div");
//     div.setAttribute('id',filters["duration"]);
//     div.classList.add("category-filter");
//     div.textContent = filters["duration"];
//     categoryList.appendChild(div);
// }
}
export {
  getCityFromURL,
  fetchAdventures,
  addAdventureToDOM,
  filterByDuration,
  filterByCategory,
  filterFunction,
  saveFiltersToLocalStorage,
  getFiltersFromLocalStorage,
  generateFilterPillsAndUpdateDOM,
};
