let undoStack = [];
let redoStack = [];
let currentOpenContainer = null; 


// Function to show matrix options
function toggleMatrixOptions() {
    const matrixOptions = document.getElementById("matrixOptions");
    matrixOptions.style.display = matrixOptions.style.display === "block" ? "none" : "block";
    
   
}

// Function to display input box for matrix size
function showMatrixSizeInput(matrixType) {
    const matrixSizeInput = document.createElement("div");
    matrixSizeInput.id = "matrixSizeInput";
    matrixSizeInput.innerHTML = `
        <h3>Select Matrix Size</h3>
        <label for="rows">Rows:</label>
        <input type="number" id="rows" min="1" required>
        <label for="columns">Columns:</label>
        <input type="number" id="columns" min="1" required>
        <button onclick="createMatrix('${matrixType}')">Create Matrix</button>
        <button onclick="closeMatrixInput()">Cancel</button>
    `;
    document.body.appendChild(matrixSizeInput);
    toggleMatrixOptions();
    
}

// Function to create the matrix based on user input
function createMatrix(matrixType) {

    const rows = parseInt(document.getElementById("rows").value);
    const cols = parseInt(document.getElementById("columns").value);
    let matrixHTML = '';
       

    switch (matrixType) {
        case 'basic':
            matrixHTML = `<table class="matrix"><tbody>`;
            for (let i = 0; i < rows; i++) {
                matrixHTML += `<tr>`;
                for (let j = 0; j < cols; j++) {
                    matrixHTML += `<td contenteditable="true">0</td>`;
                }
                matrixHTML += `</tr>`;
            }
            matrixHTML += `</tbody></table>`;
            break;

        case 'parenthesis':
            matrixHTML = `<span>(<table class="matrix"><tbody>`;
            for (let i = 0; i < rows; i++) {
                matrixHTML += `<tr>`;
                for (let j = 0; j < cols; j++) {
                    matrixHTML += `<td contenteditable="true">0</td>`;
                }
                matrixHTML += `</tr>`;
            }
            matrixHTML += `</tbody></table>)</span>`;
            break;

        case 'leftBrace':
            matrixHTML = `<span>{<table class="matrix"><tbody>`;
            for (let i = 0; i < rows; i++) {
                matrixHTML += `<tr>`;
                for (let j = 0; j < cols; j++) {
                    matrixHTML += `<td contenteditable="true">0</td>`;
                }
                matrixHTML += `</tr>`;
            }
            matrixHTML += `</tbody></table>}</span>`;
            break;

        case 'rightBrace':
            matrixHTML = `<span>}<table class="matrix"><tbody>`;
            for (let i = 0; i < rows; i++) {
                matrixHTML += `<tr>`;
                for (let j = 0; j < cols; j++) {
                    matrixHTML += `<td contenteditable="true">0</td>`;
                }
                matrixHTML += `</tr>`;
            }
            matrixHTML += `</tbody></table>}</span>`;
            break;

        case 'squareBrackets':
            matrixHTML = `<span>[<table class="matrix"><tbody>`;
            for (let i = 0; i < rows; i++) {
                matrixHTML += `<tr>`;
                for (let j = 0; j < cols; j++) {
                    matrixHTML += `<td contenteditable="true">0</td>`;
                }
                matrixHTML += `</tr>`;
            }
            matrixHTML += `</tbody></table>]</span>`;
            break;

        case 'verticalBars':
            matrixHTML = `<span>|<table class="matrix"><tbody>`;
            for (let i = 0; i < rows; i++) {
                matrixHTML += `<tr>`;
                for (let j = 0; j < cols; j++) {
                    matrixHTML += `<td contenteditable="true">0</td>`;
                }
                matrixHTML += `</tr>`;
            }
            matrixHTML += `</tbody></table>|</span>`;
            break;

        case 'identity':
            case 'identity':
                matrixHTML = createIdentityMatrix(rows);
                break;
        case '1x3_squareBrackets':
                    matrixHTML = `<span>[<table class="matrix"><tbody>${createRows(1, 3)}</tbody></table>]</span>`;
                    break;
        
        case '1x3_parenthesis':
                    matrixHTML = `<span>(<table class="matrix"><tbody>${createRows(1, 3)}</tbody></table>)</span>`;
                    break;
         case '3x1_squareBrackets':
                    matrixHTML = `<span>[<table class="matrix"><tbody>${createRows(3, 1)}</tbody></table>]</span>`;
                    break;
        
        case '3x1_parenthesis':
                    matrixHTML = `<span>(<table class="matrix"><tbody>${createRows(3, 1)}</tbody></table>)</span>`;
                    break;
                
        case '2x1_squareBrackets':
                    matrixHTML = `<span>[<table class="matrix"><tbody>${createRows(2, 1)}</tbody></table>]</span>`;
                    break;
        
        case '2x1_parenthesis':
                    matrixHTML = `<span>(<table class="matrix"><tbody>${createRows(2, 1)}</tbody></table>)</span>`;
                    break;

         case '1x2_squareBrackets':
                    matrixHTML = `<span>[<table class="matrix"><tbody>${createRows(1, 2)}</tbody></table>]</span>`;
                    break;
        
        case '1x2_parenthesis':
                    matrixHTML = `<span>(<table class="matrix"><tbody>${createRows(1, 2)}</tbody></table>)</span>`;
                    break;
        
        case '2x1':
                    matrixHTML = `<table class="matrix"><tbody>${createRows(2, 1)}</tbody></table>`;
                    break;
         case 'n*n_squareBrackets':
                matrixHTML = `<span>[<table class="matrix"><tbody>${createRows(rows, rows)}</tbody></table>]</span>`;
                break;
    
        case 'n*n_parenthesis':
                matrixHTML = `<span>(<table class="matrix"><tbody>${createRows(rows, rows)}</tbody></table>)</span>`;
                break;
    
        case '2*2_identity_doubleBars':
                matrixHTML = `<span>||<table class="matrix"><tbody>${createRows(2, 2, true)}</tbody></table>||</span>`;
                break;
    }

    let mathArea = document.getElementById("mathArea");
    mathArea.focus();
    insertHTMLAtCaret(matrixHTML);
    closeMatrixInput();
}
function createIdentityMatrix(size) {
    return `<table class="matrix"><tbody>${createRows(size, size, true)}</tbody></table>`;
}




