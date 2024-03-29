import { showMessage } from "./message.js";

async function postRequest(endpoint, data) {
  return await request(endpoint, data, "POST");
}

async function getRequest(endpoint, params) {
  return await request(endpoint, params, "GET");
}

async function deleteRequest(endpoint, params) {
  return await request(endpoint, params, "DELETE");
}

async function request(endpoint, params, method) {
  let result = null;
  try {
    let url = `http://localhost:8080/api/${endpoint}`;
    let requestOptions = {
      method: method,
      headers: {
        "Content-Type": "application/json",
      },
    };
    if (Object.keys(params).length !== 0 && method !== "POST") {
      url = url + `?${new URLSearchParams(params).toString()}`;
    } else if (method === "POST") {
      requestOptions.body = JSON.stringify(params);
    }

    const response = await fetch(url, requestOptions);

    if (method !== "DELETE") result = await response.json();
    else result = null;
    
    if (!response.ok) {
      if (result && "message" in result) showMessage(result.message, "error");
      else showMessage("Something went wrong", "error");
    } 

    return {
      ok: response.ok,
      data: result
    };
  } catch (error) {
    console.error("Error:", error);
  }
  return result;
}

export {
  postRequest,
  getRequest,
  deleteRequest,
};