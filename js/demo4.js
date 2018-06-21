
{
    class Entry {
        constructor(el) {
            this.DOM = {el: el};
            this.DOM.image = this.DOM.el.querySelector('.content__img');
            this.DOM.title = {word: this.DOM.el.querySelector('.content__text')};
            //charming(this.DOM.title.word);
            this.DOM.title.letters = Array.from(this.DOM.title.word.querySelectorAll('span'));
            this.DOM.title.letters.forEach(letter => letter.dataset.initial = letter.innerHTML);
            this.lettersTotal = this.DOM.title.letters.length;
            
            
            this.DOM.sub_title = {sub_word: this.DOM.el.querySelector('.content__subtext')};
            this.DOM.sub_title.sub_letters = Array.from(jQuery(this.DOM.el).find(' .content__subtext span'));
            this.DOM.sub_title.sub_letters.forEach(sub_letter => sub_letter.dataset.initial = sub_letter.innerHTML);
            this.sub_lettersTotal = this.DOM.sub_title.sub_letters.length;
            
            this.DOM.description = {desc: this.DOM.el.querySelector('.fixed_content__text')};
            this.DOM.desc_btn = {desc_btn: this.DOM.el.querySelector('.team-toggle-button')};
            this.DOM.team_desc = {team_desc: this.DOM.el.querySelector('.team-desc')};
            observer.observe(this.DOM.el);
        }
        enter(direction = 'down') {
            this.DOM.title.word.style.opacity = 1;

            this.DOM.title.letters.forEach((letter,pos) => {
                anime.remove(letter);
                let letterAnim = {
                    targets: letter,
                    duration: 500,
                    delay: () => pos*80,
                    easing: 'easeOutQuint',
                    opacity: {
                        value: [0,1],
                        duration: 400,
                        easing: 'linear'
                    }
                };
                if ( anime.random(0,1) > 0.5 ) {
                    letterAnim.translateX = [anime.random(0,1) > 0.5 ? -window.innerWidth :  window.innerWidth, 0];
                }
                else {
                    letterAnim.translateY = [anime.random(0,1) > 0.5 ? -window.innerHeight :  window.innerHeight, 0];
                }
                anime(letterAnim);
                
            });
            if(this.DOM.description !== undefined && this.DOM.description.desc){
                this.DOM.description.desc.style.display = 'block';
                
            }
            
        //+Subtitle animation!***************************
            this.DOM.sub_title.sub_letters.forEach((sub_letter,pos) => {
                anime.remove(sub_letter);
                let letterAnim = {
                    targets: sub_letter,
                    duration: 200,
                    delay: () => pos*20,
                    easing: 'easeOutQuint',
                    opacity: {
                        value: [0,1],
                        duration: 200,
                        easing: 'linear'
                    }
                };
                if ( anime.random(0,1) > 0.5 ) {
                    letterAnim.translateX = [anime.random(0,1) > 0.5 ? -window.innerWidth :  window.innerWidth, 0];
                }
                else {
                    letterAnim.translateY = [anime.random(0,1) > 0.5 ? -window.innerHeight :  window.innerHeight, 0];
                }
                anime(letterAnim);
            });
        // **********************************************

            anime.remove(this.DOM.image);
            anime({
                targets: this.DOM.image,
                duration: 800,
                easing: 'easeOutQuad',
//                rotate: () => direction === 'down' ? 5 : -5
                opacity: () => (window.pageYOffset  >= this.DOM.image.offsetTop + 300) ? '1' : '0.2',
            });
        }
        exit(direction = 'down') {
            this.DOM.title.letters.forEach((letter,pos) => {
                anime.remove(letter);
                let letterAnim = {
                    targets: letter,
                    duration: 500,
                    delay: () => pos*80,
                    easing: 'easeOutQuint',
                    opacity: {
                        value: 0,
                        duration: 200,
                        easing: 'linear'
                    }
                };
                if ( anime.random(0,1) > 0.5 ) {
                    letterAnim.translateX = [0,anime.random(0,1) > 0.5 ? -window.innerWidth :  window.innerWidth];
                }
                else {
                    letterAnim.translateY = [0,anime.random(0,1) > 0.5 ? -window.innerHeight :  window.innerHeight];
                }
                anime(letterAnim);
            });
            
            if(this.DOM.description !== undefined && this.DOM.description.desc){
                this.DOM.description.desc.style.display = 'none';
            }

            //+Subtitle animation 
            this.DOM.sub_title.sub_letters.forEach((letter2,pos) => {
                letter2.style.color = ' #0c85f7';
                anime.remove(letter2);
                let sub_letterAnim = {
                    targets: letter2,
                    duration: 500,
                    delay: () => pos*80,
                    easing: 'easeOutQuint',
                    opacity: {
                        value: 0,
                        duration: 200,
                        easing: 'linear'
                    }
                };
                if ( anime.random(0,1) > 0.5 ) {
                    sub_letterAnim.translateX = [0,anime.random(0,1) > 0.5 ? -window.innerWidth :  window.innerWidth];
                }
                else {
                    sub_letterAnim.translateY = [0,anime.random(0,1) > 0.5 ? -window.innerHeight :  window.innerHeight];
                }
                
                anime(sub_letterAnim);
                if(!this.DOM.el.classList.contains("explanation")){
                    collapse(this.DOM.team_desc.team_desc, this.DOM.description.desc, this.DOM.desc_btn.desc_btn); //доделать!
                }

            });
            
            anime.remove(this.DOM.image);
            anime({
                targets: this.DOM.image,
                duration: 800,
                easing: 'easeOutQuad',
                rotate: 0,
                opacity:0.2
            });
        }
    }

    let observer;
    let current = -1;
    let allentries = [];
    const sections = Array.from(document.querySelectorAll('.content__section'));
    // Preload all the images in the page..
	imagesLoaded(document.querySelectorAll('.content__img'), () => {
        document.body.classList.remove('loading');
        if ('IntersectionObserver' in window) {
            document.body.classList.add('ioapi');

            observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if ( entry.intersectionRatio > 0.5 ) {
                        const newcurrent = sections.indexOf(entry.target);
                        if ( newcurrent === current ) return;
                        const direction = newcurrent > current;
                        if (current >= 0 ) {
                            allentries[current].exit(direction ? 'down' : 'up');
                            
                        }
                        allentries[newcurrent].enter(direction ? 'down' : 'up');
                        current = newcurrent;
                    }
                });
            }, { threshold: 0.5 });
            
            sections.forEach(section => allentries.push(new Entry(section)));
        }
    });
}
function collapse(obj1, obj2, btn){
    if(!obj1 && !obj2) return;
    if(obj1 === undefined && obj2 === undefined) return;
   
    var isClosedDetails = obj1.classList.contains('hidden');
    var isVisibleBlock  = obj2.style.display !== 'none';
    
     if(isVisibleBlock){
         console.log("button triggered onclick event");
        btn.click();
    }
    
    if(!isClosedDetails)  obj1.classList.add('hidden');
    if(isVisibleBlock)  obj2.style.display = 'none';

}


