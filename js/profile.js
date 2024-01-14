import { getRequest } from "./api.js"

if (localStorage.getItem("connected") !== "true") {
    window.location.href = "./index.html";
}

let id = localStorage.getItem('id');
let role = localStorage.getItem('role');
let bodycontainer = document.getElementById("body_container");

async function getProfile() {
    try {
        console.log("geia");
        let response;
        if (role === "agency") {
            response = await getRequest(`agencies/${id}`, {});

        }
        else {
            response = await getRequest(`customers/${id}`, {});
        }
        if (response.ok) {
            bodycontainer.innerHTML =
                `<div id="profile" class="box">
                    <table>
                        <tr>
                            <td class="titles"> Username: </td>
                            <td> <div id="username" class="details">${response.data.username}</div>
                        </tr>
                        <tr>
                            <td class="titles"> Usertype: </td>
                            <td> <div id="usertype" class="details">${response.data.user_type}</div>
                        </tr>
                        <tr>
                            <td class="titles"> ${role === 'agency' ? "Brand name: " : "Name: "}</td>
                            <td> <div id=${role === 'agency' ? "brand_name" : "name"} class="details">${role === 'agency' ? response.data.brand_name : response.data.name}</div>
                        </tr>
                        <tr>
                            <td class="titles"> ${role === 'agency' ? "Owner: " : "Surname: "}</td>
                            <td> <div id=${role === 'agency' ? "owner" : "surname"} class="details">${role === 'agency' ? response.data.owner : response.data.surname}</div>
                        </tr>
                        <tr>
                            <td class="titles"> Tax code: </td>
                            <td> <div id="taxcode" class="details">${response.data.tax_code}</div>
                        </tr>
                    </table>
                </div>`
        }
    } catch (error) {
        console.error('Error fetching agency details:', error);
    }
}

getProfile();

