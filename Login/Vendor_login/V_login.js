document.addEventListener("DOMContentLoaded", () => {
    const form = document.querySelector("#login-form");

    form.addEventListener("submit", async (event) => {
        event.preventDefault(); // Prevent the default form submission

        // Gather form data
        const formData = new FormData(form);
        const data = {
            username: formData.get("username"), // License number
            password: formData.get("password"),
        };

        try {
            // Send data to the server for login
            const response = await fetch("http://localhost:3000/vendor-login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            });

            const responseData = await response.json();

            if (response.ok) {
                alert("Login successful!");
                window.open('http://localhost/Home_Page/Home_Page.html', '_self');

                // Redirect to a dashboard or another page after successful login
                
            } else {
                alert(responseData.message); // Show error message from the server
            }
        } catch (error) {
            console.error("Error:", error);
            alert("Error connecting to the server.");
        }
    });
});
