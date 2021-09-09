		
function run() {
    //var arrNumber = [3, 2, 1]
    var arrNumber = document.getElementById("nums").value.split(' ');
    strToNumber(arrNumber);
    insertionSort(arrNumber);

    document.getElementById("result").innerHTML = arrNumber;
}

const insertionSort = arr => {    
    for (let i = 1, l = arr.length; i < l; i++) {
        const current = arr[i];
        let j = i;        
        
        while (j > 0 && arr[j - 1] > current) {
            arr[j] = arr[j - 1];
            j--;
        }
                
        arr[j] = current;
    }

    return arr;
};

const strToNumber = arr => {    
    for (let i = arr.length-1; i >= 0; i--) {
        arr[i] = arr[i] * 1;
        console.log(typeof(arr[i]));  
    }

    return arr;
};

function bindUIActions() {

    window.addEventListener('keydown', function (e) {
        console.log(e.code);
        
        if(e.code === 'Enter') { // right arrow key
            run();
        } 
        
    });

}

window.onload = function () {
    console.log('hello');
    bindUIActions();
}