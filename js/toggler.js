
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
                var btn = box.querySelector(".btn");
                var btn2 = box.querySelector(".btn2");
                
                if(text_block.classList.contains('hidden')){
                   fadeOutAndfadeIn(btn2, btn);
                   text_block.classList.remove('hidden');
                }else{
                   fadeOutAndfadeIn(btn, btn2);
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
