// onScroll
$(window).on("scroll", function(){
    var scrollTop = $(window).scrollTop();
    if(scrollTop > 50){
    $('#main-nav').addClass('fixed-top');
    }
    else{
        $('#main-nav').removeClass('fixed-top');

    }
})

// Accordion toggle icon
$('.card-header').click(function () {
    $(this).toggleClass('active');
});

// Initialize popover
$('[data-toggle="popover"]').popover();

// Make popover dismissable
$('.popover-dismiss').popover({
    trigger: 'focus'
  });

window.setInterval(function(){
    $(function() {
        $(".custom-popover").toggleClass("custom-popover-active");
  });
}, 30000);