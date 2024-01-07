import { getRequest } from "./api.js";
import { createTripsList } from "./trips.js";
import { formatTitleMessage } from "./util.js";

(async function init() {

  initializeFilters();
  document.querySelector("#apply_button").addEventListener("click", applyListener);

})();

async function initializeFilters() {
  let response = await getRequest("trips/destinations", {});
  if (response && response.ok) {
    let destinationsEl = document.querySelector("#destination");
    response.data.forEach(dst => {
      destinationsEl.appendChild(getOption(dst));
    });
  }
  response = await getRequest("trips/departure-areas", {});
  if (response && response.ok) {
    let departuresEl = document.querySelector("#departure");
    response.data.forEach(dpt => {
      departuresEl.appendChild(getOption(dpt));
    });
  }
}

async function applyListener() {
  let data = getFilterValues();
  let response = await getRequest("trips/", data);
  console.log(response);
  if (response && response.ok) {
    let title = formatTitleMessage("trip", response.data.length);
    document.querySelector("#page_subtitle").textContent = title;
    document.querySelector("#trips_list").innerHTML = "";
    createTripsList(document.querySelector("#trips_list"), response.data);
  }
}

function getFilterValues() {
  let data = {};
  let value;

  value = document.querySelector("#filters #start_date").value;
  if (value !== "") data.startDate = new Date(value).getTime();
  value = document.querySelector("#filters #end_date").value;
  if (value !== "") data.endDate = new Date(value).getTime();
  value = document.querySelector("#filters #destination").value;
  if (value !== "") data.destination = value;
  value = document.querySelector("#filters #departure").value;
  if (value !== "") data.departureArea = value;
  // value = document.querySelector("#filters #agency").value;
  // if (value !== "") data.agency = value;

  return data;
}

applyListener();

function getOption(name) {
  let html = `<option value="${name}" title="${name}">${name.substring(0, 24)}</option>`;
  return new DOMParser().parseFromString(html, "text/html").body.firstElementChild;
}