function createRows(rows, cols, isIdentity = false) {
    let rowsHTML = '';
    for (let i = 0; i < rows; i++) {
        rowsHTML += `<tr>`;
        for (let j = 0; j < cols; j++) {
            const value = isIdentity && i === j ? '1' : '0'; // For identity matrices
            rowsHTML += `<td contenteditable="true">${value}</td>`;
        }
        rowsHTML += `</tr>`;
    }
    return rowsHTML;
}

// Function to close the matrix size input box
function closeMatrixInput() {
    const matrixSizeInput = document.getElementById("matrixSizeInput");
    if (matrixSizeInput) {
        document.body.removeChild(matrixSizeInput);
    }
}




// Toggle visibility of Matrix options


// Insert symbols into the math area
function insertSymbol(symbol) {
    const mathArea = document.getElementById('mathArea');
    const selection = window.getSelection();
    const range = selection.getRangeAt(0);

    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = symbol;  // Insert HTML content directly

    // Insert the new content
    const fragment = document.createDocumentFragment();
    while (tempDiv.firstChild) {
        fragment.appendChild(tempDiv.firstChild);
    }
    range.insertNode(fragment);
    
    // Move the cursor after the inserted content
    range.collapse(false);
    selection.removeAllRanges();
    selection.addRange(range);

    // Hide the options container after selection
    // hideMatrixOptions(); // Call this function to hide the matrix options
    // hideBasicOptions();  // You can add other hide functions as 
    // hideArrowOptions();
}




function insertSymbol(symbol) {
    let mathArea = document.getElementById("mathArea");
    mathArea.focus();
    
    let editableSymbol = symbol.replace('■', '<span contenteditable="true">x</span>');
    insertHTMLAtCaret(editableSymbol);  // Insert the HTML with the caret position
    
}



