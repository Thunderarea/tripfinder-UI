import {deleteRequest, getRequest, postRequest} from "./api.js";
import { showMessage } from "./message.js";

let isConnected = localStorage.getItem("connected") === "true";
let role = localStorage.getItem("role");
let id = localStorage.getItem("id");

function createTripsList(container, list,) {
  let hasButton;
  let buttonAction; // reservation. reserved. delete
  list.forEach(item => {
    hasButton = isConnected;
    buttonAction = "reservation";
    // If there is no user connected or the user is agency, no reservation button is added
    if (isConnected && role) {
      if (role === "agency") {
        // Uncomment this code if you want the agencies to be able to delete trips from the home page
        // if (id == item.agency.id) buttonAction = "delete";
        // else hasButton = false;
        hasButton = false;
      } else if (role === "customer" && item.reservation_id) buttonAction = "reserved";
    }
    initializeElement(item, buttonAction, hasButton, container);
  });
}

function createReservationsList(container, list) {
  if (isConnected) {
    let hasButton = true;
    let buttonAction = "cancel";
    list.forEach(item => {
      item.trip.reservation_id = item.reservation_id;
      item = item.trip;
      initializeElement(item, buttonAction, hasButton, container);
    });
  }
}

function createAgencyTripsList(container, list) {
  if (isConnected) {
    let hasButton = true;
    let buttonAction = "delete";
    list.forEach(item => {
      initializeElement(item, buttonAction, hasButton, container);
    });
  }
}

function initializeElement(item, buttonAction, hasButton, container) {
  let element = createElement(item, buttonAction, hasButton);
  container.appendChild(element);
  // Click listener for the more information button
  element.querySelector(".more_button").addEventListener("click", () => {
    moreInfoModal(item);
  });
  if (hasButton && buttonAction !== "reserved") {
    // If it has button, add its click listener
    element.querySelector(".trip_button").addEventListener("click", function () {
      tripsButtonListener(item, element, buttonAction, this);
    });
  }
}

/**
 * 
 * @param {Object} item - the trip object with all the trip information
 * @param {HTMLElement} tripEl - the trip element in the DOM
 */
async function tripsButtonListener(item, tripEl, buttonAction, button) {
  console.log(item);
  switch (buttonAction) {
    case "reservation": {
      console.log("make reservation");
      makeReservation(item.id, button);
      break;
    }
    case "cancel": {
      console.log("cancel reservation");
      cancelReservation(item.reservation_id, tripEl);
      break;
    }
    case "delete": {
      console.log("delete trip");
      deleteTrip(item.id, tripEl);
      break;
    }
    default:
      break;
  }
}

async function cancelReservation(reservationId, tripEl) {
  let response = await deleteRequest(`reservation/cancel/${reservationId}`, {});
  if (response.ok) {
    showMessage("Successful reservation cancelation", "success");
    tripEl.remove();
  } else showMessage("Error while canceling the reservation", "error");
}

async function deleteTrip(tripId, tripEl) {
  let response = await deleteRequest(`trips/${tripId}`, {});
  if (response.ok) {
    showMessage("Successful deletion of the trip", "success");
    tripEl.remove();
  } else showMessage("Error while deleting the trip", "error");
}

async function makeReservation(tripId, button) {
  let response = await postRequest(`reservation/create`, {
    customerId: id,
    tripId: tripId
  });
  if (response && response.ok) {
    showMessage("Successful reservation", "success");
    button.dataset.action = "reserved";
    // To delete its click listener
    button.replaceWith(button.cloneNode(true));
  } else {
    if (response && response.data && response.data.message) showMessage(response.data.message, "error");
    else showMessage("Error while doing the reservation", "error");
  }
}

async function moreInfoModal(item) {

  if(role === "agency"){

    let response = await getRequest(`reservation/trip/${item.id}`,{});

    if(response && response.ok){
      let moreInfoEl = createMoreInfoModal(item, response.data.customers);
      document.body.appendChild(moreInfoEl);
      // Listener for closing the modal
      moreInfoEl.addEventListener("click", (e) => {
        if (e.target.classList.contains("overlay_window") || e.target.classList.contains("close_overlay_button")) {
          moreInfoEl.remove();
        }
      });
    }
  }
  else {
    let moreInfoEl = createMoreInfoModal(item, null);
    document.body.appendChild(moreInfoEl);
    // Listener for closing the modal
    moreInfoEl.addEventListener("click", (e) => {
      if (e.target.classList.contains("overlay_window") || e.target.classList.contains("close_overlay_button")) {
        moreInfoEl.remove();
      }
    });
  }


}

