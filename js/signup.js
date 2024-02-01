import { showMessage } from "./message.js";
import { postRequest } from "./api.js";

const customerRadio = document.getElementById('customer_radio');
const agencyRadio = document.getElementById('agency_radio');
const agencyFields = document.getElementById('agency_fields');
const customerFields = document.getElementById('customer_fields');
const signupForm = document.getElementById('signup');

let usernamePattern = /^[a-zA-Z0-9]+$/;
let passwordPattern = /^[a-zA-Z0-9!@#$%^&*()-_=+\[\]{}|;:'",.<>?/`~]+$/;
let taxCodePattern = /^[0-9]{9}$/;
let namePattern = /^[a-zA-Z]+$/;
let emailPattern = /^[a-zA-Z0-9_+&*-]+(?:\.[a-zA-Z0-9_+&*-]+)*@(?:[a-zA-Z0-9-]+\.)+[a-zA-Z]{2,7}$/;
let ownerPatten = /^[a-zA-Z\s'-]+$/;

let passwordInput = document.getElementById('password');
let usernameInput = document.getElementById('username');
let taxCodeInput = document.getElementById('tax_code');
let ownerInput = document.getElementById('owner');
let brandNameInput = document.getElementById('brand_name');
let nameInput = document.getElementById('name');
let surnameInput = document.getElementById('surname');
let emailInput = document.getElementById('email');

function handleUserTypeChange() {
    if (agencyRadio.checked) {
        // Hide customer fields, make them not required, and clear their values
        customerFields.style.display = 'none';
        clearFields(customerFields);
        setRequired(customerFields, false);

        // Show agency fields and make them required
        agencyFields.style.display = 'block';
        setRequired(agencyFields, true);
    } else {
        // Hide agency fields, make them not required, and clear their values
        agencyFields.style.display = 'none';
        clearFields(agencyFields);
        setRequired(agencyFields, false);

        // Show customer fields and make them required
        customerFields.style.display = 'block';
        setRequired(customerFields, true);
    }
}

function clearFields(container) {
    const fields = container.querySelectorAll('input');
    fields.forEach(field => {
        field.value = '';
    });
}

function setRequired(container, isRequired) {
    const fields = container.querySelectorAll('input');
    fields.forEach(field => {
        field.required = isRequired;
    });
}

function validateForm() {
    let result = true;

    if (!passwordPattern.test(passwordInput.value)) {
        showMessage('Invalid characters in the password. Cannot contain spaces.', "error");
        result = false;
    }

    if (!usernamePattern.test(usernameInput.value)) {
        showMessage('Username cannot contain characters', "error");
        result = false;
    }

    if (!taxCodePattern.test(taxCodeInput.value)) {
        showMessage('Tax code consists of 9 digits', "error");
        result = false;
    }

    if (agencyRadio.checked) {

        if (!ownerPatten.test(ownerInput.value)) {
            showMessage('Owner name cannot contain symbols or numbers', "error");
            result = false;
        }

    }

    if (customerRadio.checked) {
        if (!namePattern.test(nameInput.value)) {
            showMessage('Names can only contain letters', "error");
            result = false;
        }

        if (!namePattern.test(surnameInput.value)) {
            showMessage('Surnames can only contain letters', "error");
            result = false;
        }

        if (!emailPattern.test(emailInput.value)) {
            showMessage('invalid email format', "error");
            result = false;
        }



    }

    return result; // Allow form submission
}

async function signUp(e) {
    e.preventDefault()
    if (validateForm()) {

        if (agencyRadio.checked) {
            let request = {
                username: usernameInput.value,
                password: passwordInput.value,
                tax_code: taxCodeInput.value,
                brand_name: brandNameInput.value,
                owner: ownerInput.value,
                user_type: "agency"
            }

            await postRequest("auth/agency-registration", request).then((res) => {
                if (res.ok) {
                    successfulSignup(res.data.body.username, res.data.body.user_type, res.data.id);
                } else {
                    document.querySelector("form#signup").reset();
                }
            })
        }
        else {
            let request = {
                username: usernameInput.value,
                password: passwordInput.value,
                tax_code: taxCodeInput.value,
                name: nameInput.value,
                surname: surnameInput.value,
                email: emailInput.value,
                user_type: "customer"
            }

            await postRequest("auth/customer-registration", request).then((res) => {
                if (res.data.status === "SUCCESS") {
                    successfulSignup(res.data.body.username, res.data.body.user_type, res.data.id);
                } else {
                    document.querySelector("form#signup").reset();
                }
            })
        }
    }
}

function successfulSignup(username, role, id) {
    localStorage.setItem("connected", true);
    localStorage.setItem("username", username);
    localStorage.setItem("role", role);
    localStorage.setItem("id", id);
    // After a successful connection, redirect the user to the home page
    if (role === "agency") {
        window.location.href = "./dashboard.html";
    } else window.location.href = "./index.html";
}

// Initial setup
handleUserTypeChange();

// Event listeners for radio button change
customerRadio.addEventListener('change', handleUserTypeChange);
agencyRadio.addEventListener('change', handleUserTypeChange);

// Event listener for form submission
signupForm.addEventListener('submit', signUp);