function createTripsList(container, trips, isConnected) {
    trips.forEach(trip => {
        container.appendChild(createTripEl(trip, isConnected, "reservation"));
    });
}

function createReservationsList() {

}

function createAgencyTripsList() {

}

function createTripEl(trip, isConnected, buttonClass) {
    let html = `
    <li class="trip box">
        <div class="trip_header">
            <div class="trip_title">${trip.destination}</div>
            <div class="availability">
                <iconify-icon icon="bi:people-fill"></iconify-icon>${"3"} available spots
            </div>
        </div>
        <ul class="trip_body">
            <li>
                <iconify-icon icon="mdi:calendar-month-outline"></iconify-icon>
                ${trip.startDate} - ${trip.endDate}
            </li>
            <li>
                <iconify-icon icon="bx:map"></iconify-icon>
                ${trip.departurePoint}
            </li>
            <li>
                <iconify-icon icon="mdi:company"></iconify-icon>
                ${"Agency name"}
            </li>
        </ul>
        <div class="trip_footer">
            <div class="more_button">more information >></div>
            ${ isConnected ? `<button class="colored trip_button ${buttonClass}"></button>` : ""}
        </div>
    </li>`;
    return new DOMParser().parseFromString(html, "text/html").body.firstElementChild;
}

export {
    createTripsList,
    createReservationsList,
    createAgencyTripsList,
};