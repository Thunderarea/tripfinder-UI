import { showMessage } from "./message.js";
import { postRequest, getRequest } from "./api.js";
import { createAgencyTripsList } from "./trips.js";
import { formatTitleMessage } from "./util.js";

if (localStorage.getItem("connected") !== "true" || localStorage.getItem("role") !== "agency") window.location.href = "./index.html";

let id = localStorage.getItem("id");

// Initialize text editor
let quill = new Quill('#quill_container', {
    modules: {
        toolbar: [
            [{ 'header': [1, 2, 3, false] }],
            ['bold', 'italic', 'underline'],
            [{ 'list': 'ordered' }, { 'list': 'bullet' }],
        ]
    },
    placeholder: 'Schedule of the trip...',
    theme: 'snow',
});

(function init() {

    document.querySelector("#new_trip_button").addEventListener("click", newTripButtonListener);
    document.querySelector("form#new_trip").addEventListener("submit", submitNewTrip);

    initializeTripsList();
})();

async function initializeTripsList() {
    let response = await getRequest(`agencies/${id}/trips`, {});
    if (response && response.ok) {
        console.log(response);
        let title = formatTitleMessage("trip", response.data.length);
        document.querySelector("#list_title").textContent = title;
        // Delete previous contents from the list
        document.querySelector("#trips_list").innerHTML = "";
        createAgencyTripsList(document.querySelector("#trips_list"), response.data);
    }
}

function newTripButtonListener() {
    let newTripWindow = document.querySelector("#new_trip_window");
    if (newTripWindow) {
        newTripWindow.style.visibility = "visible";
        newTripWindow.addEventListener("click", (e) => {
            if (e.target.classList.contains("overlay_window") || e.target.classList.contains("close_overlay_button")) {
                newTripWindow.style.visibility = "hidden";
            }
        });
    }
}

async function submitNewTrip(e) {
    e.preventDefault();
    try {
        let formData = new FormData(e.target);

        let startDate = new Date(formData.get("start_date")).getTime();
        let endDate = new Date(formData.get("end_date")).getTime();
        let maxParticipants = formData.get("max_participants");
        let departureArea = formData.get("departure");
        let destination = formData.get("destination");
        let tripSchedule = quill.root.innerHTML;

        let errorMessages = [];
        if (startDate > endDate) {
            errorMessages.push("End date should be after start date");
        }
        if (new Date(new Date().toLocaleDateString()).getTime() > startDate) {
            errorMessages.push("Start date cannot be before today");
        }
        if (quill.getText().trim() === "") {
            errorMessages.push("You should add content to the trip schedule");
        }

        if (errorMessages.length > 0) {
            errorMessages.forEach(message => showMessage(message, "error"));
        } else {
            let body = {
                trip: {
                    startDate: startDate,
                    endDate: endDate,
                    departureArea: departureArea,
                    destination: destination,
                    tripSchedule: tripSchedule,
                    maxParticipants: maxParticipants,
                },
                agencyId: id,
            };
            let response = await postRequest("trips", body);
            if (response && response.ok) {
                console.log(response);
                e.target.reset();
                showMessage("Successful creation of trip", "success");
                initializeTripsList();
                document.querySelector("#new_trip_window").style.visibility = "hidden";
            }
        }
    } catch (error) {
        showMessage("An error occured while creating the new trip", "error");
    }
}