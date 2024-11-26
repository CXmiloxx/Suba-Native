import {API_URL} from '@env'
async function handleResponse(response) {
    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Error en la petición HTTP');
    }
    return response.json();
}

export async function get(endpoint) {
    const response = await fetch(`${API_URL}/${endpoint}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
        },
    });
    return handleResponse(response);
}

export async function post(endpoint, data) {
    const response = await fetch(`${API_URL}/${endpoint}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
        },
        body: JSON.stringify(data),
    });
    return handleResponse(response);
}

export async function put(endpoint, data) {
    const response = await fetch(`${API_URL}/${endpoint}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
        },
        body: JSON.stringify(data),
    });
    return handleResponse(response);
}

export async function remove(endpoint) {
    const response = await fetch(`${API_URL}/${endpoint}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
        },
    });
    return handleResponse(response);
}
