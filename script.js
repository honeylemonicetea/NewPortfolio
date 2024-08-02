// THE SCROLL ANIMATION

let scrollFactor = 0
let pageWrapper = document.querySelector(".page-wrapper")
let childrenLength = pageWrapper.children.length
let controlButtons = [...document.querySelector(".page-controls").children]

if (performance.navigation.type == performance.navigation.TYPE_RELOAD){
    pageWrapper.style.transform = `translateY(0)`
}

let backgroundChange = function(){
    controlButtons.forEach(e=>e.style.backgroundColor="transparent")
    controlButtons[scrollFactor].style.backgroundColor = "rgba(0,0,0,0.25)"
}


document.addEventListener("wheel", function(event){
    let deltaY = event.deltaY //positive  - scroll down, negative - scroll up
    if (deltaY > 0 && scrollFactor < childrenLength - 1){
        scrollFactor++
    } else if (deltaY < 0 && scrollFactor > 0) {
        scrollFactor--
    }
    pageWrapper.style.transform = `translateY(-${scrollFactor*100}vh)`
    backgroundChange()

    
})
document.addEventListener("keydown", function(event){
    let keyCode = event.keyCode
 
    if (keyCode==40 && scrollFactor < childrenLength-1){
        scrollFactor++
    } else if (keyCode==38 && scrollFactor > 0) {
        scrollFactor--
    }
    pageWrapper.style.transform = `translateY(-${scrollFactor*100}vh)`
    backgroundChange()
})




for (let i=0; i<controlButtons.length; i++) {
    controlButtons[i].addEventListener("click", function(){
        scrollFactor = i
        pageWrapper.style.transform = `translateY(-${scrollFactor*100}vh)`
        backgroundChange()
    })
}



// TYPEWRITER ANIMATION FOR THE HEADER
let heading = document.querySelector(".heading")
let text = "header"
let curInd = 0
let outputText = []
let interval
function typeWriter() {
    outputText.push(text[curInd])
    curInd++
    heading.innerHTML = outputText.join("")
    if (curInd >= text.length) {
        clearInterval(interval)
    }
}

interval = setInterval(typeWriter, 500)
