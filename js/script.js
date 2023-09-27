$(document).ready(function () {
    var storedHeading = localStorage.getItem("Heading");
    if (storedHeading) {
        $("main").append(storedHeading);
    }

    $('.sendButton').attr('disabled',true);
    $('#message').keyup(function(){
        if($(this).val().length !=0)
            $('.sendButton').attr('disabled', false);            
        else
            $('.sendButton').attr('disabled',true);
    });

    $("#headingTextModel").click(function() {
        $(".formHeading")[0].reset()
    });

    $(".formHeading").on('submit', function (e) {
        e.preventDefault();
        var newHeading = $('input').val();
        $("main").append('<section><h1>' + newHeading + '</h1><div class="subheadings"></div></section>');
        updateHeadingsAndSubheadings();
        var selectValue = $('main').html();
        localStorage.setItem("Heading", selectValue);
        // e.target.reset();
    });

    $('.smtbtn').attr('disabled',true);
    $('#message1').keyup(function(){
        if($(this).val().length !=0)
            $('.smtbtn').attr('disabled', false);            
        else
            $('.smtbtn').attr('disabled',true);
    });
    
    $("#SubSeadingId").click(function() {
        $(".formSubHeading")[0].reset()
    });

    $(".formSubHeading").on('submit', function (e) {
        var selectedSubHeading = $('select option:selected', this).val();
        var subheadingText = $('input', this).val();
        $("section:nth-child(" + selectedSubHeading + ") div.subheadings").append('<div class="container"><h4>' + subheadingText + '</h4><form></form>');
        $('.formForm #sectionTagId option').remove();
        $('.formForm #sectionTagId').append("<option value='' selected disabled>Select Sub Heading</option>");
        $('section .container h4').each(function (index) {
            index = index + 1;
            $(this).text();
            var updatedValue = $('main').html();
            localStorage.setItem("Heading", updatedValue);
            e.preventDefault();
            // e.target.reset();
        });
    });

    $('section h1').each(function (index) {
        index = index + 1;
        var subHeadingOfHeading = $(this).text();
        $('.formSubHeading select').append("<option value=" + index + ">" + subHeadingOfHeading + "</option>");
        $('.formheading').append("<option value=" + index + ">" + subHeadingOfHeading + "</option>");
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
    });

    $('.sbmitBtn').attr('disabled',true);
    $('#label').keyup(function(){
        if($(this).val().length !=0)
            $('.sbmitBtn').attr('disabled', false);            
        else
            $('.sbmitBtn').attr('disabled',true);
    });

    $("#formModelId").click(function() {
        $(".formForm")[0].reset()
    });

    $(".formForm").on('submit', function(event){
        event.preventDefault();
        var selectedHeading = $('.formheading option:selected').val();
        var selectedSubHeading = $('.subheadingform option:selected').val();
        // $('.select-input').change(function () {
        //     var formChangValue = $(this).val();
        //     console.log("options :", formChangValue);
        // });
        
        var InputId = $('.id').val();
        var inputPlaceholder = $('.placeholders').val();
        var inputValue = $('.value').val();
        var inputName = $('.name').val();
        var controlType = $('#options').val();
        var inputLabel = $('.label').val();
        var inputClass = $('.classes').val();
        var element = '<label>' + inputLabel + '</label> <input type="' + controlType + '" label="' + inputLabel + '" class="' + inputClass + '" id="' + InputId + '" value="' + inputValue + '" name="' + inputName + '" placeholder="' + inputPlaceholder + '"  />';
        $('main section:nth-child(' + selectedHeading + ') div .container:nth-child(' + (selectedSubHeading - 1) + ') form').append('<div>' + element + '</div>');
    
        var selectValue = $('main').html();
        localStorage.setItem("Heading", selectValue);
    });

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
