import { showMessage } from "./message.js";

// If the user is already connected, redirect to the home page
if (localStorage.getItem("connected") === "true") window.location.href = "./index.html";

document.querySelector("form#signin").addEventListener("submit", login);

function login(e) {
    e.preventDefault();
    let formData = new FormData(e.target);

    let username = formData.get("username");
    let password = formData.get("password");
    let success = false;
    // Here, you have to call the API and save the respective data in case of a successful connection
    if (username === "customer" && password === "test") {
        localStorage.setItem("role", "customer");
        success = true;
    } else if (username === "agency" && password === "test") {
        localStorage.setItem("role", "agency");
        success = true;
    }

    if (success) {
        localStorage.setItem("connected", true);
        localStorage.setItem("username", username);
        // After a successful connection, redirect the user to the home page
        window.location.href = "./index.html";
    } else {
        document.querySelector("form#signin").reset();
        showMessage("Wrong credentials", "error");
    }
}