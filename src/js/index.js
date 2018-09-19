/*import scrollAnimate from "./scroll.js";
 import validation from "./validation.js";*/
/*const validation = (e) {

 }*/


window.addEventListener("DOMContentLoaded", function () {
    function setCursorPosition(pos, elem) {
        elem.focus();
        if (elem.setSelectionRange) elem.setSelectionRange(pos, pos);
        else if (elem.createTextRange) {
            var range = elem.createTextRange();
            range.collapse(true);
            range.moveEnd("character", pos);
            range.moveStart("character", pos);
            range.select()
        }
    }

    function mask(event) {
        var matrix = this.defaultValue,
            i = 0,
            def = matrix.replace(/\D/g, ""),
            val = this.value.replace(/\D/g, "");
        def.length >= val.length && (val = def);
        matrix = matrix.replace(/[_\d]/g, function (a) {
            return val.charAt(i++) || "_"
        });
        this.value = matrix;
        i = matrix.lastIndexOf(val.substr(-1));
        i < matrix.length && matrix != this.defaultValue ? i++ : i = matrix.indexOf("_");
        setCursorPosition(i, this)
    }

    var input = document.querySelector("input");
    input.addEventListener("input", mask, false)
});


const scrollAnimate = function (to, duration) {
    if (duration <= 0) return;
    let difference = to - window.pageYOffset;
    let perTick = difference / duration * 10;

    setTimeout(function () {
        window.scrollTo(0, window.pageYOffset + perTick);
        if (window.pageYOffset === to) return;
        scrollAnimate(to, duration - 10);
    }, 10);
}

document.body.addEventListener("click", function (e) {
    e.preventDefault();
    if (!e.target.classList.contains('header__nav-link')) return;
    let to = document.querySelector('.' + e.target.getAttribute('data-to'));
    scrollAnimate(to.getBoundingClientRect().top, 600);
})

document.body.addEventListener("submit", function (e) {
    //const inputs = e.target
    //e.preventDefault();
    console.log(e.target)
})