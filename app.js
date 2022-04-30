let showTranslate = document.querySelector('#tranword');
let wordSearching = document.querySelector('#wordSearching');
//clear text at input function 
let inputsAdword = document.querySelector('#inputs');
let historywordlocalstorage = document.querySelector('.historywordlocalstorage');

let word;
//loader event
let loader = document.querySelector('#loader');
//word Searching
let WordArr = [];

//show history
let ShowHistory = document.querySelector('#show-history');

//event btn 
let translate = document.querySelector('#goToTranslate').addEventListener('click',  () => {

    //get value
    word = document.querySelector('#addword').value;
        

        // fetch Api 
    fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`)
        .then((res) => {
            return res.json();
        })
        // show data
        .then((data) => {
            const tranWord = data;
            let show = '';
            tranWord.map((item, index) => {
                show += `
                    <p>${item.meanings[index].definitions[index].definition}</p>
                `
            })
            // show data at dom
            showTranslate.innerHTML = show;
        })
        //show error at console 
        .catch((err) => {
            console.log(err)
        })   
        //push word Searching to array
        WordArr.push(word);
        // loop search word
        WordArr.forEach(word => {
            let search = `
                <p>${word}</p>
            `
        })    
            //added style with javascript
            
            historywordlocalstorage.style.display = 'block';  
            historywordlocalstorage.style.display = 'flex';
            // showTranslate.style.height = 'auto';
            showTranslate.style.padding = '15px';
            inputsAdword.style.height = 'auto';
        // show history data at dom
        wordSearching.innerHTML = WordArr;
        // add data on localStorage
        localStorage.setItem('word', word);
        // get data on localStorage
        var showdata = localStorage.getItem('word');
        //show history
        ShowHistory.innerHTML = showdata;

})
