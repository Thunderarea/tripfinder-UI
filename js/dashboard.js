import { showMessage } from "./message.js";

if (localStorage.getItem("connected") !== "true" || localStorage.getItem("role") !== "agency") window.location.href = "./index.html";

document.querySelector("#new_trip_button").addEventListener("click", newTripButtonListener);
document.querySelector("form#new_trip").addEventListener("submit", submitNewTrip);

function newTripButtonListener() {
    document.querySelector("#new_trip_window").style.visibility = "visible";
}

function submitNewTrip(e) {
    e.preventDefault();
    try {
        let formData = new FormData(e.target);

        let startDate = new Date(formData.get("start_date")).getTime();
        let endDate = new Date(formData.get("end_date")).getTime();
        let maxParticipants = formData.get("max_participants");
        let departurePoint = formData.get("departure");
        let destination = formData.get("destination");
        let tripSchedule = quill.root.innerHTML;

        if (startDate > endDate) showMessage("Start date should be before end date", "error");
        else {
            let body = {
                startDate: startDate,
                endDate: endDate,
                departurePoint: departurePoint,
                destination: destination,
                tripSchedule: tripSchedule,
                maxParticipants: maxParticipants,
            }

            // send it
        }

    } catch (error) {
        showMessage("An error occured while creating the new trip", "error");
    }
}

let quill = new Quill('#quill_container', {
    modules: {
        toolbar: [
            [{ 'header': [1, 2, 3, false] }],
            ['bold', 'italic', 'underline'],
            [{ 'list': 'ordered' }, { 'list': 'bullet' }],
            [{ 'align': [] }],
        ]
    },
    placeholder: 'Schedule of the trip...',
    theme: 'snow',
});