var section = document.getElementsByClassName("team-toggle-button");
var toggler = {  
        init: function(scope){
            if(!scope) console.err('Не найден toggler  объeкт. Укажите Dom объект');

            Array.from(section).forEach(function(element){
                element.addEventListener('click', toggleVisibility);  
            }); 
        toggle: function toggleVisibility(){
                var box = this.parentElement.parentElement;
                var text_block = box.querySelector('.team-desc');
                var btn1 = box.querySelector(".btn");
                var btn2 = box.querySelector(".btn2");
                swap(text_block,btn1,btn2);
                   
            }
        swap: function swap(text_block,btn1,btn2){
                if(text_block.classList.contains('hidden')){
                   fadeOutAndfadeIn(btn2, btn1);
                   text_block.classList.remove('hidden');
                }else{
                   fadeOutAndfadeIn(btn1, btn2);
                   text_block.classList.add('hidden');
                }
            }
        }   
};
toggler.init(section);


function fadeOutAndfadeIn(image, newImage){
	var opacity = 1;
        newImage.style.opacity = 0;
	var timer = setInterval(function(){
		if(opacity < 0.1){
			clearInterval(timer);
			//swap the image, and fadeIn, which is the same as above function
//			image.src = newImage.src;
			fadeIn(image);
		}
		image.style.opacity = opacity;
		opacity -=  0.1;
	}, 50);
}
function fadeIn(element) {
    var op = 0.1;  // initial opacity
    var timer = setInterval(function () {
        if (op >= 1){
            clearInterval(timer);
        }
        element.style.opacity = op;
        op += 0.1;
    }, 10);
}