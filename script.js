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




// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ Functions ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~



// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ Execution ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~


// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ TESTING ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

(function () {
    const gridDivsArray =  [];

    for (let i = 0; i < 256; i++) {
        gridDivsArray[i] = document.createElement('div');
    };

    const gridContainer = document.querySelector('#grid-group');
    gridDivsArray.forEach( (div) => {
        div.classList.toggle('grid-div');
        gridContainer.appendChild(div);
    });
})();


addEventListener('load', () => {
    
    const gridInteraction = document.querySelector('#grid-group');

    gridInteraction.addEventListener('mouseover', (e) => {
        const targetDiv = e.target;
        targetDiv.style.backgroundColor = 'orange';
    });

    gridInteraction.addEventListener('touchmove', (e) => {
        const targetDiv = e.target;
        targetDiv.style.backgroundColor = 'orange';
    });
});