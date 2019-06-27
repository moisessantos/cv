var constants = {
    navAnchorActiveClass: "active"
};

function setGlobalConstants(){    
    constants.navAnchors = document.querySelectorAll("#navbar a");
    constants.anchorsLength = constants.navAnchors.length;
    constants.headerHeight = document.getElementById("navbar").offsetHeight - 30;   
}

function toggleNavbar() {
    var x = document.getElementById("navbar");
    x.className = x.className === "responsive" ? "" : "responsive";
}

function scrollToElement(element)
{   
    var yOffset = window.pageYOffset;
    var finalYOffset = element ? element.offsetTop - 50 : 0;
    var timer = 70;

    if(yOffset > finalYOffset){
        while(yOffset > finalYOffset){
            yOffset = yOffset - 10 > finalYOffset ? yOffset - constants.headerHeight : finalYOffset;
            setTimeout("window.scrollTo(0, "+ yOffset +")", timer);
            timer += 20;
        } 
    }
    else {
        while(yOffset < finalYOffset){
            yOffset = yOffset + 10 < finalYOffset ? yOffset + constants.headerHeight : finalYOffset;
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

loadSkills = async () => {
    const container = document.querySelector("#skills .content");
    const response = await fetch('./GetSkillsAsync');
    container.innerHTML = await response.text();
}

window.onload = function() {    
    setGlobalConstants('slideshow','slide');
    scrollToggleNavbarActiveClass();
    loadSkills();
};