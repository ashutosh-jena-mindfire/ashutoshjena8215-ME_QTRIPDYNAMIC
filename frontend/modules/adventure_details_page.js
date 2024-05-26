import config from "../conf/index.js";

//Implementation to extract adventure ID from query params
function getAdventureIdFromURL(search) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Get the Adventure Id from the URL
  const urlParams = new URLSearchParams(search);
  const id = urlParams.get('adventure');
  // Place holder for functionality to work in the Stubs
  return id;
}
//Implementation of fetch call with a paramterized input based on adventure ID
async function fetchAdventureDetails(adventureId) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Fetch the details of the adventure by making an API call
  try {
    const res = await fetch(config.backendEndpoint+'/adventures/detail?adventure='+adventureId)
    const respond = await res.json();
    if(!respond) return null;
    return respond
  }
  catch {
    return null;
  }

  // Place holder for functionality to work in the Stubs
  // return null;.re
}

//Implementation of DOM manipulation to add adventure details to DOM
function addAdventureDetailsToDOM(adventure) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Add the details of the adventure to the HTML DOM
  const content = document.getElementById("adventure-content");
  const name = document.getElementById('adventure-name');
  const subtitle = document.getElementById('adventure-subtitle');
  const photo = document.getElementById('photo-gallery');
  name.innerHTML = adventure.name;
  subtitle.innerHTML = adventure.subtitle;
  content.innerHTML = adventure.content;
  adventure.images.forEach(image => {
    const img = document.createElement('img');
    img.setAttribute('src',image);
    img.classList.add('activity-card-image');
    photo.append(img);
  }) 

}

//Implementation of bootstrap gallery component
function addBootstrapPhotoGallery(images) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Add the bootstrap carousel to show the Adventure images
  const div = document.createElement('div');
  div.setAttribute('id','carouselExampleIndicators')
  div.setAttribute('class','carousel slide')
  div.setAttribute('data-bs-ride','carousel')
  const carouselInner = document.createElement('div');
  const carouselIndicators = document.createElement('div');
  carouselInner.classList.add('carousel-inner')
  carouselIndicators.classList.add('carousel-indicators')
  images.forEach((image,i) => {
    const carouselItem = document.createElement('div');
    carouselItem.classList.add("carousel-item");
    if(i == 0) {
      carouselIndicators.innerHTML += `<button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" class="active" aria-current="true"></button>`
      carouselItem.classList.add('active')
    }
    else {
      carouselIndicators.innerHTML += `<button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="${i}" aria-label="Slide 2"></button>`
    }
    const img = document.createElement('img');
    img.setAttribute('src',image);
    img.classList.add('activity-card-image');
    img.classList.add('d-block');
    carouselItem.append(img);
    carouselInner.append(carouselItem);
  }) 
  div.append(carouselIndicators)
  div.append(carouselInner)

  div.innerHTML = div.innerHTML + `
  <a class="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-bs-slide="prev">
  <span class="carousel-control-prev-icon" aria-hidden="true"></span>
  <span class="sr-only"></span>
</a>
<a class="carousel-control-next" href="#carouselExampleIndicators" role="button" data-bs-slide="next">
  <span class="carousel-control-next-icon" aria-hidden="true"></span>
  <span class="sr-only"></span>
</a>
  `
  const photo = document.getElementById('photo-gallery')
  photo.innerHTML = '';
  photo.append(div)
}

//Implementation of conditional rendering of DOM based on availability
function conditionalRenderingOfReservationPanel(adventure) {
  // TODO: MODULE_RESERVATIONS
  // 1. If the adventure is already reserved, display the sold-out message.
  const soldOut = document.getElementById("reservation-panel-sold-out")
  const available = document.getElementById("reservation-panel-available")
  if(adventure.available) {
    soldOut.style.display = 'none';
    available.style.display = 'block';
    document.getElementById("reservation-person-cost").innerHTML = adventure.costPerHead;
  }
  else {
    soldOut.style.display = 'block';
    available.style.display = 'none';
  }

}

//Implementation of reservation cost calculation based on persons
function calculateReservationCostAndUpdateDOM(adventure, persons) {
  // TODO: MODULE_RESERVATIONS
  // 1. Calculate the cost based on number of persons and update the reservation-cost field
  document.getElementById("reservation-cost").innerHTML = persons*adventure.costPerHead;
}

//Implementation of reservation form submission
function captureFormSubmit(adventure) {
  // TODO: MODULE_RESERVATIONS
  // 1. Capture the query details and make a POST API call using fetch() to make the reservation
  // 2. If the reservation is successful, show an alert with "Success!" and refresh the page. If the reservation fails, just show an alert with "Failed!".
  const form = document.getElementById('myForm')
  form.addEventListener("submit", event => {
    event.preventDefault();
    
    const body = {
      name: form.elements["name"].value,
      date: form.elements["date"].value,
      person: form.elements["person"].value,
      adventure: adventure.id
    }
    const option = {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    }
  
    fetch(`${config.backendEndpoint}/reservations/new`, option)
    .then(
      (res) => {
          alert("Success!");
          location.reload();

      }
    )
    .catch((error => {
      alert("Failed!");
    })) 
  })
}

//Implementation of success banner after reservation
function showBannerIfAlreadyReserved(adventure) {
  // TODO: MODULE_RESERVATIONS
  // 1. If user has already reserved this adventure, show the reserved-banner, else don't
  if(adventure.reserved) {
    document.getElementById("reserved-banner").style.display = "block"
  }
  else {
    document.getElementById("reserved-banner").style.display = "none"
  }
}

export {
  getAdventureIdFromURL,
  fetchAdventureDetails,
  addAdventureDetailsToDOM,
  addBootstrapPhotoGallery,
  conditionalRenderingOfReservationPanel,
  captureFormSubmit,
  calculateReservationCostAndUpdateDOM,
  showBannerIfAlreadyReserved,
};
