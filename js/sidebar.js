


var Sidebar = function(){
    var sidebar,main;
    init: function(sidebar,main){
        this.sidebar = document.getElementById(sidebar);
        this.main = document.getElementById(main);
    };
    openNav: function () {
        sidebar.style.width = "250px";
        main.style.marginLeft = "250px";
    }

    closeNav: function () {
        sidebar.style.width = "0";
        main.style.marginLeft= "0";
    };
   
}

new Sidebar.init('leftSidenav','main');