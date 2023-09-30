//Heading
$(document).ready(function () {    
    var storedHeading = localStorage.getItem("Heading");
    if (storedHeading) {
        $("main").append(storedHeading);
    }

    $("#headingTextModel").click(function() {
        $(".formHeading")[0].reset();

        $('.sendButton').attr('disabled',true);
        $('#message').keyup(function(){
            if($(this).val().length !=0)
                $('.sendButton').attr('disabled', false);            
            else
                $('.sendButton').attr('disabled',true);
        });
    });

    $(".formHeading").on('submit', function (e) {
        e.preventDefault();
        var newHeading = $('input').val();
        $("main").append('<section><h1>' + newHeading + '<button class="remove btn btn-danger" onclick="removed(this)"><img src="../jquery/js/remove.png" alt="Delete" height="20px"></button></h1><div class="subheadings"></div></section>');
        updateHeadingsAndSubheadings();
        localStorageData();
        sorting();
        e.target.reset();
    });
    sorting();
});

//Subheading
$(document).ready(function () {
    $("#SubSeadingId").click(function() {
        $(".formSubHeading")[0].reset();
        checkAndToggleSubmitHeading();
        updateHeadingsAndSubheadings();
        localStorageData();
    });

    localStorage.getItem("sub heading Heading")
    $(".formSubHeading").on('submit', function (e) {
        e.preventDefault();

        var selectedSubHeading = $('select option:selected', this).val();
        var subheadingText = $('input', this).val();
        $("section:nth-child(" + selectedSubHeading + ") div.subheadings").append('<div class="container"><h4>' + subheadingText + '<button class="btn btn-danger" onclick="removeChild11(this)"><img src="../jquery/js/remove.png" alt="Delete" height="20px"></button></h4><form ></div>');
        $('.formForm #sectionTagId option').remove();
        $('.formForm #sectionTagId').append("<option value='' selected disabled>Select Sub Heading</option>");
        $('section .container h4').each(function (index) {
            index = index + 1;
            $(this).text();
            localStorageData();
            sorting();
            e.target.reset();
        });  
    });

    // Event handler for the "Select Heading" dropdown change
    $('select.form-select').on('change', function () {
        checkAndToggleSubmitHeading();
    });

    // Initial check and toggle when the page loads
    checkAndToggleSubmitHeading();
    sorting();
});  

//Form
$(document).ready(function () {   
    $("#formModelId").click(function() {
        $(".formForm")[0].reset()
        checkAndToggleSubmitFormOption();
        updateHeadingsAndSubheadings();
        localStorageData();
    });
    
    $('.formheading').on("change", function () {
        var selectedSubHeadingOfHeading = $('.formheading option:selected').val();
        $('.formForm #sectionTagId option').remove();
        $('.formForm #sectionTagId').append("<option value='' selected disabled>Select Sub Heading</option>");
        var subheadingArray = [];
        $("section:nth-child(" + selectedSubHeadingOfHeading + ") div h4").each(function (index) {
            subheadingArray.push($(this).text());
        });

        $.each(subheadingArray, function (index, itemData) {
            $('#sectionTagId').append($("<option></option>")
                .attr("value", index + 2)
                .text(itemData));
        });
        sorting();
        localStorageData();
    });

    $(".formForm").on('submit', function(event){
        event.preventDefault();

        var selectedHeading = $('.formheading option:selected').val();
        var selectedSubHeading = $('.subheadingform option:selected').val();
        
        var InputId = $('.id').val();
        var inputPlaceholder = $('.placeholders').val();
        var inputValue = $('.value').val();
        var inputName = $('.name').val();
        var controlType = $('#options').val();
        var inputLabel = $('.label').val();
        var inputClass = $('.classes').val();
        if (controlType === 'new_option_group'){
            var nestedOptions = ["one","two","three"];

            var nestedSelect = $('<select class="select-input mt-3">');
            for (var i = 0; i < nestedOptions.length; i++) {
                nestedSelect.append('<option>' + nestedOptions[i] + '</option>');
            }
            htmValue = nestedSelect.html()
            var element = '<label>' + inputLabel + '</label>' + '<select>' + htmValue;
            $('main section:nth-child(' + selectedHeading + ') div .container:nth-child(' + (selectedSubHeading - 1) + ') form').append('<div class="formInputs">' + element + '<button class="btn btn-danger" onclick="removeFormInputs(this)"><img src="../jquery/js/remove.png" alt="Delete" height="20px"></button></div>');     
            localStorageData();
            sorting();
        } else {
            var element = '<label>' + inputLabel + '</label> <input type="' + controlType + '" label="' + inputLabel + '" class="' + inputClass + '" id="' + InputId + '" value="' + inputValue + '" name="' + inputName + '" placeholder="' + inputPlaceholder + '"  />';
            $('main section:nth-child(' + selectedHeading + ') div .container:nth-child(' + (selectedSubHeading - 1) + ') form').append('<div class="formInputs">' + element + '<button class="btn btn-danger" onclick="removeFormInputs(this)"><img src="../jquery/js/remove.png" alt="Delete" height="20px"></button></div>');           
            localStorageData();
            sorting();
        }
    });

    // Event handler for the "Form Heading" dropdown change
    $('.formheading').on('change', function () {
        checkAndToggleSubmitFormOption();
    });

    // Event handler for the "Select Input Type" dropdown change
    $('#options').on('change', function () {
        checkAndToggleSubmitFormOption();
    });

    // Initial check and toggle when the page loads
    checkAndToggleSubmitFormOption();
});

