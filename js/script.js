$(document).ready(function () {
    $("#myForm").submit(function (event) {     // Event listener for the form submission
        let heading = $("#heading").val()
        // Retrieve any existing data from LocalStorage
        let existingData = JSON.parse(localStorage.getItem('formData')) || [];

        existingData.push({
            heading: heading
        })

        localStorage.setItem('formData', JSON.stringify(existingData));// Store the JSON string in LocalStorage
        displayFormData();
        event.preventDefault(); // Prevent the default form submission
    });

    function displayFormData() {
        // Retrieve the array of form data from LocalStorage
        // Parse the JSON string back into an array of objects
        let userData = JSON.parse(localStorage.getItem('formData')) || [];

        // Create HTML content to display the form data
        let finalData = '';
        userData.forEach(function (formData, index) {
            finalData += `
        <div class="row mt-4">
            <div class="heading mt-4">${formData.heading}</div>
        </div>
        `;
        });

        // Use jQuery to update the content of the specified div
        $('#main').html(finalData);
    }

    displayFormData();
});