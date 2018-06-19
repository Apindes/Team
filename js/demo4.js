
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
            this.DOM.desc_btn = {desc_btn: this.DOM.el.querySelector('.button-holder')};
            
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
//                this.DOM.desc_btn.desc_btn.style.display = 'initial';
                
            }
            
        //+Subtitle animation!***************************
            this.DOM.sub_title.sub_letters.forEach((sub_letter,pos) => {
                anime.remove(sub_letter);
                let letterAnim = {
                    targets: sub_letter,
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
//                this.DOM.desc_btn.desc_btn.style.display = 'none';
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
//                jQuery('.content__subtext').css('opacity','0');
            });
            //
            
            anime.remove(this.DOM.image);
            anime({
                targets: this.DOM.image,
                duration: 800,
                easing: 'easeOutQuad',
                rotate: 0,
                opacity:0.2
            });
//            this.DOM.sub_title.sub_letters.forEach((mletter, pos) => {
//                let sub_letterAnim = {
//                    targets: mletter,
//                    duration: 500,
//                    delay: () => pos*80,
//                    easing: 'easeOutQuint',
//                    opacity: {
//                        value: 0,
//                        duration: 200,
//                        easing: 'linear'
//                    }
//                };
//                anime(sub_letterAnim);
//                mletter.style.opacity = '0';
//            });
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
                            console.log('Вышли из блока!');
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