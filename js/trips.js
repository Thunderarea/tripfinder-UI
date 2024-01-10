function createTripsList(container, list,) {
  let isConnected = localStorage.getItem("connected") === "true";
  let role = localStorage.getItem("role");

  let hasButton = isConnected;
  let buttonClass = "reservation"; // reservation. reserved
  let element;
  list.forEach(item => {
    // If there is no user connected or the user is agency, no reservation button is added
    if (isConnected && role && role === "agency") hasButton = false;
    element = createElement(item, buttonClass, hasButton);
    container.appendChild(element);
    // Click listener for the more information button
    element.querySelector(".more_button").addEventListener("click", () => {
      moreInfoModal(item, buttonClass, hasButton);
    });
    if (hasButton) {
      // If it has button, add its click listener
      element.querySelector(".trip_button").addEventListener("click", () => {
        tripsButtonListener(item, element);
      });
    }
  });
}

/**
 * 
 * @param {Object} item - the trip object with all the trip information
 * @param {HTMLElement} tripEl - the trip element in the DOM
 */
function tripsButtonListener(item, tripEl) {
  console.log(item);
}

function moreInfoModal(item, buttonClass, hasButton) {
  let moreInfoEl = createMoreInfoModal(item, buttonClass, hasButton);
  document.body.appendChild(moreInfoEl);
  // Listener for closing the modal
  moreInfoEl.addEventListener("click", (e) => {
    if (e.target.classList.contains("overlay_window") || e.target.classList.contains("close_overlay_button")) {
      moreInfoEl.remove();
    }
  });
}

function createReservationsList(container, list) {
  let isConnected = localStorage.getItem("connected") === "true";
  if (isConnected) {
    list.forEach(item => {
      container.appendChild(createElement(item, "reserved", isConnected));
    });
  }
  // reserved
}

function createAgencyTripsList(container, list) {
  let isConnected = localStorage.getItem("connected") === "true";
  if (isConnected) {
    list.forEach(item => {
      container.appendChild(createElement(item, "cancel", isConnected));
    });
  }
  // cancel
}

function createElement(item, buttonClass, hasButton) {
  // date.toLocaleString(); // 5/12/2020, 6:50:21 PM
  // date.toLocaleDateString(); // 5/12/2020
  // date.toLocaleTimeString(); // 6:50:21 PM
  // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date
  let html = `
    <li class="trip box" id="${item.id}">
        <div class="trip_header">
            <div class="trip_title">${item.destination}</div>
            <div class="availability">
                <iconify-icon icon="bi:people-fill"></iconify-icon>${"3"} available spots
            </div>
        </div>
        <ul class="trip_body">
            <li>
                <iconify-icon icon="mdi:calendar-month-outline"></iconify-icon>
                ${new Date(item.start_date).toLocaleDateString()} - ${new Date(item.end_date).toLocaleDateString()}
            </li>
            <li>
                <iconify-icon icon="bx:map"></iconify-icon>
                ${item.departure_area}
            </li>
            <li>
                <iconify-icon icon="mdi:company"></iconify-icon>
                ${item.agency.brand_name}
            </li>
        </ul>
        <div class="trip_footer">
            <div class="more_button">more information >></div>
            ${hasButton ? `<button class="colored trip_button ${buttonClass}"></button>` : ""}
        </div>
    </li>`;
  return new DOMParser().parseFromString(html, "text/html").body.firstElementChild;
}

function createMoreInfoModal(item, buttonClass, hasButton) {
  let html = `
    <div class="overlay_window" id="more_info_window">
      <iconify-icon icon="mingcute:close-fill" class="close_overlay_button"></iconify-icon>
      <div class="overlay_content content box">
        <div class="trip_header">
          <h2>Trip to ${item.destination}</h2>
          <div class="row"><iconify-icon icon="bi:people-fill"></iconify-icon>3 available spots</div>
        </div>
        <div class="trip_body">
          <div class="row">
            <iconify-icon icon="bx:map"></iconify-icon>
            <div class="info_title">Area:</div>
            <div>${item.departure_area}</div>
          </div>
          <div id="more_info_dates">
            <div class="row">
              <iconify-icon icon="mdi:calendar-arrow-right"></iconify-icon>
              <div class="info_title">Departure at:</div>
              <div>${new Date(item.start_date).toLocaleString()}</div>
            </div>
            <div class="row">
              <iconify-icon icon="mdi:calendar-arrow-left"></iconify-icon>
              <div class="info_title">Return at:</div>
              <div>${new Date(item.end_date).toLocaleString()}</div>
            </div>
          </div>
          <div class="row">
            <div class="info_title">Max participants:</div>
            <div>${item.max_participants}</div>
          </div>
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
            <div>${"Agency name"}</div>
          </div>
          ${hasButton ? `<button class="colored trip_button ${buttonClass}"></button>` : ""}
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