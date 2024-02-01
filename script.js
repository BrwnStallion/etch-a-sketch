// ---------------------------- Etch-A-Sketch ----------------------------------


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




// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ Functions ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~



// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ Execution ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~


// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ TESTING ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

const gridDivsArray =  [];

for (let i = 0; i < 16; i++) {
    gridDivsArray[i] = document.createElement('div');
};

const gridContainer = document.querySelector('#grid-container');
gridDivsArray.forEach( (div) => {
    gridContainer.appendChild(div);
});