function insertFraction() {
    let mathArea = document.getElementById("mathArea");
    let fractionHTML = `
        <span class="fraction">
            <span class="numerator" contenteditable="true">a</span>
            <span class="slash">/</span>
            <span class="denominator" contenteditable="true">b</span>
        </span>
    `;
    
    mathArea.focus();
    insertHTMLAtCaret(fractionHTML);
    toggleFractionOptions();
}

function insertBevelledFraction() {
    let mathArea = document.getElementById("mathArea");
    let bevelledFractionHTML = `
        <span class="bevelled-fraction">
            <span contenteditable="true">a</span>
            <span class="slash">/</span>
            <span contenteditable="true">b</span>
        </span>
    `;
    mathArea.focus();
    insertHTMLAtCaret(bevelledFractionHTML);
    toggleFractionOptions();
}

function insertRoot() {
    let mathArea = document.getElementById("mathArea");
    let rootHTML = `
        <span class="root">
            <span contenteditable="true">√</span>
            <span class="radicand" contenteditable="true">x</span>
        </span>
    `;
    mathArea.focus();
    insertHTMLAtCaret(rootHTML);
    toggleFractionOptions();
}
// function hideFractionOptions() {
//     document.getElementById('fractionOptions').style.display = 'none';
// }




function insertSquareRoot() {
    // Create a container for the square root with editable input fields
    const squareRootTemplate = document.createElement('span');
    squareRootTemplate.classList.add('square-root');

    squareRootTemplate.innerHTML = `
        <div class="radicand-container">
            <span contenteditable="true" style="font-size: 18px;">√</span>
            <input type="text" class="radicand-input" style="width: 30px; text-align: center; margin: 0 2px;" placeholder=" " contenteditable="true" />
            <input type="text" class="exponent-input" placeholder=" " contenteditable="true" style="font-size: 12px; vertical-align: super; width: 30px;" />
        </div>
    `;

    // Insert the square root template at the current cursor position
    const mathArea = document.getElementById('mathArea');
    mathArea.appendChild(squareRootTemplate);
    const selection = window.getSelection();

    if (selection.rangeCount > 0) {
        const range = selection.getRangeAt(0);
        range.deleteContents(); // Optional: Remove selected text if any
        range.insertNode(squareRootTemplate); // Insert the new square root template
        range.collapse(false); // Collapse the range to the end of the inserted content
        selection.removeAllRanges(); // Clear the selection
        selection.addRange(range); // Set the new selection to the end of the inserted content

        // Focus on the radicand input field
        squareRootTemplate.querySelector('.radicand-input').focus();
    }
}

// Function to show the options container


// function hideArrowOptions() {
//     const arrowOptions = document.getElementById('arrowOption');
//     if (arrowOptions) {
//         arrowOptions.style.display = 'none'; // Hide the arrow options
//     }
// }


// function hideGreekOptions() {
//     const greekOptions = document.getElementById('greekOption');
//     if (greekOptions) {
//         greekOptions.style.display = 'none'; // Hide the arrow options
//     }
// }


// function hideBasicOptions() {
//     document.getElementById('basicOptions').style.display = 'none';
// }


// Function to toggle visibility of the basic options

function insertEditableEllipsis(symbol) {
    // Create an editable span for the selected ellipsis symbol
    const ellipsisHTML = `
        <span class="editable-ellipsis" contenteditable="true" style="display: inline-block;">
            ${symbol}
        </span>
    `;
    let mathArea = document.getElementById("mathArea"); // Your editable area
    mathArea.focus();
    insertHTMLAtCaret(ellipsisHTML); // Helper function to insert HTML at caret position
    BasicOptions();
    
    
    
}

