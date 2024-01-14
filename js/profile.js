if (localStorage.getItem("connected") !== "true") {
    window.location.href = "./profile.html";
}

(async function showAll() {
    try {
        const response = await fetch("http://localhost:8080/api/agencies/${user_id}");
        const result = await response.json();
        updateProfile(result);
    } catch (error) {
        console.error('Error fetching agency details:', error);
    }
})();

function updateProfile(result) {
    let username = localStorage.getItem("username");
    let userType = localStorage.getItem("user_type");
    let brandName = localStorage.getItem("brand_name");
    let owner = localStorage.getItem("owner");
    let taxCode = localStorage.getItem("tax_code");

    //if (result.usertype == 'agency'){
    username = result.username;
    usertype = result.userType;
    brand_name = result.brandName;
    owner = result.owner;
    taxcode = result.taxCode;

    //}
    //else{

    //}

    $("#username").text(username);
    $("#usertype").text(usertype);
    $("#brand_name").text(brand_name);
    $("#owner").text(owner);
    $("#taxcode").text(taxcode);

}

