// api.js

// Simulating an asynchronous login function
export async function login(username, password) {
    // You can replace this with actual login logic, such as making an API call to authenticate the user
    return new Promise((resolve, reject) => {
        // Simulating a delay to mimic an asynchronous operation
        setTimeout(() => {
            if (username === 'juanito' && password === '123') {
                // Resolve with some user data if login is successful
                resolve({ username: 'juanito', role: 'patient' });
            } else {
                // Reject with an error message if login fails
                reject(new Error('Invalid username or password'));
            }
        }, 1000); // Simulated delay of 1 second
    });
}
