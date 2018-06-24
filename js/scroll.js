$(document).ready(function(){
    
   var btn = document.getElementsByClassName("team-scroll-mouse");

    $(btn).click(scrollDown);

    function scrollDown(){
        console.log("clciked");
        if($(this).attr("data-target")){
            var target_id = this.dataset.target;
            var id = '#'+target_id;
            $('html, body').animate({ scrollTop: jQuery(id+'').offset().top + 20 }, 1000);
                return false;
        }
    } 
    
})

