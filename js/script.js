// Heading code :-

$(document).ready(function () {
    var heading = localStorage.getItem("Heading");
    if (heading) {
        $("main").append(heading);
    }

    $(".formHeading").submit(function (e) {
        var heading = $('input').val()
        $("main").append('<section><h1>' + heading + '</h1><div class="subHeadings"></div></section>')
        $('.subHeading select').append("<option value='' selected disabled>Please Select Heading</option>")
        $('.formForm #headings').append("<option value='' selected disabled> Please Select Heading</option>")
        var selectValue = $('main').html();
        localStorage.setItem("Heading", selectValue);
        e.preventDefault();
        e.target.reset();
    })
});

$("#headingTextModel").click(function () {
    $(':input[type="submit"]').prop('disabled', true);
    $('input[type="text"]').keyup(function () {
        if ($(this).val() != '') {
            $(':input[type="submit"]').prop('disabled', false);
        }
    });
})





 