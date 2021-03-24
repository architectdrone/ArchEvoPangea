const serverAddress='http://localhost:8080/';

/**
 * Performs a GET request.
 * @param {string} endpoint The endpoint to hit.
 */
function get(endpoint) {
    return fetch(serverAddress+endpoint, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            },
    })
    .then((response) => response.json());
}

/**
 * Performs a POST request.
 * @param {string} endpoint The endpoint to hit.
 */
function post(endpoint) {
    return fetch(serverAddress+endpoint, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            },
    })
    .then((response) => response.json());
}

/**
 * Controls the server.
 * @param {string} command the command for the server.
 */
function control(command) {
    return post('control/'+command);
}

/**
 * Gets information from the server.
 */
function getInformation() {
    return get('information');
}

/**
 * Gets information from the server.
 */
function getState() {
    return get('state');
}

/**
 * Starts the server.
 */
function startServer() {
    return control('start');
}

/**
 * Stops the server.
 */
function stopServer() {
    return control('stop');
}

/**
 * Steps the server.
 */
function stepServer() {
    return control('step');
}
export {getInformation, getState, startServer, stopServer, stepServer};
