document.addEventListener("DOMContentLoaded", () => {
    const usernameField = document.getElementById("username");
    const passwordField = document.getElementById("password");

    if (!usernameField || !passwordField) {
        console.error("Username or password field not found!");
        return; // Exit if the elements are not found
    }

    const loginForm = document.getElementById("login-form");
    const messageDiv = document.getElementById("message");

    loginForm.addEventListener("submit", (event) => {
        event.preventDefault();

        const loginData = {
            username: usernameField.value, // mobile number
            password: passwordField.value, // password
        };

        // Check if both fields are filled
        if (!loginData.username || !loginData.password) {
            messageDiv.innerHTML = "Please fill in both fields!";
            messageDiv.className = "error";  // Add error class
            messageDiv.style.display = "block";  // Show the message
            return;
        }

        // Send login data to the server for validation
        fetch('http://localhost:3000/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ 
                username: loginData.username, 
                password: loginData.password 
            })
        })
        .then(response => response.json())
        .then(data => {
            console.log('Response from server:', data);  // Debugging response
            if (data.message === "Login successful") {
                messageDiv.innerHTML = "Login successful!!";
                messageDiv.className = "success";
                messageDiv.style.display = "block";
                setTimeout(() => {
                    window.location.href = "";  // Adjust to your desired redirection path
                }, 2000);
            } else {
                messageDiv.innerHTML = data.message;
                messageDiv.className = "error";
                messageDiv.style.display = "block";
            }
        })
        .catch(error => {
            console.error('Error:', error);
            messageDiv.innerHTML = "An error occurred. Please try again.";
            messageDiv.className = "error";
            messageDiv.style.display = "block";
        });
    });
});
