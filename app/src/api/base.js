import token from "../token/storage";

const auth = () => {
    const value = token.get();
    if (value) {
        return { Authorization: "Bearer " + value };
    } else {
        return {};
    }
}

const handleResponse = response => {
    if (!response.ok) {
        return response.text()
            .then(text => text ? JSON.parse(text) : { message: text })
            .then(body => Promise.reject({ status: response.status, body }));
    } else if (response.status === 204) {
        return {};
    } else {
        return response.text().then(text => text ? JSON.parse(text) : {});
    }
};

export const get = (url, headers) => fetch(url, { credentials: "include", headers: { ...headers, ...auth() }})
    .then(handleResponse);

export const post = (url, body, headers = { "Content-Type": "application/json" }) => fetch(url, {
    credentials: "include",
    method: "POST",
    headers: { ...headers, ...auth() },
    body: body ? (typeof body === "string" ? body : JSON.stringify(body)) : ""
}).then(handleResponse);

export const put = (url, body, headers = { "Content-Type": "application/json" }) => fetch(url, {
    credentials: "include",
    method: "PUT",
    headers: { ...headers, ...auth() },
    body: JSON.stringify(body)
}).then(handleResponse);

export const del = (url, headers) => fetch(url, { credentials: "include", method: "DELETE", headers: { ...headers, ...auth() } })
    .then(handleResponse);