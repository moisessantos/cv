var constants = {
    navAnchorActiveClass: "active"
};

function setGlobalConstants(){    
    constants.navAnchors = document.querySelectorAll("#navbar a");
    constants.anchorsLength = constants.navAnchors.length;   
}

function toggleNavbar() {
    var x = document.getElementById("navbar");
    x.className = x.className === "responsive" ? "" : "responsive";
}

function scrollToElement(element)
{   
    var yOffset = window.pageYOffset;
    var finalYOffset = element ? element.offsetTop : 0;
    var timer = 70;

    if(yOffset > finalYOffset){
        while(yOffset > finalYOffset){
            yOffset = yOffset - 50 > finalYOffset ? yOffset - 50 : finalYOffset;
            setTimeout("window.scrollTo(0, "+ yOffset +")", timer);
            timer += 20;
        } 
    }
    else {
        while(yOffset < finalYOffset){
            yOffset = yOffset + 50 < finalYOffset ? yOffset + 50 : finalYOffset;
            setTimeout("window.scrollTo(0, "+ yOffset +")", timer);
            timer += 20;
        } 
    }
}

function clearActiveAnchors(newActiveIndex)
{
    for(var i = 0; i < constants.anchorsLength; i++) {
        if(i != newActiveIndex){
            var element = constants.navAnchors[i];
            element.classList.remove(constants.navAnchorActiveClass);
        }
    }
}

function scrollToggleNavbarActiveClass(e)
{
    for(var i = 0; i < constants.anchorsLength; i++) {
        (function() {
        var element = constants.navAnchors[i];
        element.addEventListener("click", function(event){
            event.preventDefault();
            clearActiveAnchors(i);
            if(!element.classList.contains(constants.navAnchorActiveClass)){
                element.classList.add(constants.navAnchorActiveClass);
            }
            scrollToElement(document.querySelector(element.getAttribute('href')));
        });
        })();
    }
}

window.onload = function() {    
    setGlobalConstants('slideshow','slide');
    scrollToggleNavbarActiveClass();
};