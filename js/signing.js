if (localStorage.getItem("connected") === "true") window.location.href = "./index.html";

document.querySelector("input[type='submit']").addEventListener("click", (e) => {
    e.preventDefault();
    let username = document.querySelector('input[name="username"]').value;
    let password = document.querySelector('input[name="password"]').value;
    let success = false;
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
        window.location.href = "./index.html";
    }
});