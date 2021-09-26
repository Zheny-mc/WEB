let viewport = $("#viewport").width();
let slider = $("div.slider");
let viewSliders = $(".viewSlide");
let viewSlide = 0;

viewSliders[viewSlide].style.backgroundColor = "green";

$(".next").click(function() {
    viewSliders[viewSlide].style.backgroundColor = "red";
    if (viewSlide < 4) {
        viewSlide++;
    } else {
        viewSlide = 0;
    }
    viewSliders[viewSlide].style.backgroundColor = "green";
    slider.animate({ 'left': -viewSlide * viewport + "px" }, { 'duration': 500 })
});

$(".prev").click(function() {
    viewSliders[viewSlide].style.backgroundColor = "red";
    if (viewSlide > 0) {
        viewSlide--;
    } else {
        viewSlide = 4;
    }
    viewSliders[viewSlide].style.backgroundColor = "green";
    slider.animate({ 'left': -viewSlide * viewport + "px" }, { 'duration': 500 })
});