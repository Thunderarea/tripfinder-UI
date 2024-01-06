import { showMessage } from "./message.js";

async function postRequest(endpoint, data) {
  let result = null;
  try {
    const response = await fetch(`http://localhost:8080/api/${endpoint}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    result = await response.json();
  } catch (error) {
    showMessage(error, "error");
    console.error("Error:", error);
  }
  return result;
}


async function getRequest(endpoint, params) {
  let result = null;
  try {
    const response = await fetch(`http://localhost:8080/api/${endpoint}?${new URLSearchParams(params).toString()}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    result = await response.json();
  } catch (error) {
    showMessage(error, "error");
    console.error("Error:", error);
  }
  return result;
}

export {
  postRequest,
  getRequest,
};