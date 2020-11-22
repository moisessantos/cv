function clearActiveAnchors(newActiveIndex)
{
    for(var i = 0; i < constants.anchorsLength; i++) {
        if(i != newActiveIndex){
            var element = constants.navAnchors[i];
            element.classList.remove(constants.navAnchorActiveClass);
        }
    }
}