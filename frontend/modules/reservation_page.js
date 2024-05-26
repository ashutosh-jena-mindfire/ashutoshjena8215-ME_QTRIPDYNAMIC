import config from "../conf/index.js";

//Implementation of fetch call to fetch all reservations
async function fetchReservations() {
  // TODO: MODULE_RESERVATIONS
  // 1. Fetch Reservations by invoking the REST API and return them
  try {
    const res = await fetch(`${config.backendEndpoint}/reservations/`)
    const respond = await res.json();
    return respond ? respond: null;
  }
  catch {
    return null;
  }

  // Place holder for functionality to work in the Stubs
}

//Function to add reservations to the table. Also; in case of no reservations, display the no-reservation-banner, else hide it.
function addReservationToTable(reservations) {
  // TODO: MODULE_RESERVATIONS
  // 1. Add the Reservations to the HTML DOM so that they show up in the table
  const table = document.getElementById('reservation-table-parent')
  const banner = document.getElementById('no-reservation-banner')
  if(reservations?.length) {
    table.style.display = 'block';
    banner.style.display = 'none';

    const row = document.getElementById('reservation-table');

    const dateOptions = {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    };
    
    const timeOptions = {
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric',
      hour12: true
    };
      const url = window.location.href.replace("reservations/","detail/?adventure=")
      reservations.forEach(reservation => {
        const inputDate = new Date(reservation.time);

        const formattedDate = inputDate.toLocaleDateString('en-GB', dateOptions);
        const formattedTime = inputDate.toLocaleTimeString('en-GB', timeOptions);

        row.innerHTML = row.innerHTML + `
        <td>${reservation.id}</td>
        <td>${reservation.name}</td>
        <td>${reservation.adventureName}</td>
        <td>${reservation.person}</td>
        <td>${(new Date(reservation.date)).toLocaleDateString("en-IN")}</td>
        <td>${reservation.price}</td>
        <td>${formattedDate}, ${formattedTime}</td>
        <td  id="${reservation.id}"><a class="reservation-visit-button" href="../detail/?adventure=${reservation.adventure}">Visit Adventure</a></td>
        `
      })
  }
  else {
    table.style.display = 'none';
    banner.style.display = 'block';
  }
  //Conditionally render the no-reservation-banner and reservation-table-parent

  /*
    Iterating over reservations, adding it to table (into div with class "reservation-table") and link it correctly to respective adventure
    The last column of the table should have a "Visit Adventure" button with id=<reservation-id>, class=reservation-visit-button and should link to respective adventure page

    Note:
    1. The date of adventure booking should appear in the format D/MM/YYYY (en-IN format) Example:  4/11/2020 denotes 4th November, 2020
    2. The booking time should appear in a format like 4 November 2020, 9:32:31 pm
  */

}

export { fetchReservations, addReservationToTable };
