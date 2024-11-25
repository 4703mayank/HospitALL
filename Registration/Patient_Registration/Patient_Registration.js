document.addEventListener("DOMContentLoaded", () => {
    const registrationForm = document.getElementById("registrationForm");
    const messageDiv = document.getElementById("message");

    registrationForm.addEventListener("submit", (event) => {
        event.preventDefault();

        const formData = {
            first_name: document.getElementById("first-name").value,
            middle_name: document.getElementById("middle-name").value,
            last_name: document.getElementById("last-name").value,
            father_name: document.getElementById("fathers-name").value,
            mother_name: document.getElementById("mothers-name").value,
            email: document.getElementById("email").value,
            phone: document.getElementById("phone").value,
            aadhar: document.getElementById("Aadhar").value,
            dob: document.getElementById("dob").value,
            age: document.getElementById("age").value,
            gender: document.getElementById("gender").value,
            address: document.getElementById("address").value
        };

        // Check for all required fields
        if (!formData.first_name || !formData.last_name || !formData.email || !formData.phone || !formData.aadhar || !formData.dob || !formData.age || !formData.gender || !formData.address) {
            messageDiv.innerHTML = "Please fill in all required fields!";
            messageDiv.style.color = "red";
            return;
        }

        // Send data to the backend
        fetch('http://localhost:3000/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to register');
            }
            return response.json();
        })
        .then(data => {
            messageDiv.innerHTML = data.message || "User registered successfully with auto-generated password!";
            messageDiv.style.color = "green";
        })
        .catch(error => {
            messageDiv.innerHTML = "There was an error. Please try again later.";
            messageDiv.style.color = "red";
        });
    });
});
