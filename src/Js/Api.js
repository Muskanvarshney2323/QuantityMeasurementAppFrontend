import { getUsers, saveUsers, getCurrentUser } from "./Storage.js";

const API_BASE_URL = "http://localhost:5020/api";

const ENDPOINTS = {
    register: `${API_BASE_URL}/Auth/register`,
    login: `${API_BASE_URL}/Auth/login`,

    convert: `${API_BASE_URL}/Quantity/convert`,
    compare: `${API_BASE_URL}/Quantity/compare`,
    add: `${API_BASE_URL}/Quantity/add`,
    subtract: `${API_BASE_URL}/Quantity/subtract`,
    history: `${API_BASE_URL}/Quantity/history`
};

function getHeaders() {
    const currentUser = getCurrentUser();

    const headers = {
        "Content-Type": "application/json"
    };

    if (currentUser?.token) {
        headers.Authorization = `Bearer ${currentUser.token}`;
    }

    return headers;
}

async function parseResponse(response) {
    const data = await response.json().catch(() => null);

    if (!response.ok) {
        return {
            success: false,
            message: data?.message || data?.Message || "Request failed",
            data
        };
    }

    return {
        success: true,
        message: data?.message || data?.Message || "Request successful",
        data
    };
}

export async function signupUser(userData) {
    try {
        const response = await fetch(ENDPOINTS.register, {
            method: "POST",
            headers: getHeaders(),
            body: JSON.stringify({
                fullName: userData.name,
                email: userData.email,
                password: userData.password
            })
        });

        return await parseResponse(response);
    } catch (error) {
        const users = getUsers();
        const existingUser = users.find((user) => user.email === userData.email);

        if (existingUser) {
            return {
                success: false,
                message: "User already exists"
            };
        }

        const newUser = {
            name: userData.name,
            email: userData.email,
            password: userData.password
        };

        users.push(newUser);
        saveUsers(users);

        return {
            success: true,
            message: "Signup successful (local fallback)",
            data: newUser
        };
    }
}

export async function loginUser(loginData) {
    try {
        const response = await fetch(ENDPOINTS.login, {
            method: "POST",
            headers: getHeaders(),
            body: JSON.stringify({
                email: loginData.email,
                password: loginData.password
            })
        });

        const result = await parseResponse(response);

        if (!result.success) {
            return result;
        }

        const apiData = result.data || {};

        return {
            success: true,
            message: result.message || "Login successful",
            data: {
                name: apiData.fullName || apiData.name || "User",
                email: apiData.email || loginData.email,
                token: apiData.token || ""
            }
        };
    } catch (error) {
        const users = getUsers();
        const matchedUser = users.find(
            (user) =>
                user.email === loginData.email &&
                user.password === loginData.password
        );

        if (!matchedUser) {
            return {
                success: false,
                message: "Invalid email or password"
            };
        }

        return {
            success: true,
            message: "Login successful (local fallback)",
            data: {
                name: matchedUser.name,
                email: matchedUser.email,
                token: ""
            }
        };
    }
}

export async function convertMeasurement(payload) {
    const response = await fetch(ENDPOINTS.convert, {
        method: "POST",
        headers: getHeaders(),
        body: JSON.stringify(payload)
    });

    return await parseResponse(response);
}

export async function compareMeasurement(payload) {
    const response = await fetch(ENDPOINTS.compare, {
        method: "POST",
        headers: getHeaders(),
        body: JSON.stringify(payload)
    });

    return await parseResponse(response);
}

export async function addMeasurement(payload) {
    const response = await fetch(ENDPOINTS.add, {
        method: "POST",
        headers: getHeaders(),
        body: JSON.stringify(payload)
    });

    return await parseResponse(response);
}

export async function subtractMeasurement(payload) {
    const response = await fetch(ENDPOINTS.subtract, {
        method: "POST",
        headers: getHeaders(),
        body: JSON.stringify(payload)
    });

    return await parseResponse(response);
}

export async function fetchMeasurementHistory() {
    const response = await fetch(ENDPOINTS.history, {
        method: "GET",
        headers: getHeaders()
    });

    return await parseResponse(response);
}