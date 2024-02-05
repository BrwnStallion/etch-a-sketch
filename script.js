// ---------------------- Etch-A-Sketch JavaScript -----------------------------


// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ Pseudocode ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

// Create 16 x 16 grid of square divs
    // Declare array const to store all grid div elements
    // Create div elements cyclically
        // Store each div element at the next position in the array const
        // Add class attribute for each grid div
        // Append the newly created div to grid container div
    // OR: append the divs to the grid container div cyclically through the
        // array
        // This method may be preferred because we aren't creating and rewriting
        // over the same variable as we append. This method allows for one array
        // to be defined, and then we can append all of its members
    // Can also add the class attribute by toggling the attribute for each/all
    
// Apply 'hover' effect to the grid divs
    // When the mouse moves onto a square (can put the listener on the parent)
        // Can apply attributes/styles to target element
    // Color of the interacted square randomizes
        // JS to select a random rgb based off the range of possible values
        // Future objective: darken by 10% with every interaction

// Implement button that allows user to input a custom grid size
    // Use a prompt popup
        // Set the maximum to 100
        // Account for null
        // Dispatch an event to trigger the grid logic instead of reusing it
    // Define width and height attribute on '#grid-group .grid-div' to be the
    // appropriate fraction.



// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ Functions ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

// Generate random number within a range
function getRandomNumber(min, max) {
    min = Math.ceil(+min);
    max = Math.floor(+max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Make an element a random color
function makeTargetRandomColor(e) {
    const targetDiv = e.target;
    let maxColor = 0;
    let minColor = 255;

    let redCode = getRandomNumber(minColor, maxColor);
    let greenCode = getRandomNumber(minColor, maxColor);
    let blueCode = getRandomNumber(minColor, maxColor);

    targetDiv.style.backgroundColor = `rgb(${redCode}, ${greenCode},
        ${blueCode}`;
}

// Make and append grid divs
function makeGridDiv(size) {
    
    
    const gridDivsArray =  [];

    // Fill out grid div array
    for (let i = 0; i < size; i++) {
        gridDivsArray[i] = document.createElement('div');
    };


    const gridContainer = document.querySelector('#grid-group');

    // Remove any existing grid divs from previous grid
    const gridDivsOld = document.querySelectorAll('#grid-group div');
    if (gridDivsOld.length > 0) {
            gridDivsOld.forEach( (oldGridDiv) => {
                gridContainer.removeChild(oldGridDiv);
        });
    };


    // Grid Div dimension definition THIS IS WHAT I NEED TO WORK ON RIGHT NOW
    let divDimension = Math.floor(10000 / Math.sqrt)/100;

    // Set attributes and append each newly created divs to the parent container
    gridDivsArray.forEach( (div) => {
        // Set class
        div.classList.toggle('grid-div');
        
        // Set grid div size
        div.setAttribute('style', `width: ${divDimension}%;
            height: ${divDimension}%;`);
        
        // Append to parent
        gridContainer.appendChild(div);
    });
}

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ Execution ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~


// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ TESTING ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

makeGridDiv(16);


addEventListener('load', () => {
    
    const gridInteraction = document.querySelector('#grid-group');
    const newDimButton = document.querySelector('#header button');

    gridInteraction.addEventListener('mouseover', makeTargetRandomColor);
    gridInteraction.addEventListener('touchmove', makeTargetRandomColor);
    newDimButton.addEventListener('click', () => {
        
        // While initialization value
        let promptIncomplete = true;

        while (promptIncomplete) {
            let size = prompt('Enter new sketchpad dimension:');

            if (size === null || size === '') {
                promptIncomplete = false;
            } else if (isNaN(size) || (+size < 1) || (+size > 100)) {
                alert('Dimension must be a number between 1 and 100');
            } else {
                makeGridDiv((+size));
                promptIncomplete = false;
            };

        };
        
    });
});

