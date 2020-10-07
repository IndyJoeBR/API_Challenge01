//   *****   DECLARATIONS   *****
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
let qtyFacts = 1;           // The initial number of facts
let maxFactsAllowed = 5;    // Maximum facts allowed
    // The site allows up to 500, but more than 5 facts makes the chances
    // likely that the "tongue" will extend off the bottom of the webpage.

// Event Listeners
btnMore.addEventListener('click', moreFacts);       // listening +facts btn
btnLess.addEventListener('click', fewerFacts);      // listening -facts btn
btnGetFacts.addEventListener('click', getFacts);    // listening get-facts btn


//   *****   FETCH RESULTS   *****
function fetchResults(queryURL) {  // fetch data from URL
  fetch(queryURL)
    .then(function(response) {     // gets results, pass into 'response'
      return response.json();        // JSONifies 'response'
    })
    .then(function(json) {         // passes JSONified results to new function
      displayResultsLoop(json);    //    the display loop
    });
};


//   *****   DISPLAY RESULTS   *****
function displayResultsLoop(json) {

  // Loop removes previous facts
  while (displaySection.firstChild) {     
    displaySection.removeChild(displaySection.firstChild);  
  } 

  // IF determines wether incoming data will be an array(1) or object(2+)
  if(qtyFacts === 1) {    // API sends one array
    displayResultsToPage(json.text);
  } else {
    for(let i = 0; i < qtyFacts; i++) {   // API send arrays in one object
      displayResultsToPage(json[i].text);
    }
  }   // End of iteration display loop


  function displayResultsToPage(theCatFactToDisplay) {

    // Creates <h6> for fact and puts fact into it
    let displayText = document.createElement('h6');
    displayText.textContent = theCatFactToDisplay;
 
    // Creates <div> for <h6> and gives it the aCatFact class (for CSS)
    let displayDiv = document.createElement('div');
    displayDiv.className = 'aCatFact';

    // Puts cat fact <h> in the <div> and puts <div> in the <section>
    displayDiv.appendChild(displayText);
    displaySection.appendChild(displayDiv);
  }   //  End of displayResultsToPage Function

};  //  END OF displayResultsLoop Function



//   *****   BUTTON FUNCTIONS   *****
//  Get Facts button
function getFacts(e) {
  updateDisplay(qtyFacts)
};    // END OF getFacts Function

// One More Button
function moreFacts(e) {
  if(qtyFacts < maxFactsAllowed) {
    qtyFacts++;
  } else {
    window.alert(`You may only receive a maximum of ${maxFactsAllowed} cat facts at a time!`);    // alert explains max cat facts allowed
    return;
  }
  showQtyFacts.innerText = qtyFacts;   // updates # of facts chosen
};      //  END OF moreFacts Function

// One Less Button
function fewerFacts(e) {   
  if(qtyFacts > 1) {
    qtyFacts--;
  } else {
    window.alert(`Certainly you want at least one cat fact!`);  // alert explains min cat facts allowed
    return;
  }
  showQtyFacts.innerText = qtyFacts;   // updates # of facts chosen
};      //  END OF fewerFacts Function


//   *****   PRIMARY EXECUTION FUNCTION   *****
// Update Display
function updateDisplay(qtyFacts) {
  queryURL = catFactsURL + qtyFacts;     // creates URL for fetch
  fetchResults(queryURL);                // call fetch with new URL
};    // END OF UPDATE DISPLAY
