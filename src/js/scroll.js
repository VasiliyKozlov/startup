const scrollAnimate = function (to, duration) {

    if (duration <= 0) return;
    let difference = to - window.pageYOffset;
    let perTick = difference / duration * 10;

    setTimeout(function() {
        window.scrollTo(0, window.pageYOffset + perTick);
        if (window.pageYOffset === to) return;
        scrollAnimate(to, duration - 10);
    }, 10);
}

export default scrollAnimate;
