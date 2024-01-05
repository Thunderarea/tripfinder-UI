function createTripsList(container, list, isConnected) {
    list.forEach(item => {
        container.appendChild(createElelement(item, "reservation", isConnected));
    });
    // reservation. reserved
}

function createReservationsList(container, list, isConnected) {
    list.forEach(item => {
        container.appendChild(createElelement(item, "reserved", isConnected));
    });
    // reserved
}

function createAgencyTripsList(container, list, isConnected) {
    list.forEach(item => {
        container.appendChild(createElelement(item, "cancel", isConnected));
    });
    // cancel
}

function createElelement(item, buttonClass, isConnected) {
    // date.toLocaleString(); // 5/12/2020, 6:50:21 PM
    // date.toLocaleDateString(); // 5/12/2020
    // date.toLocaleTimeString(); // 6:50:21 PM
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date
    let html = `
    <li class="trip box">
        <div class="trip_header">
            <div class="trip_title">${item.destination}</div>
            <div class="availability">
                <iconify-icon icon="bi:people-fill"></iconify-icon>${"3"} available spots
            </div>
        </div>
        <ul class="trip_body">
            <li>
                <iconify-icon icon="mdi:calendar-month-outline"></iconify-icon>
                ${new Date(item.startDate).toLocaleString()} - ${new Date(item.endDate).toLocaleString()}
            </li>
            <li>
                <iconify-icon icon="bx:map"></iconify-icon>
                ${item.departurePoint}
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