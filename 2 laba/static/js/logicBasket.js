window.onload = function () {
    //console.log('hello basket');
}

var count = 0;
var countEl = document.getElementById("#content #right .infoRecord .price #sumRecord count");

function plus(){
    count++;
    countEl.value = count;
}

function minus(){
    count--;
    countEl.value = count;
}