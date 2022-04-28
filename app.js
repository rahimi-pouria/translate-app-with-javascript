//event btn 
let translate = document.querySelector('#goToTranslate').addEventListener('click',  wordTranslate)
let showTranslate = document.querySelector('#tranword');
let wordSearching = document.querySelector('#wordSearching');
let historywordlocalstorage = document.querySelector('.historywordlocalstorage');
//word Searching
let WordArr = [];

//show history
let ShowHistory = document.querySelector('#show-history');
// function envent click
function wordTranslate(){

    setTimeout(function() {
        showTranslate.style.display = 'block';   
        historywordlocalstorag.style.display = 'block';  
    }, 2000)

    //get value
    let word = document.querySelector('#addword').value;


    //create object 
    const translate = new XMLHttpRequest();
    //send request
    translate.open('GET', `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`, true);

    translate.onload = function() {
        if(this.status === 200) {
            const tranWord = JSON.parse(this.responseText);
            let show = '';
            for (let x in tranWord) {
                for(let i in tranWord[x].meanings){
                    for(let j in tranWord[x].meanings[i].definitions){
                show += `
                    <p>${tranWord[x].meanings[i].definitions[j].definition}</p>
                `
                    }
                }
              }

            showTranslate.innerHTML = show;
        }else {
            if(this.status === 403) {
                alert('Page not available');
            }
        }
       
    }
        //push word Searching to array
        WordArr.push(word);
        // loop search word
        WordArr.forEach(word => {
            let search = `
                <p>${word}</p>
            `
        })    

        wordSearching.innerHTML = WordArr;
        // add data on localStorage
        localStorage.setItem('word', word);
        // get data on localStorage
        var showdata = localStorage.getItem('word');
        //show history
        ShowHistory.innerHTML = showdata;
    translate.send();
}