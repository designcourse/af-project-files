
function randomType(element, characters, duration, sequential = false) {
    let originalText = element.innerText;
    let textArray = originalText.split('');
    let charactersArray = characters.split('');
    let startTime = new Date().getTime();
    let interval;

    if (sequential) {
        let currentIndex = 0;
        interval = setInterval(function() {
            textArray[currentIndex] = charactersArray[Math.floor(Math.random() * charactersArray.length)];
            element.innerText = textArray.join('');
            currentIndex++;
            if (currentIndex === textArray.length) {
                currentIndex = 0;
            }
            if (new Date().getTime() - startTime >= duration) {
                clearInterval(interval);
                element.innerText = originalText;
            }
        }, 20);
    } else {
        interval = setInterval(function() {
            for (let i = 0; i < textArray.length; i++) {
                textArray[i] = charactersArray[Math.floor(Math.random() * charactersArray.length)];
            }
            element.innerText = textArray.join('');
            if (new Date().getTime() - startTime >= duration) {
                clearInterval(interval);
                element.innerText = originalText;
            }
        }, 0);
    }
}

/*

    Usage:

    Paste this function into your project and call it like this:

    randomType(domElement, '01', 500, true);

    The first parameter is just a domElement that has type inside of it. 
    The second parameter is a string of characters that you want to be used in the random typing.
    The third parameter is the duration of the typing in milliseconds.
    The fourth parameter is a boolean that determines whether the typing is sequential or not.

    If you still don't understand how to use this, don't sweat it. I will show you
    in the next solution video module.

*/