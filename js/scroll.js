$(document).ready(function(){
    
   var btn = document.getElementsByClassName("team-scroll-mouse");

    $(btn).click(scrollDown);

    function scrollDown(){
        if($(this).hasClass('nav-section')){
            $('.nav-section').removeClass('active');
            $(this).addClass("active");
        }
        if($(this).attr("data-target")){
            var target_id = this.dataset.target;
            var id = '#'+target_id;
            $('html, body').animate({ scrollTop: jQuery(id+'').offset().top + 20 }, 1000);
                return false;
        }
    } 
    
    var nav = document.getElementsByClassName("nav-section");
    $(nav).click(scrollDown);
    
    
    $(window).scroll(function() {
        
        var hT = $('.explanation').offset().top,
            hH = $('.explanation').outerHeight(),
            wH = $(window).height();
            var currentNode = null;
            
        //if (wS > (hT+hH-wH)){
//            $('.freddo_onepage_section').each(function () {
//				var s = $(this);
//				var currentId = s.attr('id') || '';
//				if ( $( window ).scrollTop() >= s.offset().top - 1) {
//					currentNode = currentId;
//				}
//
//			});
//			$('ul.freddo_sectionmap li').removeClass('current-section');
//			if ( currentNode ) {
//				$('ul.freddo_sectionmap li').find('a[href$="#' + currentNode + '"]').parent().addClass('current-section');
//			}

               var arr = document.getElementsByClassName("content__section");

                [].forEach.call(arr, function(el) {
                    var wS = $(el).offset().top;
                    if (wS > (hT+hH-wH)){
                        var target = el.getAttribute("data-target");
                        if(target){
                            currentNode = target;
                        }
                        
                    }
                     el.classList.remove("active");
                });
             var navs = document.getElementsByClassName("nav-section");
                for(var i=0; i < navs.length; i++){
                    var d = navs[i]; 
                    var target = d.getAttribute("data-target");
                    if(target !== undefined && target === currentNode){
                        
                        document.querySelector('.nav-section').classList.remove('active');
                         d.classList.add('active');
//                        document.querySelectorAll(".navs[data-target]").classList.add('active');
//                        console.log('has target data '+arr[i].classList.dataset.target);
                    }
                }

        //}
    });
    
})

