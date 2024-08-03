let haveRifle = false;
let isJapanese = false;
let japaneseTextShow = false;
let bearInPhaseThree = false;
let slashed = false;
let bearKilled = false;
let timeoutId;
var $main = document.getElementById('main-content');
var $claw = document.querySelector('.claw-image');

var gunshotSound = new Audio('./Audio/gunshot.mp3')
//#region disablers
function disableSelectBox() {
    document.querySelector('.select-box').disabled = true;
}
function enableSelectBox() {
    document.querySelector('.select-box').disabled = false;
}
document.addEventListener('contextmenu', function(event) {
    event.preventDefault();
});
//#endregion
document.addEventListener('DOMContentLoaded', function () {
    var targetElement = document.querySelector(".modal-content");;
    var visibleTime = 3000;
    
    function handleVisibility() {
        console.log("The element has been visible for " + visibleTime + " milliseconds.");
        // Add your desired action here
        // targetElement.style.backgroundColor = 'white'; // Example action
    }

    var observerOptions = {
        root: null, // Use the viewport as the root
        threshold: 0.5 // The element is considered visible when 50% of it is in view
    };

    var timeoutId;

    var observer = new IntersectionObserver(function(entries, observer) {
        entries.forEach(function(entry) {
            if (entry.isIntersecting) {
                // Start the timer when the element becomes visible
                timeoutId = setTimeout(handleVisibility, visibleTime);
            } else {
                // Clear the timer if the element is no longer visible
                clearTimeout(timeoutId);
            }
        });
    }, observerOptions);

    // Start observing the target element
    observer.observe(targetElement);
});
document.querySelector('.select-box').addEventListener('change', function () {
    var selectedValue = this.value;
    var englishElements = document.querySelectorAll('.en');
    var binElements = document.querySelectorAll('.bin');
    var hexElements = document.querySelectorAll('.hex');
    var japaneseElements = document.querySelectorAll('.jp');
    var $logo = document.querySelector('.logo');
    var $map = document.getElementById('map');
    var $bear = document.getElementById('bearPortrait')
    var $rifle = document.querySelector('.clickable-rifle');
    var $binary2 = document.querySelector('.bin-2');
    var audioEnrage = new Audio('./Audio/BearHurt2.wav');
    // Hide all elements
    clearTimeout(timeoutId);
    englishElements.forEach(function(element) {
        element.classList.add('hidden');
    });
    binElements.forEach(function(element) {
        element.classList.add('hidden');
    });
    hexElements.forEach(function(element) {
        element.classList.add('hidden');
    });
    japaneseElements.forEach(function(element) {
        element.classList.add('hidden');
    });
    $binary2.classList.add('hidden');
    $logo.classList.remove('opacity-blinking');
    $map.classList.remove('hidden');
    $bear.classList.remove('hidden');
    $rifle.classList.add('hidden');
    $main.style.transition ="filter 3s";
    $main.style.filter = "brightness(100%)";
    var slashSFX = new Audio('./Audio/slash-sound.mp3');
    gunshotSound.pause();
    gunshotSound.currentTime = 0;
    
    // Show only the one that matches the selected value
    if (selectedValue === 'english') {
        englishElements.forEach(function(element) {
            element.classList.remove('hidden');
        });
        $bear.classList.add('hidden');
    } 
    else if (selectedValue === 'binary') {
        if(slashed === false)
        {
            binElements.forEach(function(element) {
                element.classList.remove('hidden');
            });
        }
        if(slashed === true)
        {
            $binary2.classList.remove('hidden');
        }
        $main.style.transition ="filter 10s";
        $main.style.filter = "brightness(0%)";
        if(bearInPhaseThree === true)
        {
            $main.style.transition ="filter 10s";
            $main.style.filter = "brightness(0%)";
            timeoutId = setTimeout(function(){
                slashed = true;
                disableSelectBox();
                audioEnrage.play();
                setTimeout(function(){
                    binElements.forEach(function(element) {
                        element.classList.add('hidden');
                    });
                    $claw.classList.remove('hidden');
                    $main.style.filter = "hue-rotate(-50deg) saturate(5) brightness(0.4)";
                    $binary2.classList.remove('hidden'); 
                    document.querySelector('.phase-three-panda').classList.remove('hidden');  
                    slashSFX.play();  
                }, 1500);
            }, 11000);
        }
    } 
    else if (selectedValue === 'hexadecimal') {
        hexElements.forEach(function(element) {
            element.classList.remove('hidden');
            if(logoClicked === false)
            {
                $logo.classList.add('opacity-blinking');
            }
        });
        $map.classList.add('hidden');
    } 
    else if (selectedValue === 'japanese') {
        japaneseElements.forEach(function(element) {
            element.classList.remove('hidden');
        });
        $bear.classList.add('hidden');
    }
});

