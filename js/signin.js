import {postRequest} from "./api.js";

// If the user is already connected, redirect to the home page
if (localStorage.getItem("connected") === "true") window.location.href = "./index.html";

document.querySelector("form#signin").addEventListener("submit", login);

async function login(e) {
    e.preventDefault();
    let formData = new FormData(e.target);

    let request = {
        "username": formData.get("username"),
        "password": formData.get("password")
    };


    await postRequest("auth/authenticate", request).then((res) => {
        if (res.ok) {
            localStorage.setItem("connected", true);
            localStorage.setItem("username", res.data.user.username);
            localStorage.setItem("role", res.data.user.user_type);
            localStorage.setItem("id", res.data.id);
            // After a successful connection, redirect the user to the home page
            if (res.data.user.user_type === "agency") {
                window.location.href = "./dashboard.html";
            } else window.location.href = "./index.html";
        } else {
            document.querySelector("form#signin").reset();
        }
    })
}