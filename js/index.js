(function adjustUI() {
  let html = "";
  let connected = localStorage.getItem("connected") === "true";
  // Display different buttons in the header if the user is connected or not 
  if (connected) {
    let username = localStorage.getItem("username");
    let role = localStorage.getItem("role");
    // Adjust the user's dropdown mennu based on the role
    html = `
    <div id="user_button" class="dropdown">
        <button id="user" class="dropbtn">
            ${username} <iconify-icon icon="material-symbols-light:account-circle"></iconify-icon>
        </button>
        <div class="dropdown-content">
          <button class="link_button"><a href="index.html" class="no_link">Home</a></button>
            ${
              role === "customer"
                ? '<button class="link_button"><a href="reservations.html" class="no_link">Reservations</a></button>'
                : role === "agency"
                ? '<button class="link_button"><a href="dashboard.html" class="no_link">Dashboard</a></button>'
                : ""
            }
            <button class="link_button"><a href="profile.html" class="no_link">Profile</a></button>
            <button id="logout"><a href="#" class="no_link">Logout</a></button>
        </div>
    </div>
    `;
  } else {
    html = `
    <div id="authenticate_buttons">
      <button class="box link_button"><a href="signin.html" class="no_link">Sign in</a></button>
      <button class="box link_button"><a href="signup.html" class="no_link">Sign up</a></button>
    </div>
    `;
  }
  let el = new DOMParser().parseFromString(html, "text/html").body.firstElementChild;
  document.querySelector("header").appendChild(el);

  if (connected) {
    // Event listener for the logout button
    document.querySelector("#logout").addEventListener("click", () => {
      // Actions during logout
      localStorage.removeItem("connected");
      localStorage.removeItem("role");
      localStorage.removeItem("username");
      localStorage.removeItem("id");
      window.location.reload();
    });
  }
})();