// <iconify-icon icon="bi:people-fill"></iconify-icon>${"3"} available spots

function createElement(item, buttonAction, hasButton) {
  // date.toLocaleString(); // 5/12/2020, 6:50:21 PM
  // date.toLocaleDateString(); // 5/12/2020
  // date.toLocaleTimeString(); // 6:50:21 PM
  // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date
  let html = `
    <li class="trip box" id="${item.id}">
        <div class="trip_header">
            <div class="trip_title">${item.destination}</div>
            <div class="departure_area">
              <iconify-icon icon="fluent:location-28-filled"></iconify-icon>
              ${item.departure_area}
            </div>
        </div>
        <ul class="trip_body">
            <li>
                <iconify-icon icon="mdi:calendar-month-outline"></iconify-icon>
                ${new Date(item.start_date).toLocaleDateString()} - ${new Date(item.end_date).toLocaleDateString()}
            </li>
            <li>
                <iconify-icon icon="uil:users-alt"></iconify-icon>
                ${item.current_participants}/${item.max_participants}
            </li>
            <li>
                <iconify-icon icon="mdi:company"></iconify-icon>
                ${item.agency.brand_name}
            </li>
        </ul>
        <div class="trip_footer">
            <div class="more_button">more information >></div>
            ${hasButton ? `<button class="colored trip_button" data-action="${buttonAction}"></button>` : ""}
        </div>
    </li>`;
  return new DOMParser().parseFromString(html, "text/html").body.firstElementChild;
}

function createMoreInfoModal(item, customers) {

  let customerInfo = '';

  if (customers && Array.isArray(customers)) {
    // Iterate over each customer in the array
    for (const customer of customers) {
      // Display first and last name for each customer
      customerInfo += `<div class="customer_info">${customer.name} ${customer.surname}</div>`;
    }
  }

  let html = `
    <div class="overlay_window" id="more_info_window">
      <iconify-icon icon="mingcute:close-fill" class="close_overlay_button"></iconify-icon>
      <div class="overlay_content content box">
        <div class="trip_header">
          <h2>Trip to ${item.destination}</h2>
          <div class="row"><iconify-icon icon="fluent:location-28-filled"></iconify-icon>${item.departure_area}</div>
        </div>
        <div class="trip_body">
          <div id="more_info_dates">
            <div class="row">
              <iconify-icon icon="mdi:calendar-arrow-right"></iconify-icon>
              <div class="info_title">Departure at:</div>
              <div>${new Date(item.start_date).toLocaleDateString()}</div>
            </div>
            <div class="row">
              <iconify-icon icon="mdi:calendar-arrow-left"></iconify-icon>
              <div class="info_title">Return at:</div>
              <div>${new Date(item.end_date).toLocaleDateString()}</div>
            </div>
          </div>
          <div class="row">
            <iconify-icon icon="uil:users-alt"></iconify-icon>
            <div class="info_title">Participants:</div>
            <div>${item.current_participants}/${item.max_participants}</div>
          </div>
          ${customers? `
            <div class="box">
                <div id="customer_info_container">${customerInfo}</div>
                
            </div>` : ''}
          <div class="row">
            <iconify-icon icon="ri:calendar-schedule-line"></iconify-icon>
            <div class="info_title">Trip schedule:</div>
          </div>
          <div id="trip_schedule_content" class="box">${item.trip_schedule}</div>
        </div>
        <div class="trip_footer">
          <div class="row">
            <iconify-icon icon="mdi:company"></iconify-icon>
            <div class="info_title">This trip is organized by:</div>
            <div>${item.agency.brand_name}</div>
          </div>
        </div>
      </div>
    </div>
    `;
  return new DOMParser().parseFromString(html, "text/html").body.firstElementChild;
}

export {
  createTripsList,
  createReservationsList,
  createAgencyTripsList,
};