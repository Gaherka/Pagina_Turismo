let navbar = document.querySelector('.header .navbar');

document.querySelector('#menu-btn').onclick = () =>{
    navbar.classList.add('active');
}

document.querySelector('#nav-close').onclick = () =>{
    navbar.classList.remove('active');
}

let searchForm = document.querySelector('.search-form');

document.querySelector('#search-btn').onclick = () =>{
    searchForm.classList.add('active');
}

document.querySelector('#close-search').onclick = () =>{
    searchForm.classList.remove('active');
}

window.onscroll = () =>{
    navbar.classList.remove('active');

    if(window.scrollY > 0){
        document.querySelector('.header').classList.add('active');
    }else{
        document.querySelector('.header').classList.remove('active');
    }
};

window.onload = () =>{
    if(window.scrollY > 0){
        document.querySelector('.header').classList.add('active');
    }else{
        document.querySelector('.header').classList.remove('active');
    }
};

let text = document.getElementById('text');
let bird1 = document.getElementById('bird1');
let bird2 = document.getElementById('bird2');
let btn = document.getElementById('btn');
let rocks = document.getElementById('rocks');
let forest = document.getElementById('forest');
let water = document.getElementById('water');
let header = document.getElementById('header');

window.addEventListener('scroll', function() {
    let value = window.scrollY;
    
    text.style.top = 50 + value * -.1 + '%';
    bird2.style.top = value * -1.5 + 'px';
    bird2.style.left = value * 2 + 'px';
    bird1.style.top = value * -1.5 + 'px';
    bird1.style.left = value * -5 + 'px';
    btn.style.marginTop = value * 1 + 'px';
    rocks.style.top = value * -.12 + 'px';
    forest.style.top = value * .25 + 'px';
})

document.addEventListener('DOMContentLoaded', function() {
    
    const carousels = document.querySelectorAll('.carousel');
    carousels.forEach(function( carousel ) {
        const ele = carousel.querySelector('ul');
        const amountvisible = Math.round(ele.offsetWidth/ele.querySelector('li:nth-child(1)').offsetWidth);
        const bullets = carousel.querySelectorAll('ol li');
        const slides = carousel.querySelectorAll('ul li');
        const nextarrow = carousel.querySelector('.next');
        const prevarrow = carousel.querySelector('.prev');

        nextarrow.style.display = 'block';
        prevarrow.style.display = 'block';
        ele.scrollLeft = 0;
        bullets[0].classList.add('selected');
        slides[0].classList.add('selected');
        if(amountvisible>1) {
            var removeels = carousel.querySelectorAll('ol li:nth-last-child(-n + '+(amountvisible-1)+')');
            removeels.forEach(function(removeel) {
            removeel.remove();
            });
        }

        const setSelected = function() {
            bullets.forEach(function(bullet) {
            bullet.classList.remove('selected');
            });
    
            slides.forEach(function(slide) {
                slide.classList.remove('selected');
            });

            const scrolllength = carousel.querySelector('ul li:nth-child(2)').offsetLeft - carousel.querySelector('ul li:nth-child(1)').offsetLeft;
            const nthchild = (Math.round((ele.scrollLeft/scrolllength)+1));
            carousel.querySelector('ol li:nth-child('+nthchild+')').classList.add('selected'); 
            carousel.querySelector('ul li:nth-child('+nthchild+')').classList.add('selected'); 
            if(carousel.parentElement.parentElement.querySelector('.dynamictitle')) {
                const title = carousel.querySelector('ul li:nth-child('+nthchild+') img').getAttribute('title'); 
                if(title) carousel.parentElement.parentElement.querySelector('.dynamictitle').innerHTML = title;
            }
        }

        const scrollTo = function(event) {
            event.preventDefault();
            ele.scrollLeft = ele.querySelector(this.getAttribute('href')).offsetLeft;
        }
        
        const nextSlide = function() {
            if(!carousel.querySelector('ol li:last-child').classList.contains('selected')) {
                carousel.querySelector('ol li.selected').nextElementSibling.querySelector('a').click();
            } else {
                carousel.querySelector('ol li:first-child a').click();
            }
        }

        const prevSlide = function() {
            if(!carousel.querySelector('ol li:first-child').classList.contains('selected')) {
                carousel.querySelector('ol li.selected').previousElementSibling.querySelector('a').click();
            } else {
                carousel.querySelector('ol li:last-child a').click();
            }
        }

        const setInteracted = function() {
            ele.classList.add('interacted');
        }

        ele.addEventListener("scroll", debounce(setSelected));
        ele.addEventListener("touchstart", setInteracted);  
        ele.addEventListener('keydown', function (e){
            if(e.key == 'ArrowLeft') ele.classList.add('interacted');
            if(e.key == 'ArrowRight') ele.classList.add('interacted');
        });

        nextarrow.addEventListener("click", nextSlide);
        nextarrow.addEventListener("mousedown", setInteracted);
        nextarrow.addEventListener("touchstart", setInteracted);

        prevarrow.addEventListener("click", prevSlide);
        prevarrow.addEventListener("mousedown", setInteracted);
        prevarrow.addEventListener("touchstart", setInteracted);

        bullets.forEach(function(bullet) {
            bullet.querySelector('a').addEventListener('click', scrollTo);
            bullet.addEventListener("mousedown", setInteracted);
            bullet.addEventListener("touchstart", setInteracted);
        });

        if(carousel.getAttribute('duration')) {
            setInterval(function(){ 
                if (ele != document.querySelector(".carousel:hover ul") && ele.classList.contains('interacted')==false) {
                    nextarrow.click();
                }
            }, carousel.getAttribute('duration'));
        }
    }); 
}); 

function debounce (fn) {
let timeout;

return function () {

    let context = this;
    let args = arguments;

    if (timeout) {
        window.cancelAnimationFrame(timeout);
    }

    timeout = window.requestAnimationFrame(function () {
        fn.apply(context, args);
    });
};
}

