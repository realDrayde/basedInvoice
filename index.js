// links
let urlMain = "https://k2demo.abis.cz:44302/V22K2_API_DEMO/Data/TInvoiceOutDM?fields=TradingPartnerId,DocumentIdentificationCalc,AmountGrossC,Currency&conditions=TradingPartnerId;EQ;";
// Table values
const headers = ["Document ID", "Date", "Amount Gross", "Currency"];
let docID = [], date = [], amgross = [], curr = [];
let cols = 4;
// Access to HTML elements
const form = document.getElementById('inputForm');
const actionButtons = document.getElementsByClassName('action-button');
// Input verification messages
const ID_INVALID = "Invalid Trading Partner ID";
const DATE_INVALID = "Invalid date";
// Input and output variables
let inTPID, inStartDate, inEndDate, inCount;
let outTPID, outName, outAbbr, outAdd;
let data, subdata;
// Function for communicating with API
async function CallAPI(url) {
    let response = await fetch(url);
    let object = await response.json();
    let i = 0;
    console.log("url: " + url + "\nresponse: " + response + "\nobject: " + object);
    object = object.Items;
    await Promise.all(object.map( async (x) =>{
        let partnerUrl = x.FieldValues[3].Value.ItemURL;
        let subresponse = await fetch(partnerUrl);
        let subobject = await subresponse.json();
        //inCount = x.RecordsCount;
        outName = subobject.FieldValues[3].Value;
        outAbbr = x.FieldValues[3].Value.FieldValues[0].Value;
        outTPID = subobject.FieldValues[5].Value;
        docID[i] = x.FieldValues[1].Value;
        date[i] = x.FieldValues[4].Value;
        amgross[i] = x.FieldValues[0].Value;
        curr[i] = x.FieldValues[3].Value.FieldValues[1].Value;
        //console.log("i: " + i + " partnerName: " + outName + " abbr: " + outAbbr + " docID: " + docID[i] + " desc: " + date[i] + " amgross: " + amgross[i] + " curr: " + curr[i] + "\n");
        //console.log("count: " + inCount);
        i++;
    }))
    inCount = i;
}
async function CallAPIsec(url) {
    let response = await fetch(url);
    let object = await response.json();
    console.log("url: " + url + "\nresponse: " + response + "\nobject: " + object);
    subdata = object.Items;
}
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
        //inStartDate = document.getElementById('inDateFrom').value;
        //inEndDate = document.getElementById('inDateTo').value;
        //inCount = document.getElementById('inCount').value;
        let gigachad = urlMain + inTPID;
        console.log(gigachad);
        CallAPI(gigachad);
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
            //tableCol.appendChild(document.createTextNode(i + " " + j));
            switch (j) {
                case 0:
                    tableCol.appendChild(document.createTextNode(docID[i]));
                    break;
                case 1:
                    tableCol.appendChild(document.createTextNode(date[i]));
                    break;
                case 2:
                    tableCol.appendChild(document.createTextNode(amgross[i]));
                    break;
                case 3:
                    tableCol.appendChild(document.createTextNode(curr[i]));
                    break;
            }
            //tableCol.appendChild(document.createTextNode(data));
        }
    }
}
// Updating data
function PrintTPinfo() {
    document.getElementById('outTPID').innerHTML = "ID: " + outTPID;
    document.getElementById('outName').innerHTML = "Name: " + outName;
    document.getElementById('outAbbr').innerHTML = "Abbreviation: " + outAbbr;
    document.getElementById('outAdd').innerHTML = "Address: " + outAdd;
}

// BRAZIL
/*
async function callAPI2() {
    (async () => {
        let response = await fetch(urlMain);
        let object = await response.json();
        //object.map(x =>{
        //}) // Tohle je od Martina
        //console.log(object);
        alert(object);
        return object;
    })();
}

 */