function showContainerOnHover(buttonId, containerId) {
    var button = document.getElementById(buttonId);
    var container = document.getElementById(containerId);

    // When hovering over the button, show the container and highlight the button
    button.addEventListener('mouseenter', function() {
        container.classList.add('active');
        button.classList.add('highlighted');
    });

    // When the mouse leaves the button, don't hide the container immediately
    button.addEventListener('mouseleave', function() {
        setTimeout(function() {
            // Only hide if not hovering over the container
            if (!container.matches(':hover')) {
                container.classList.remove('active');
                button.classList.remove('highlighted');
            }
        }, 300);
    });

    // When hovering over the container, keep it open
    container.addEventListener('mouseenter', function() {
        container.classList.add('active');
        button.classList.add('highlighted');
    });

    // When the mouse leaves the container, hide the container and unhighlight the button
    container.addEventListener('mouseleave', function() {
        container.classList.remove('active');
        button.classList.remove('highlighted');
    });
}



function insertLogarithm() {
    // Create a container for the logarithm with editable input fields for both the base and the argument
    const logTemplate = document.createElement('span');
    logTemplate.innerHTML = `
        log<sub><input type="text" class="base-input" style="width: 30px; text-align: center; border: 1px solid #000; margin: 0 2px;" placeholder="n" /></sub>(<input type="text" class="argument-input" style="width: 30px; text-align: center; border: 1px solid #000; margin: 0 2px;" placeholder="■" />)
    `;
    // Append the template to the editable area
    const mathArea = document.getElementById('mathArea');
    mathArea.appendChild(logTemplate);
    // Optionally, focus on the first input field
    logTemplate.querySelector('.base-input').focus();

}

// function hideTrigOptions() {
//     const trigOptions = document.getElementById('sinOptions');
//     trigOptions.style.display = 'none'; // Hide the trigonometric options
// }

// Optional: If you need to show the options again, create another function
function showTrigOptions() {
    const trigOptions = document.getElementById('sinOptions');
    trigOptions.style.display = 'block'; // Show the trigonometric options
}


function toggleFractionOptions() {
    const fractionOptions = document.getElementById("fractionOptions");
    fractionOptions.style.display = fractionOptions.style.display === 'none' || fractionOptions.style.display === '' ? 'block' : 'none';
}

function toggleArrowOptions() {
    const arrowOptions = document.getElementById('arrowOption');
    // Toggle visibility of arrow options
    arrowOptions.style.display = arrowOptions.style.display === 'none' || arrowOptions.style.display === '' ? 'block' : 'none';
    
}


function toggleGreekOptions() {
    const greekOptions = document.getElementById('greekOption');
    // Toggle visibility of arrow options
    greekOptions.style.display = greekOptions.style.display === 'none' || greekOptions.style.display === '' ? 'block' : 'none';
    
}


function toggleBasicOptions() {
    const basicOptions = document.getElementById('basicOptions');
  // Toggle the 'active' class
    basicOptions.style.display = basicOptions.style.display === "block" ? "none" : "block";
}

function toggleSinOptions() {
    const sinOptions = document.getElementById("sinOptions");
    sinOptions.style.display = sinOptions.style.display ===  'none' || sinOptions.style.display === ''  ? "block" : 'none';
}

function toggleRelationOptions() {
    const relationOptions = document.getElementById('relationOptions');
    relationOptions.style.display = (relationOptions.style.display === 'none' || relationOptions.style.display === '') ? 'block' : 'none';
}
 



// Function to toggle visibility of sinh options
function toggleSinhOptions() {
    const sinhOptions = document.getElementById("sinhOptions");
    sinhOptions.style.display = sinhOptions.style.display === "block" ? "none" : "block";
}

// Function to insert sinh into the math area
function insertSinh() {
    let mathArea = document.getElementById("mathArea");
    let sinhHTML = `
        <span class="sinh">
            sinh(<span contenteditable="true">x</span>)
        </span>
    `;
    mathArea.focus();
    insertHTMLAtCaret(sinhHTML);
     // Hide the options after selection
}

// Function to hide sinh options
// function hideSinhOptions() {
//     const sinhOptions = document.getElementById("sinhOptions");
//     sinhOptions.style.display = 'none'; // Hide the sinh options
// }




// Function to hide the relation container only



// function hideRelationOptions() {
//     const relationOptions = document.getElementById("relationOptions");
//     relationOptions.style.display = 'none'; // Hide the sinh options
// }




