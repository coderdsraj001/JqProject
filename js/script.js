// Heading code :-

$(document).ready(function () {
    var heading = localStorage.getItem("Heading");
    if (heading) {
        $("main").append(heading);
    }

    $(".formHeading").on("submit",function (e) {
        var heading = $('input').val()
        $("main").append('<section><h1>' + heading + '</h1><div class="subHeadings"></div></section>')
        $('.formSubHeading select').append("<option value='' selected disabled>Please Select Heading</option>")
        $('section h1').each(function (index) {
            index = index + 1
            var subHeading_of_heading = $(this).text()
            $('.subHeading select').append("<option value=" + index + ">" + subHeading_of_heading + "</option>")
        })

        var selectValue = $('main').html();
        localStorage.setItem("Heading", selectValue);
        e.preventDefault();
        e.target.reset();
    })
});


// sub-heading code :- 
$("#SubHeadingId").click(function () {
    $('.formSubHeading option').remove()
    $('.formSubHeading select').append("<option value='' selected disabled>Please Select Heading</option>")
    $('section h1').each(function (index) {
        index = index + 1
        var subHeading_of_heading = $(this).text()
        $('.formSubHeading select').append("<option value=" + index + ">" + subHeading_of_heading + "</option>")
    })
    var selectValue = $('main').html();
    localStorage.setItem("Heading", selectValue);
});

$(document).ready(function () {
    $(".formSubHeading").on('submit', function (e) {
        var subHeading_of_heading = $('select option:selected', this).val()
        var sub_heading = $('input', this).val()
        $("section:nth-child(" + subHeading_of_heading + ") div.subHeadings").append('<div><h4 class="subheadingtxt">' + sub_heading + '</h4></div>')
        $('section h4').each(function(index) {
            index = index + 1
            $(this).text()
            var selectValue = $('main').html();
            localStorage.setItem("Heading", selectValue);
            e.preventDefault();
            e.target.reset();
        })
    })
});




 