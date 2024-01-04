if (localStorage.getItem("connected") === "true") window.location.href = "./index.html";

document.querySelector("input[type='submit']").addEventListener("click", (e) => {
    e.preventDefault();
    let username = document.querySelector('input[name="username"]').value;
    let password = document.querySelector('input[name="password"]').value;
    if (username === "test" && password === "test") {
        localStorage.setItem("connected", true);
        localStorage.setItem("username", username);
        localStorage.setItem("role", "customer");
        window.location.href = "./index.html";
    }
});