function copyText (e) {
    let displayPhone = document.getElementById('displayPhone');
    let keyValue = document.querySelector(`.key[data-key="${e.keyCode}"] > kbd`);
    switch (keyValue.innerHTML) {
        case "DEL":
            const rest = displayPhone.innerHTML.replace(/\d$/, "");
            displayPhone.innerHTML = rest;
            break;
        case "OK":
            displayPhone.innerHTML = "calling...";
            displayPhone.style = "color:#33ec33";
            break;    
        default:
            displayPhone.innerHTML += keyValue.innerHTML;
            if (displayPhone.innerHTML.length > 20) {
                window.removeEventListener ('keydown', addTransition);
                window.removeEventListener ('keyup', copyText);
            }            
            break;
    }
}

function removeTransition (e) {
    e.target.classList.remove('playing');
}

function addTransition (e) {
    let audio = document.querySelector(`audio[data-key="${e.keyCode}"]`);
    if (!audio) return;
    audio.currentTime = 0;
    audio.play();

    let key = document.querySelector(`.key[data-key="${e.keyCode}"]`);
    key.classList.add('playing');
    key.addEventListener('transitionend', removeTransition);
}

window.addEventListener ('keydown', addTransition);
window.addEventListener ('keyup', copyText);