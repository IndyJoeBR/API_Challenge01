const catFactsURL = "https://cat-fact.herokuapp.com/facts/random?animal_type=cat&amount=";
let queryURL;     // declared only; instialized after fetch

// DOM ELEMENT REFERENCES
// Select Number of Facts to See
const showQtyFacts = document.querySelector('.qtyOfFacts');
const btnMore = document.querySelector('.more');
const btnLess = document.querySelector('.less');
const btnGetFacts = document.querySelector('.btnGetFacts');

// Results Display
const displaySection = document.querySelector('section');
let theCatFactToDisplay = "";

// Number of results
let qtyFacts = 1;
let maxFactsAllowed = 5;

// Event Listeners
btnMore.addEventListener('click', moreFacts);   // listening +facts btn
btnLess.addEventListener('click', fewerFacts);  // listening -facts btn
btnGetFacts.addEventListener('click', getFacts);// listening get facts btn


//  ***  FETCH RESULTS  ***
function fetchResults(queryURL) {  // fetch data from URL
  fetch(queryURL)
    .then(function(response) {     // gets results, pass into 'response'
      return response.json();        // JSONifies 'response'
    })
    .then(function(json) {         // passes JSONified results to new function
      displayResultsLoop(json);    //    the display loop
    });
};






//  ***  DISPLAY RESULTS  ***
function displayResultsLoop(json) {

  // Loop removes previous facts
  while (displaySection.firstChild) {     
    displaySection.removeChild(displaySection.firstChild);  
  } 

  // IF determines if incoming data is array or object
  if(qtyFacts === 1) {    // API sends one array
    //console.log(json.text)           // *****  DELETE THIS   *****
    displayResultsToPage(json.text);
  } else {
    for(let i = 0; i < qtyFacts; i++) {   // API send arrays in one object
      //console.log(json[i].text);           // *****  DELETE THIS   *****
      displayResultsToPage(json[i].text);
    }
  }   // End of iteration display loop


  function displayResultsToPage(theCatFactToDisplay) {
    console.log(theCatFactToDisplay);           // *****  DELETE THIS   *****

    let displayText = document.createElement('h6');
    displayText.textContent = theCatFactToDisplay;
 
    let displayDiv = document.createElement('div');
    displayDiv.className = 'aCatFact';

    displayDiv.appendChild(displayText);
    displaySection.appendChild(displayDiv);


  }   //  End of displayResultsToPage Function




};  //  END OF displayResultsLoop Function





//  *****   BUTTON FUNCTIONS   *****

//  Get Facts button
function getFacts(e) {
  console.log("--------------------------");
  console.log("What is passed in 'e':");
  console.log(e);
  console.log("--------------------------");
  updateDisplay(qtyFacts)
};    // END OF getFacts Function


// One More Button
function moreFacts(e) {
  if(qtyFacts < maxFactsAllowed) {
    qtyFacts++;
  } else {
    window.alert(`You may only receive a maximum of ${maxFactsAllowed} cat facts at a time!`);
    return;
  }
  showQtyFacts.innerText = qtyFacts;
};      //  END OF moreFacts Function


// One Less Button
function fewerFacts(e) {   
  if(qtyFacts > 1) {
    qtyFacts--;
  } else {
    window.alert(`Certainly you want at least one cat fact!`);
    return;
  }
  showQtyFacts.innerText = qtyFacts;
};      //  END OF fewerFacts Function


// Update Display (the primary execution function)
function updateDisplay(qtyFacts) {
  console.log("# of Facts:", qtyFacts);           // *****  DELETE THIS   *****
  queryURL = catFactsURL + qtyFacts;
  console.log("The URL:", queryURL);              // *****  DELETE THIS   *****
  fetchResults(queryURL);
};    // END OF UPDATE DISPLAY
