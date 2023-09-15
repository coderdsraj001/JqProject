$(document).ready(function () {
    $("#myForm").submit(function (event) {     // Event listener for the form submission
        event.preventDefault(); // Prevent the default form submission

        let heading = $("#heading1").val()
        let existingData = JSON.parse(localStorage.getItem('formData')) || [];

        existingData.push({
            heading: heading,
        });

        localStorage.setItem('formData', JSON.stringify(existingData));// Store the JSON string in LocalStorage
        displayFormData();
        $('#exampleModal').modal('hide');
        $("#heading1").val(''); // Reset the input field value
    });

    function displayFormData() {
        let userData = JSON.parse(localStorage.getItem('formData')) || [];
        let finalData = '';
        let finalData1 = '';

        userData.forEach(function (formData, index) {
            finalData += `
        <div class="row mt-4">
            <div class="heading mt-4">${formData.heading}</div>
        </div>
        `;

        finalData1 += `
        <select class="custom-select mb-2" id="convoy_list">
            ${ (index == 0) ? `<option selected>Select Heading</option><option >${formData.heading}</option>` :`<option >${formData.heading}</option>`}
        </select>
        `;
        });

        $('#main').html(finalData);
        $('#convoy_list').html(finalData1);
    }

    displayFormData();
});