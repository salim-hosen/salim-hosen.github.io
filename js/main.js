

$(document).ready(function(){
    let $list = $('.portfolio-tabs li');


    $list.click(function (e) {

        if(e.target.id === 'external'){
            window.open('https://sites.google.com/view/saalim', '_blank');
            return false;
        }

        $('.portfolio-tabs li').removeClass('active');
        e.target.classList.add('active');

        let selector = $(e.target).attr('data-filter');
        $('.portfolio-section .grid').isotope({
            filter: selector
        });

        return false;
    });


    $("#edu-tab").on("click", function(e){
        e.preventDefault();

        $('.qualification-tab a').removeClass('active');
        e.target.classList.add('active');

        $(".edu-timeline").css("display", "block");
        $(".work-timeline").css("display", "none");

    });

    $("#work-tab").on("click", function(e){
        e.preventDefault();

        $('.qualification-tab a').removeClass('active');
        e.target.classList.add('active');

        $(".edu-timeline").css("display", "none");
        $(".work-timeline").css("display", "block");

    });

});