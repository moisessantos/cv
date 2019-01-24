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

loadSkills = () => {
    const container = document.querySelector("#skills .content");
    const req = new XMLHttpRequest();
    req.onreadystatechange = () => {
        if (req.readyState != 4) return;
        if (req.status != 200 && req.status != 304) {
            console.log("Error getting skills async!")
            return;
        }
        container.innerHTML = req.response;
    }
    req.open('GET', 'http://localhost:5000/GetSkillsAsync', true);
    req.send();
}

window.onload = function() {    
    setGlobalConstants('slideshow','slide');
    scrollToggleNavbarActiveClass();
    loadSkills();
};