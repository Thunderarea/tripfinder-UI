import { showMessage } from "./message.js";
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

        console.log(res)

        if (res.data.status === "SUCCESS" ) {
            localStorage.setItem("connected", true);
            localStorage.setItem("username", res.data.body.username);
            localStorage.setItem("role", res.data.body.user_type);
            // After a successful connection, redirect the user to the home page
            window.location.href = "./index.html";
        } else {
            document.querySelector("form#signin").reset();
            showMessage(res.data.message, "error");
        }
    })


}