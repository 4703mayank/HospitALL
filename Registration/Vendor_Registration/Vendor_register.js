document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("vendor-form");

    form.addEventListener("submit", async (event) => {
        event.preventDefault();

        // Gather form data
        const formData = new FormData(form);
        const companyName = formData.get("company_name");
        const licenseNumber = formData.get("license_number");

        // Generate password: first word of company name + "@" + license number
        const companyFirstWord = companyName.split(" ")[0].toLowerCase();
        const password = `${companyFirstWord}@${licenseNumber}`;

        // Add password to the form data
        formData.append("password", password);

        // Convert form data to a JSON object
        const data = Object.fromEntries(formData.entries());

        try {
            const response = await fetch("http://localhost:3000/register-vendor", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data),
            });

            if (response.ok) {
                const result = await response.json();
                alert(result.message);
                form.reset();
            } else {
                const error = await response.json();
                alert(`Error: ${error.message}`);
            }
        } catch (error) {
            console.error("Error:", error);
            alert("Failed to connect to the server.");
        }
    });
});
