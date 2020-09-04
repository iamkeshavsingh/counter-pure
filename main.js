var incrementButton = document.querySelector('.increment');
var decrementButton = document.querySelector('.decrement');
var reset = document.querySelector('.reset');
var counter = document.querySelector('.counter');

var state = {
    counter: {
        value: 0
    }
};

function updateCounter() {
    counter.textContent = state.counter.value;
}

var helper = (function (state) {

    function reset() {
        return { ...state.counter, value: 0 };
    }

    function increment() {
        var newCounter = { ...state.counter };
        newCounter.value = newCounter.value + 1;
        return newCounter;
    }

    function decrement() {
        var newCounter = { ...state.counter };
        newCounter.value = newCounter.value - 1;
        return newCounter;
    }

    return {
        reset: reset,
        increment: increment,
        decrement: decrement
    };

})(state);

incrementButton.addEventListener('click', function () {
    state.counter = helper.increment();
    updateCounter();
});

decrementButton.addEventListener('click', function () {
    state.counter = helper.decrement();
    updateCounter();
})

reset.addEventListener('click', function () {
    state.counter = helper.reset();
    updateCounter();
})
