window.addEventListener('load',()=>{
    let slides = document.querySelectorAll(".carrousel");
    // console.log(slides);
    // for (let img of slides){
    //     img.style.display = "none"};
    let prev = document.getElementById("prev");
    let next = document.getElementById("next");


    var slideIndex = 0;
    carousel();

    function carousel() {
    var i;
    var x = document.getElementsByClassName("carrousel");
    for (i = 0; i < x.length; i++) {
        x[i].style.display = "none";
    }
    slideIndex++;
    if (slideIndex > x.length) {slideIndex = 1}
    x[slideIndex-1].style.display = "block";
    setTimeout(carousel, 5000); // Change image every 2 seconds
    }

    // prev.addEventListener("click", plusDivs(-1));
    // next.addEventListener("click", plusDivs(+1));


});