//#region onclick Events
var amogusAudio = new Audio('./Audio/amogus.mp3');
var windowsErrorAudio = new Audio('./Audio/error.mp3');
var $errorSite = document.querySelector('.error-page');
var skyrimAudio = new Audio('./Audio/skyrim-awake.wav');
var fakeSiteA = document.querySelectorAll('.fake-site');
document.querySelector('.hidden-reveal-jp').addEventListener('click', function () {
    var $test = document.querySelector('.hidden-reveal-jp');
    var $text = document.querySelector('.hidden-text-jp');
    $text.classList.remove('hidden');
});
document.querySelector('.panda-image').addEventListener('click', function () {
    var $panda = document.querySelector('.panda-image');
    var $heart = document.querySelector('.heart-image');
    gunshotSound.volume = 0.6;
    const rect = $panda.getBoundingClientRect();
    //position offset
    const offsetX = -75;
    const offsetY = -50;

    //#region Audio Handler and volumes
    var audio = new Audio('./Audio/se_cat01.wav');
    var audio2 = new Audio('./Audio/BearHurt1.mp3');
    var audio3 = new Audio('./Audio/BearHurt2-1.mp3');
    
    

    audio.volume = 1;
    audio2.volume = 1;
    audio3.volume = 1;
    
    //#endregion
    if (haveRifle === false) {
        $heart.style.left = (rect.right + offsetX) + 'px';
        $heart.style.top = (rect.top + offsetY) + 'px';
        audio.play();
        if ($heart.classList.contains('heart-show') === false) {
            $heart.classList.add('heart-show');
            setTimeout(() => {
                $heart.classList.remove('heart-show');
            }, 1500);
            console.log('Heart Spawned');
        }
        return;
    }
    if ($panda.classList.contains('phase2')) {
        bearInPhaseThree = true;
        $panda.classList.remove('phase2');
        $panda.classList.add('hidden');  
        
        gunshotSound.play();

        audio3.play();
    }
    else if ($panda.classList.contains('phase3')) {
        $panda.classList.add('hidden');   
        
    }
    else {
        $panda.classList.add('phase2');
        audio2.play();
        gunshotSound.play();
    }
});
document.querySelector('.phase-three-panda').addEventListener('click', function () {
    var audio4 = new Audio('./Audio/BearGone.mp3');
    bearInPhaseThree = false;
    audio4.play();
    gunshotSound.play();
    audio4.volume = 0.5;
    document.querySelector('.phase-three-panda').classList.add('hidden');
    $main.style.filter = 'hue-rotate(-50deg) saturate(5) brightness(0)';
    $main.style.transition = 'filter 7s';
    $claw.style.filter = 'brightness(0)';
    $claw.style.transition = 'filter 7s';
    setTimeout(function(){
        amogusAudio.play();
    }, 7500)
    setTimeout(function() {
        $claw.style.transition = 'filter 0s';
        $main.style.transition = 'filter 0s';
        $main.style.backgroundImage = 'none';
        document.body.backgroundColor = 'white';
        $claw.classList.add('hidden');
        fakeSiteA.forEach(function(element) {
            element.classList.add('hidden');
        });
        windowsErrorAudio.play();
        $main.style.filter = 'brightness(100%)';
        $errorSite.classList.remove('hidden');
    }, 11000)
    bearKilled = true;
})
document.querySelector('.reload-button').addEventListener('click', function(){
    $errorSite.classList.add('hidden');
    setTimeout(function(){
        //Remove on next Update
        $errorSite.classList.remove('hidden');
        windowsErrorAudio.play();
    }, 2000);
})
document.querySelector('.logo').addEventListener('click', function() {
    document.querySelector('.logo').classList.remove('opacity-blinking');
})
//#endregion
//#region scroll disabler
// function preventScroll(event) {
//     event.preventDefault();
//     event.stopPropagation();
//     return false;
// }

