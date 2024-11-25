document.addEventListener("DOMContentLoaded", () => {
    const form = document.querySelector("form");

    // Ensure form is selected correctly
    if (!form) {
        console.error("Form element not found. Please check the form selector.");
        return;
    }

    form.addEventListener("submit", async (event) => {
        event.preventDefault();

        // Collect form data
        const formData = {
            fullName: document.getElementById("fullName")?.value || "",
            dob: document.getElementById("dob")?.value || "",
            gender: document.getElementById("gender")?.value || "",
            phone: document.getElementById("phone")?.value || "",
            email: document.getElementById("email")?.value || "",
            address: document.getElementById("address")?.value || "",
            specialization: document.getElementById("specialization")?.value || "",
            license: document.getElementById("license")?.value || "",
            experience: document.getElementById("experience")?.value || "",
            qualifications: document.getElementById("qualifications")?.value || "",
            employmentStatus: document.getElementById("employmentStatus")?.value || "",
            previousEmployment: document.getElementById("previousEmployment")?.value || "",
            medicalCouncil: document.getElementById("medicalCouncil")?.value || "",
            boardCertifications: document.getElementById("boardCertifications")?.value || ""
        };

        // Validate required fields
        if (!formData.fullName || !formData.dob || !formData.gender || !formData.phone || !formData.email) {
            alert("Please fill in all required fields!");
            return;
        }

        try {
            // Send data to the backend
            const response = await fetch('http://localhost:3000/registerDoctor', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });
        
            // Check if the response is OK (status code 200-299)
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || "Failed to register doctor.");
            }
        
            const data = await response.json();
            alert(data.message || "Registration successful!");  // Show success message
            form.reset();  // Reset the form after successful submission
        
        } catch (error) {
            console.error("Error submitting form:", error);
            alert(`Error registering doctor: ${error.message}`); // Display specific error message
        }

    });
});
