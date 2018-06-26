document.addEventListener('wheel', wheelListener);

var current = null;
var min = 300;
var elems = $(".content__section");
 var body = $("html, body");
$sections = [];
$(elems).each(function(index,el){
    var position = $(el).position();
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
            console.log('closest was found!');
            return [$sections[i],$sections[i+1]];
        }
     }
 }

function wheelListener(e) {
  var pos = get_current_position();
  
  var coors = closest(pos);
  setTimeout(function(){
        if(e.deltaY > 0) {
//        $('body').scrollTop( coors[1]);
//       
        body.stop().animate({scrollTop:coors[1]}, 500, 'swing', function() {});

        } else {
//             $('body').scrollTop( coors[0]);
            body.stop().animate({scrollTop:coors[2]}, 500, 'swing', function() {});

        }
  },500);
  
}
