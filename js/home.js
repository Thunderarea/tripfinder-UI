import { getRequest } from "./api.js";

(async function initializeFilters() {
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
})();

function getOption(name) {
  let html = `<option value="${name}">${name}</option>`;
  return new DOMParser().parseFromString(html, "text/html").body.firstElementChild;
}