function saveState() {
    const mathArea = document.getElementById('mathArea');
    undoStack.push(mathArea.innerHTML);
    // Clear the redo stack when a new state is saved
    redoStack = [];
}

// Function to perform Undo
function undo() {
    const mathArea = document.getElementById('mathArea');
    if (undoStack.length > 0) {
        // Save the current state to the redo stack before undoing
        redoStack.push(mathArea.innerHTML);
        // Restore the previous state from the undo stack
        mathArea.innerHTML = undoStack.pop();
    }
}

// Function to perform Redo
function redo() {
    const mathArea = document.getElementById('mathArea');
    if (redoStack.length > 0) {
        // Save the current state to the undo stack before redoing
        undoStack.push(mathArea.innerHTML);
        // Restore the next state from the redo stack
        mathArea.innerHTML = redoStack.pop();
    }
}

document.addEventListener('keydown', function(event) {
    if (event.ctrlKey && event.key === 'z') {
        event.preventDefault();
        undo();
    } else if (event.ctrlKey && event.key === 'y') {
        event.preventDefault();
        redo();
    }
});


document.addEventListener("DOMContentLoaded", () => {
    const buttons = document.querySelectorAll(".math-toolbar button");
    const optionsContainers = document.querySelectorAll(".options");
    let activeContainer = null; // To track the currently active options container

    // Function to open the options container
    const openContainer = (container) => {
        // Close the previously active container if it's different
        if (activeContainer && activeContainer !== container) {
            activeContainer.classList.remove("active");
        }
        container.classList.add("active");
        activeContainer = container; // Set the new active container
    };

    // Function to close the options container
    const closeActiveContainer = () => {
        if (activeContainer) {
            activeContainer.classList.remove("active");
            activeContainer = null;
        }
    };

    buttons.forEach(button => {
        button.addEventListener("mouseenter", () => {
            // Get the ID from the onclick attribute or use specific button IDs
            const targetId = button.onclick.toString().match(/'([^']+)'/);
            const targetContainerId = targetId ? targetId[1] : null;
            const targetContainer = targetContainerId ? document.getElementById(targetContainerId) : null;

            // Open the target container and close the previous one if applicable
            if (targetContainer) {
                openContainer(targetContainer); // Open the target container
            }
        });

        button.addEventListener("mouseleave", () => {
            // This event will be handled when leaving the options container
        });
    });

    // Handling mouseenter and mouseleave on options containers
    optionsContainers.forEach(container => {
        container.addEventListener("mouseenter", () => {
            activeContainer = container; // Keep track of the active container
        });

        container.addEventListener("mouseleave", () => {
            closeActiveContainer(); // Close when mouse leaves the options
        });
    });
});




// Helper function to insert HTML at caret position
function insertHTMLAtCaret(html) {
    let sel, range;
    if (window.getSelection) {
        sel = window.getSelection();
        if (sel.getRangeAt && sel.rangeCount) {
            range = sel.getRangeAt(0);
            range.deleteContents();

            let el = document.createElement("div");
            el.innerHTML = html;
            let frag = document.createDocumentFragment(), node, lastNode;
            while ((node = el.firstChild)) {
                lastNode = frag.appendChild(node);
            }
            range.insertNode(frag);

            if (lastNode) {
                range = range.cloneRange();
                range.setStartAfter(lastNode);
                range.collapse(true);
                sel.removeAllRanges();
                sel.addRange(range);
            }
        }
    }
}
document.getElementById('mathArea').addEventListener('input', saveState);

showContainerOnHover('operatorsButton', 'basicOptions');
    showContainerOnHover('fractionButton', 'fractionOptions');
    showContainerOnHover('relationsButton', 'relationOptions');
    showContainerOnHover('arrowsButton', 'arrowOption');
    showContainerOnHover('greekButton', 'greekOption');
    showContainerOnHover('sinButton', 'sinOptions');
    showContainerOnHover('sinhButton', 'sinhOptions');
    showContainerOnHover('matrixButton', 'matrixOptions');