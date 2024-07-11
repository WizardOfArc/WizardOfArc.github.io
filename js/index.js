document.onload = function() {
    console.log('Hello World!');
    alert('I am loaded!');
};

function sayHello() {
    console.log('Hello World!');
    alert('Hello World!');
};

var clock_interval = null;
function startClock() {
    function setClock(){
        var date = new Date();
        var time = date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds();
        document.getElementById('clock').innerHTML = time;
    }
    clock_interval = setInterval(setClock, 1000);
}

function stopClock() {
    clearInterval(clock_interval);
    console.log('Clock stopped!');
    alert('Clock stopped!');
}