import { getRequest } from "./api.js";
import { createReservationsList } from "./trips.js";
import { formatTitleMessage } from "./util.js";

if (localStorage.getItem("connected") !== "true" || localStorage.getItem("role") !== "customer") window.location.href = "./index.html";

let id = localStorage.getItem("id");

let response = await getRequest(`customer-reservations/${id}`, {});
if (response && response.ok) {
    console.log(response);
    let title = formatTitleMessage("reservation", response.data.reservations.length);
    document.querySelector("#list_title").textContent = title;
    // Delete previous contents from the list
    document.querySelector("#trips_list").innerHTML = "";
    createReservationsList(document.querySelector("#trips_list"), response.data.reservations);
}