// // Function to disable scrolling
// function disableScroll() {
//     window.addEventListener('scroll', preventScroll, { passive: false });
//     window.addEventListener('wheel', preventScroll, { passive: false });
//     window.addEventListener('touchmove', preventScroll, { passive: false });
//     window.addEventListener('keydown', preventScroll, { passive: false });
//     document.addEventListener('mousedown', function(event) {
//     if (event.button === 1) { // Check if middle mouse button is clicked
//         event.preventDefault(); // Prevent the default action (scrolling)
//     }
//     });
// }

// function enableScroll() {
//     window.removeEventListener('scroll', preventScroll);
//     window.removeEventListener('wheel', preventScroll);
//     window.removeEventListener('touchmove', preventScroll);
//     window.removeEventListener('keydown', preventScroll);
// }
// // Disable scrolling on page load
// window.addEventListener('load', disableScroll);
//#endregion
// #region modal controller
// Get the modal
var modal = document.getElementById("myModal");
var modalContent = document.querySelector(".modal-content")
var bearAudio = new Audio('./Audio/Bear_ost.mp3');
// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// Get all elements with the class "clickbait-text"
var btns = document.querySelectorAll(".clickbait-text");
var logo = document.querySelector(".logo");
let logoClicked = false;
let hexModal = false;
const texts = modal.querySelectorAll('.automatically-updating-text');
let currentIndex = 0;
let intervalId;

// Loop through each element and add the onclick event listener
btns.forEach(function(btn) {
    btn.onclick = function() {
        disableSelectBox();
        modalContent.style.flexDirection = "row";
        modalContent.style.justifyContent = "flex-start";
        modalContent.style.alignItems = "flex-start";
        console.log("button pressed");
        modal.style.display = "block";
    }
});
logo.onclick = function(){
    console.log(hexModal);
    var selectedValue = document.querySelector('.select-box').value;
    if(selectedValue != 'hexadecimal')
    {
        return;s
    }
    if(logoClicked === false && selectedValue === "hexadecimal")
    {
        if(haveRifle === true){
            return;
        }
        disableSelectBox();
        modalContent.style.flexDirection = "column";
        modalContent.style.justifyContent = "center";
        modalContent.style.alignItems = "center";
        // modalContent.style.textAlign  = "flex-start";
        modal.style.display = "block";
        //logoClicked = true;
        hexModal = true;
        logo.style.cursor = "default";
        bearAudio.play();
        bearAudio.volume = 0.4;
    }
    startTextRotation();
}

document.querySelector('.clickable-rifle').addEventListener('click', function () {
    bearAudio.pause();
    enableSelectBox();
    var $rifle = document.querySelector('.clickable-rifle');
    $rifle.classList.add('hidden');
    document.body.classList.add('crosshair');
    haveRifle = true;
    console.log(haveRifle);
    modal.style.display = "none";
});

function showNextText() {
    var $rifle = document.querySelector('.clickable-rifle');
    console.log("showing next text");
    // Hide all texts
    texts.forEach(text => text.style.display = 'none');

    // Show the next text
    texts[currentIndex].style.display = 'block';

    // Update the index to show the next text
    currentIndex = (currentIndex + 1) % texts.length;
    console.log(currentIndex);
    clearInterval(intervalId);

    if(currentIndex <= 3 && currentIndex != 0)
    {
        intervalId = setInterval(showNextText, 5000);
        console.log(currentIndex);
        console.log(texts.length);
    }
    else if(currentIndex % texts.length === 0)
    {
        console.log(currentIndex);
        console.log(texts.length);
        console.log('I am supposed to run')
        intervalId = setInterval(showNextText, 6000);
        stopTextRotation();
        hexModal = false;
        $rifle.classList.remove('hidden');
    }
    else{
        intervalId = setInterval(showNextText, 2000);
        console.log(currentIndex);
        console.log(texts.length);
    }
}
function startTextRotation() {
    showNextText();
}
function stopTextRotation() {
    clearInterval(intervalId);
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == modal) {
        if(hexModal === false)
        {
            enableSelectBox();
            modal.style.display = "none";
            modalContent.style.backgroundColor = '#140a0a';
            currentIndex = 0;
            stopTextRotation();
        }
    }
}
//#endregion