// Function to update the headings and subheadings
function updateHeadingsAndSubheadings() {
    $('.formSubHeading option').remove();
    $('.formSubHeading select').append("<option value='' selected disabled>Please Select Heading</option>");
    $('.formForm #headings option').remove();
    $('.formForm #headings').append("<option value='' selected disabled> Please Select Heading</option>");

    $('section h1').each(function (index) {
        index = index + 1;
        var subHeadingOfHeading = $(this).text();
        $('.formForm #headings').append("<option value=" + index + ">" + subHeadingOfHeading + "</option>");
        $('.formSubHeading select').append("<option value=" + index + ">" + subHeadingOfHeading + "</option>");
    });
}


//Drag-drop
function sorting() {    
    // Make headings sortable
    $("main").sortable({
        change: function (event, ui) { localStorageData() },
        update: function (event, ui) { localStorageData() },
        items: "section",
        axis: 'y'
    });

    // Make subheadings sortable within and between headings
    $("section .subheadings").sortable({
        change: function (event, ui) { localStorageData() },
        update: function (event, ui) { localStorageData() },
        items: ".container",
        revert: true,
        connectWith: "section .subheadings",
        axis: 'y'
    }).disableSelection();
   
    // Make form sortable within and between sub-headings
    $(".container form").sortable({
        change: function (event, ui) { localStorageData() },
        update: function (event, ui) { localStorageData() },
        items: ".formInputs",
        connectWith: ".container form",
        axis: 'y'
    })
    localStorageData();
}

//fuction to set data in local storage
function localStorageData() {
    var selectValue = $('main').html();
    localStorage.setItem("Heading", selectValue);
}

// Function to check and toggle the submit button
function checkAndToggleSubmitHeading() {
    var selectedSubHeadingOption = $('select.form-select', '.formSubHeading').val();
    // Disable or enable the submit button based on the conditions
    if ((selectedSubHeadingOption === null)) {
        $('.smtbtn').prop('disabled', true);
    } else {
        $('.smtbtn').prop('disabled', false);
    }
}

// Function to check and toggle the submit button
function checkAndToggleSubmitFormOption() {
    var formHeadingSelected = $('.formheading').val();
    var inputTypeSelected = $('#options').val();
    

    // Check if all three dropdowns have values selected
    if (formHeadingSelected && inputTypeSelected) {
        $('.sbmitBtn').prop('disabled', false);
    } else {
        $('.sbmitBtn').prop('disabled', true);
    }
}


    // // Handle click events on delete icons
    // $(".delete-icon").on("click", function () {
    //     var type = $(this).data("type");

    //     if (type == "heading") {
    //         // Handle delete action for headings
    //         $(this).closest("section").remove();
    //     }
    //     // } else if (type === "subheading") {
    //     //     // Handle delete action for subheadings
    //     //     $(this).closest(".container").remove();
    //     // } else if (type === "input") {
    //     //     // Handle delete action for form inputs
    //     //     $(this).closest(".formInputs").remove();
    //     // }
    // });

function removed(rm) {
    $(rm).parent().parent().remove();
    // $(rm).siblings().remove();
    localStorageData();
}

function removeChild11(rm) {
    $(rm).parent().parent().remove();
    localStorageData();
}

function removeFormInputs(rm) {
    $(rm).parent().parent().remove();
    localStorageData();
}
