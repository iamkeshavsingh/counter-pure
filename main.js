var initState = {
    hr: '00',
    min: '00',
    sec: '00'
};

var state = initState;

var start = document.querySelector('.start');
var pause = document.querySelector('.pause');
var reset = document.querySelector('.reset');
var startCountdownButton = document.querySelector('.startCountdownButton');


(function () {

    function requiredError(secValue) {
        var num = Number(secValue);
        return !num ? true : false;
    }

    function validInputError(...args) {

        var newArray = args
            .map(function (val) {
                return Number(val);
            })
            .map(function (ele) {
                if (!ele) return ele;
                if (ele > 0) return true;
                return false;
            });

        return newArray.includes(false) || newArray.includes(NaN);
    }

    function reset() {
        hrValueElement.value = '';
        minValueElement.value = '';
        secValueElement.value = '';
    }

    var hrValueElement = document.querySelector('#hr');
    var minValueElement = document.querySelector('#min');
    var secValueElement = document.querySelector('#sec');
    var timer = document.querySelector('.timer');
    var timerMessageElement = document.querySelector('.timer_message');

    startCountdownButton.addEventListener('click', function () {

        var hrValue = hrValueElement.value;
        var minValue = minValueElement.value;
        var secValue = secValueElement.value;

        // validations
        if (requiredError(secValue)) {
            console.log('Invalid Time');
            reset();
            return;
        }

        if (validInputError(hrValue, minValue, secValue)) {
            console.log('Invalid Time');
            reset();
            return;
        }

        state.hr = hrValue;
        state.min = minValue;
        state.sec = secValue;

        timer.style.display = 'flex';
        timerMessageElement.style.display = 'none';

        updateTimer(state);
        reset();

    });
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


var stopHelper = (function () {
    var unsubscribe;

    return {
        start() {
            unsubscribe = setInterval(init, 1000);
        },
        pause() {
            if (!unsubscribe) return;
            clearInterval(unsubscribe);
        },
        isCountdown({ hr, min, sec }) {
            return hr === '00' && min === '00' && sec === '00';
        }
    };
})();

function format(val) {
    if (val >= 0 && val <= 9) return '0' + val;
    else return `${val}`;
}


function nextTick({ hr, min, sec }) {

    if (sec === '00') {
        sec = '59';
        if (min === '00') {
            min = '59';
            hr = format(--hr);
        }
        else {
            min = format(--min);
        }
    }
    else {
        sec = format(--sec);
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
    var { isCountdown, pause } = stopHelper;
    if (isCountdown(state)) {
        pause();
        console.log('Oops!! Time is over');
    }
    updateTimer(state);
}







