// THE SCROLL ANIMATION

let scrollFactor = 0
let pageWrapper = document.querySelector(".page-wrapper")
let childrenLength = pageWrapper.children.length
let controlButtons = [...document.querySelector(".page-controls").children]

if (performance.navigation.type == performance.navigation.TYPE_RELOAD) {
    pageWrapper.style.transform = `translateY(0)`
}

let backgroundChange = function () {
    pageWrapper.style.transform = `translateY(-${scrollFactor * 100}vh)`
    controlButtons.forEach(e => e.style.backgroundColor = "transparent")
    controlButtons[scrollFactor].style.backgroundColor = "rgba(255,255,255,0.5)"
}

let scrolled = false

document.addEventListener("wheel", function (event) {
    let deltaY = event.deltaY //positive  - scroll down, negative - scroll up
    if (deltaY > 0 && scrollFactor < childrenLength - 1 && !scrolled) {
        scrollFactor++
        scrolled = true
    } else if (deltaY < 0 && scrollFactor > 0 && !scrolled) {
        scrollFactor--
        scrolled = true
    }
    backgroundChange()
    setTimeout(()=>{
        scrolled = false
    }, 200)
})
document.addEventListener("keydown", function (event) {
    let keyCode = event.keyCode

    if (keyCode == 40 && scrollFactor < childrenLength - 1) {
        scrollFactor++
    } else if (keyCode == 38 && scrollFactor > 0) {
        scrollFactor--
    }

    backgroundChange()
})


document.addEventListener("touchstart", startTouching)
document.addEventListener("touchend", stopTouching)
let touchStartY = 0
let touchEndY = 0

function startTouching(event) {
    touchStartY = event.changedTouches[0].screenY
}
function stopTouching(event) {
    touchEndY = event.changedTouches[0].screenY
    if (touchStartY > touchEndY && scrollFactor < childrenLength - 1) {
        scrollFactor++
    } else if (touchStartY < touchEndY && scrollFactor > 0) {
        scrollFactor--
    }

    backgroundChange()
}


for (let i = 0; i < controlButtons.length; i++) {
    controlButtons[i].addEventListener("click", function () {
        scrollFactor = i

        backgroundChange()
    })
}

// navigation
let homeBtn = document.getElementById("home-btn")
let projectsBtn = document.getElementById("projects-btn")
let footerBtn = document.getElementById("footer-btn")
homeBtn.onclick = () => {
    scrollFactor = 0
    backgroundChange()
}
projectsBtn.onclick = () => {
    scrollFactor = 1
    backgroundChange()
}
footerBtn.onclick = () => {
    scrollFactor = childrenLength - 1
    backgroundChange()

}


// TYPEWRITER ANIMATION FOR THE HEADER
let heading = document.querySelector(".heading")
let text = "Привет, меня зовут Фирюза. Я веб-разработчик из Казани."
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

interval = setInterval(typeWriter, 100)
