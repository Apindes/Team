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
        
        var hT = $('.block').offset().top,
            hH = $('.block').outerHeight(),
            wH = $(window).height();
            var currentNode = null;
            var bodyHeight = document.body.offsetHeight;
            
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

               var arr = document.getElementsByClassName("block");

                [].forEach.call(arr, function(el) {
                    var elTop = $(el).offset().top;
                    var elHeight = el.scrollHeight;
                    var elBottom = elTop + elHeight;
                    if(elementInViewport(el)){
                        $('.nav-section').removeClass('active');
                        var target = el.getAttribute('id');
                        console.log(el.getAttribute('id')+'is visible');
                        $('.nav-section[data-target="'+target+'"]').addClass('active');
                    }
//                    console.log('отступ от низа блока:'+elBottom+'отступ от верха блока:'+elTop+'. высота самого блока:'+elHeight+'.Высота документа:'+bodyHeight);
//                    if()
//                    if (wS > (hT+hH-wH)){
//                        var target = el.getAttribute("id");
//                        if(target){
//                            currentNode = target;
//                        }
//                        
//                    }
                     el.classList.remove("active");
                });
             var navs = document.getElementsByClassName("nav-section");
                for(var i=0; i < navs.length; i++){
                    var d = navs[i]; 
                    var target = d.getAttribute("data-target");
                    if(target !== undefined && target === currentNode){
                        console.log(currentNode);
                        document.querySelector('.nav-section').classList.remove('active');
                         d.classList.add('active');
//                        document.querySelectorAll(".navs[data-target]").classList.add('active');
//                        console.log('has target data '+arr[i].classList.dataset.target);
                    }
                }

        //}
    });
    
    
    function elementInViewport(el) {
        var top = el.offsetTop;
        var left = el.offsetLeft;
        var width = el.offsetWidth;
        var height = el.offsetHeight;

        while(el.offsetParent) {
          el = el.offsetParent;
          top += el.offsetTop;
          left += el.offsetLeft;
        }

        return (
          top < (window.pageYOffset + window.innerHeight) &&
//          left < (window.pageXOffset + window.innerWidth) &&
          (top + height) > window.pageYOffset 
                  
//         && (left + width) > window.pageXOffset
        );
    }
    
    
    
    /*AutoScroll*/
   var ancherList = ["strong-team","people","id3"];
   var currentPosition = null;

  var mousewheelevent = 'onwheel' in document ? 'wheel' : 'onmousewheel' in document ? 'mousewheel' : 'DOMMouseScroll';
  $(document).on(mousewheelevent,function(e){
      var scrollToAncher function (id,speed){
          spd = speed ? "slow" //deafult value for the animation speed
          var ancherTag = $("a[name='"+ id +"']");
          $('html,body').animate({scrollTop: ancherTag.offset().top},spd);
      }
      e.preventDefault();
      var delta = e.originalEvent.deltaY ? -(e.originalEvent.deltaY) : e.originalEvent.wheelDelta ? e.originalEvent.wheelDelta : -(e.originalEvent.detail);
      if (delta > 0){
          console.log("up")
          //check your current position and target id
          switch(currentPosition){
            case null :
            case ancherList[0] :
              scrollToAncher(ancherList[1]);
              currentPosition = ancherList[1];
              break;
            case ancherList[1] :
              currentPosition = ancherList[2];
              scrollToAncher(ancherList[2]);
              break;
            case ancherList[2] :
              currentPosition = ancherList[0];
              scrollToAncher(ancherList[0]);
              break;              
          }
      } else {
          console.log("down")
          //do the same for mouse wheel down
      }
  });
    
})

