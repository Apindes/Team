document.addEventListener('wheel', wheelListener);

var blockHeight = 300; //default value

var isScrolling = false;
var current = null;
var min = 300;
var elems = $(".content__section");
 var body = $("html, body");
$sections = [];
$(elems).each(function(index,el){
    var position = $(elems[index]).offset();
    $sections.push(Math.floor(position.top));
})
 console.log($sections);
 
 function get_current_position(){
     var scrollOffset = $(window).scrollTop();
     current = scrollOffset;
     return scrollOffset;
 }
 
 function closest(pos){
    for(var i=0; i < $sections.length; i++){
        if(pos <= 0) continue;
        if(pos == $sections[i] || (pos + min) < $sections[i] ) continue;
        if(i+1 >= $sections.length) return;
        if(pos >= $sections[i] && pos < $sections[i+1]){ 
//            console.log('closest was found!');
            return [$sections[i],$sections[i+1]];
        }
     }
 }

function wheelListener(e) {
  if(isScrolling) return false; 
    //console.log(e);
  isScrolling = true;
  var pos = get_current_position();
  
  var coors = closest(pos);
  if(!coors || coors === undefined || coors.length < 2) {
      isScrolling = false;
      return false;
  }
  console.log('2 element array- '+coors);
  try{
    setTimeout(function(){
        if(e.deltaY > 0) {
            body.stop().animate({scrollTop:coors[1] + blockHeight*0.6}, 500, 'swing', function() {});
        }else{
            var dy = (coors[0] > 0) ? coors[0] + blockHeight*0.6 : 0;
            body.stop().animate({scrollTop:dy}, 500, 'swing', function() {});     
        }
    },100);
  }finally{
      isScrolling = false;
  }
  
}

jQuery(window).on('resize',function(){
    blockHeight = $(".content__section").height();
});