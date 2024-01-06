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
  response = await getRequest("trips/departure-points", {});
  if (response && response.ok) {
    let departuresEl = document.querySelector("#departure");
    response.data.forEach(dpt => {
      departuresEl.appendChild(getOption(dpt));
    });
  }
}

async function applyListener() {
  let response = await getRequest("trips/", {});
  console.log(response);
  if (response && response.ok) {
    let title = formatTitleMessage("trip", response.data.length);
    document.querySelector("#page_subtitle").textContent = title;
    createTripsList(document.querySelector("#trips_list"), response.data);
  }
}

applyListener();

function getOption(name) {
  let html = `<option value="${name}" title="${name}">${name.substring(0, 24)}</option>`;
  return new DOMParser().parseFromString(html, "text/html").body.firstElementChild;
}