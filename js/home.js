import { getRequest } from "./api.js";
import { createTripsList } from "./trips.js";

(async function init() {
  
  initializeFilters();
  document.querySelector("#apply_button").addEventListener("click", applyListener);

})();

async function initializeFilters() {
  let destinations = await getRequest("trips/destinations", {});
  console.log(destinations);
  let destinationsEl = document.querySelector("#destination");
  destinations.forEach(dst => {
    destinationsEl.appendChild(getOption(dst));
  });
  let departurePoints = await getRequest("trips/departure-points", {});
  console.log(departurePoints);
  let departuresEl = document.querySelector("#departure");
  departurePoints.forEach(dpt => {
    departuresEl.appendChild(getOption(dpt));
  });
}

async function applyListener() {
  let trips = await getRequest("trips/", {});
  console.log(trips);
  createTripsList(document.querySelector("#trips_list"), trips, localStorage.getItem("connected") === "true", localStorage.getItem("role"));
}

applyListener();

function getOption(name) {
  let html = `<option value="${name}">${name}</option>`;
  return new DOMParser().parseFromString(html, "text/html").body.firstElementChild;
}