var initState = {
    hr: '00',
    min: '00',
    sec: '00'
};

var state = initState;

var start = document.querySelector('.start');
var pause = document.querySelector('.pause');
var reset = document.querySelector('.reset');

var stopHelper = (function () {
    var unsubscribe;

    return {
        start() {
            unsubscribe = setInterval(init, 1000);
        },
        pause() {
            if (!unsubscribe) return;
            clearInterval(unsubscribe);
        }
    };
})();


start.addEventListener('click', function () {
    stopHelper.start();
});

pause.addEventListener('click', function () {
    stopHelper.pause();
});

reset.addEventListener('click', function () {
    stopHelper.pause();
    state = initState;
    updateTimer(state);
})

function format(val) {
    if (val >= 0 && val <= 9) return '0' + val;
    else return `${val}`;
}


function nextTick({ hr, min, sec }) {

    if (sec === '59') {
        sec = '00';
        if (min === '59') {
            min = '00';
            hr = format(++hr);
        }
        else {
            min = format(++min);
        }
    }
    else {
        sec = format(++sec);
    }

    return {
        hr,
        min,
        sec
    };
}


var updateTimer = (function () {
    var hrRef = document.querySelector('.hr');
    var minRef = document.querySelector('.min');
    var secRef = document.querySelector('.sec');

    return function ({ hr, min, sec }) {
        hrRef.textContent = hr;
        minRef.textContent = min;
        secRef.textContent = sec;
    }

})();


function init() {
    state = nextTick(state);
    updateTimer(state);
}


// (function start() {
//     setTimeout(function () {
//         init();
//         start();
//     }, 1000);
// })();




updateTimer(state);


