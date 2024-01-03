(function adjustUI() {
  let html = "";
  let connected = localStorage.getItem("connected") === "true";
  document.body.dataset.connected = connected;
  if (connected) {
    let username = "username";
    let role = localStorage.getItem("role");
    document.body.dataset.role = role;
    html = `
    <div id="user_button" class="dropdown">
        <button id="user" class="dropbtn">
            ${username} <iconify-icon icon="material-symbols-light:account-circle"></iconify-icon>
        </button>
        <div class="dropdown-content">
            ${
              role === "customer"
                ? '<button class="role1"><a href="reservations.html" class="no_link">Reservations</a></button>'
                : role === "agency"
                ? '<button><a href="dashboard.html" class="no_link">Dashboard</a></button>'
                : ""
            }
            <button><a href="profile.html" class="no_link">Profile</a></button>
            <button id="logout"><a href="#" class="no_link">Logout</a></button>
        </div>
    </div>
    `;
  } else {
    html = `
    <div id="authenticate_buttons">
      <button class="box"><a href="signin.html" class="no_link">Sign in</a></button>
      <button class="box"><a href="signup.html" class="no_link">Sign up</a></button>
    </div>
    `;
  }
  let el = new DOMParser().parseFromString(html, "text/html").body
    .firstElementChild;
  document.querySelector("header").appendChild(el);

  if (connected) {
    document.querySelector("#logout").addEventListener("click", () => {
      localStorage.removeItem("connected");
      localStorage.removeItem("role");
      localStorage.removeItem("username");
      window.location.reload();
    });
  }
})();
