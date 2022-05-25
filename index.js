// Table values
const headers = ["Document ID", "Description", "Amount Gross", "Currency"];
const cols = 4;
// Access to HTML elements
const form = document.getElementById('inputForm');
const actionButtons = document.getElementsByClassName('action-button');
// Input verification messages
const ID_INVALID = "Invalid Trading Partner ID";
const DATE_INVALID = "Invalid date";
// Input and output variables
let inTPID, inStartDate, inEndDate, inCount;
let outName, outAbbr, outAdd;
// Validating the ID input (is numeric?)
function ValidateID(input, invalidMsg) {
    if (isNaN(input)) {
        alert(invalidMsg);
        return false;
    } else {
    return true;
    }
}
// Dates are not needed as of now, so there is no validation yet
function ValidateDates() {
    return true;
}
// Listening for form submit to act
form.addEventListener("submit", function (event) {
    event.preventDefault();
    if (ReadInput()) {
    PrintTPinfo();
    CreateTable(inCount);
    }
})
// Reading form input from <input> fields
function ReadInput() {
    let idValid = ValidateID(document.getElementById('inTPID').value, ID_INVALID);
    let dateValid = ValidateDates();
    if (idValid && dateValid) {
        inTPID = document.getElementById('inTPID').value;
        inStartDate = document.getElementById('inDateFrom').value;
        inEndDate = document.getElementById('inDateTo').value;
        inCount = document.getElementById('inCount').value;
        return true;
    } else {
        return false;
    }
}
// Generating the table based on how many rows the user wants (inCount)
function CreateTable(rows) {
    // Making action buttons visible
    actionButtons[0].style.visibility = 'visible';
    actionButtons[1].style.visibility = 'visible';
    actionButtons[2].style.visibility = 'visible';
    // Resetting the table
    if (document.getElementById('table') != null) { document.getElementById('table').remove(); }
    // Basic Table Elements
    let table = document.createElement('table');
    let tableBody = document.createElement('tbody');
    let tableHead = document.createElement('thead');
    table.setAttribute('id','table');
    tableBody.setAttribute('id','tableBody');
    tableHead.setAttribute('id','tableHead');
    table.appendChild(tableHead);
    table.appendChild(tableBody);
    document.getElementById('tableContainer').appendChild(table);
    //Table Head
    for (let j = 0; j < cols; j++) {
        let tableHeadCol = document.createElement('th');
        tableHeadCol.setAttribute('id','head'+j);
        tableHead.appendChild(tableHeadCol);
        tableHeadCol.appendChild(document.createTextNode(headers[j]));
    }
    // Table Body
    for (let i = 0; i < rows; i++) {
        let tableRow = document.createElement('tr');
        tableRow.setAttribute('id','row'+i)
        tableBody.appendChild(tableRow);
        for (let j = 0; j < cols; j++) {
            let tableCol = document.createElement('td');
            tableCol.setAttribute('id','col'+j);
            tableRow.appendChild(tableCol);
            tableCol.appendChild(document.createTextNode(i + " " + j));
            //tableCol.appendChild(document.createTextNode(data));
        }
    }
}
// Updating data
function PrintTPinfo() {
    document.getElementById('outTPID').innerHTML = "ID: " + inTPID;
    document.getElementById('outName').innerHTML = "Name: " + outName;
    document.getElementById('outAbbr').innerHTML = "Abbreviation: " + outAbbr;
    document.getElementById('outAdd').innerHTML = "Address: " + outAdd;
}