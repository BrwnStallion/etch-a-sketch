// ---------------------- Etch-A-Sketch JavaScript -----------------------------


// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ Pseudocode ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

// Create 16 x 16 grid of square divs
//   - Declare array const to store all grid div elements
//   - Create div elements cyclically
//      - Store each div element at the next position in the array const
//      - Add class attribute for each grid div
//      - Append the newly created div to grid container div
//   - OR: append the divs to the grid container div cyclically through the
//     array
//   - This method may be preferred because we aren't creating and rewriting
//     over the same variable as we append. This method allows for one array
//     to be defined, and then we can append all of its members
//   - Can also add the class attrib. by toggling the attribute for each/all
    
// Apply 'hover' effect to the grid divs
//   - When the mouse moves onto a square (can put the listener on the parent)
//   - Can apply attributes/styles to target element
//   - Color of the interacted square randomizes
//   - JS to select a random rgb based off the range of possible values
//   - Future objective: darken by 10% with every interaction

// Darken a square by 10% with every interaction
//   - Do this while still changing the color randomly with each interaction
//   - Initially, the divs have the gray which is set in CSS
//   - Initial randomization will look best with color(s) @ 255
//      - Place 255 with random color; other two are random w/in the range
//   - JS needs access to the previous color, and needs to take its greatest 
//     value and use that (- 10%) as the limit for the next randomization
//      - This can be handled by subracting 26 from maximum value (10%)
//         - Then the other two colors can be random within the new range

// Implement button that allows user to input a custom grid size
//   - Use a prompt popup
//      - Set the maximum to 100
//      - Account for null
//      - Dispatch an event to trigger the grid logic instead of reusing it
//   - Define width and height attribute on '#grid-group .grid-div' to be the
//     appropriate fraction.

// Size the grid-group container to account for the header (if the height is the
// restricting dimension)
//   - Can use window resize event handler
//   - Can get window size from event information
//   - Can do calculations from the window size to subtract the known dims of
//     the header
//   - Can apply grid style dimensions using calculated dimensions

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ Functions ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

// Generate random number within a range
function getRandomNumber(min, max) {
    min = Math.ceil(+min);
    max = Math.floor(+max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Make an element a random color
function makeTargetRandomColor(e) {
    
    // Event target information
    const targetDiv = e.target;

    // RegEx for rgb numbers in the div's old color info string
    const regexRgb = /([0-9]+), ([0-9]+), ([0-9]+)/;

    // Execute search and store div's old color info in results array
    const regexRgbResults = targetDiv.style.backgroundColor.match(regexRgb);

    // Max is always unassociated to a specific color (rgb)
    let maxColor;
    
    // Create empty array in which the rgb colors will be placed
    const rgbArray = [];
    

    // Conditional to manage if it's the first color used, or has one already
    if (regexRgbResults === null) {

        // maxColor is 255 if the bgColor hasn't been set yet via listener
        maxColor = 255;

    } else {

        // Store previous rgb values as numbers
        const oldColors = [];
        oldColors[0] = +regexRgbResults[1];
        oldColors[1] = +regexRgbResults[2];
        oldColors[2] = +regexRgbResults[3];
        
        // Sort the oldColors array to get the max from the previous color
        oldColors.sort(function(a,b){return b-a});  // use callback function
        
        // Define new maxColor as approx 10% darker than previous
        maxColor = oldColors[0] - 26;

        // Keep maxColor from going negative. Can't have negative rgb value
        if (maxColor <= 0) maxColor = 0;
    
    };
    

    // Get maxColor's location in the rgbArray
    let maxColorLocation = getRandomNumber(0,2);

    // Place maxColor at its randomly determined location
    rgbArray[maxColorLocation] = maxColor;

    // Place the other two colors based on where the maxColor went
    switch (maxColorLocation) {
        case 0:
            rgbArray[1] = getRandomNumber(0, maxColor);
            rgbArray[2] = getRandomNumber(0, maxColor);
        break;
        case 1:
            rgbArray[0] = getRandomNumber(0, maxColor);
            rgbArray[2] = getRandomNumber(0, maxColor);
        break;
        case 2:
            rgbArray[0] = getRandomNumber(0, maxColor);
            rgbArray[1] = getRandomNumber(0, maxColor);
        break;
    };


    let redCode = rgbArray[0];
    let greenCode = rgbArray[1];
    let blueCode = rgbArray[2];

    targetDiv.style.backgroundColor = `rgb(${redCode}, ${greenCode},
        ${blueCode}`;
    
    e.preventDefault();
    
}

// Make and append grid divs
function makeGridDiv(size) {
    
    let gridDivTotal = size ** 2;
    const gridDivsArray =  [];

    // Fill out grid div array
    for (let i = 0; i < gridDivTotal; i++) {
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


    // Grid Div dimension definition
    let divDimension = Math.floor(10000 / size) / 100;

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

makeGridDiv(16);


addEventListener('load', () => {
    
    const gridInteraction = document.querySelector('#grid-group');
    const newDimButton = document.querySelector('#header button');

    gridInteraction.addEventListener('mouseover', makeTargetRandomColor);
    gridInteraction.addEventListener('touchstart', makeTargetRandomColor);
    newDimButton.addEventListener('click', () => {
        
        // While initialization value
        let promptIncomplete = true;

        // Verify that the new dimension input is valid
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


// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ TESTING ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
