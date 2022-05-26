// API urls
let urlBase = "https://k2demo.abis.cz:44302/V22K2_API_DEMO/Data/TInvoiceOutDM?fields=TradingPartnerId,DocumentIdentificationCalc,AmountGrossC,Currency&conditions=TradingPartnerId;EQ;";
// Table values
const headers = ["Document ID", "Date", "Amount Gross", "Currency", "Download"];
let docID = [], date = [], amgross = [], curr = [], rid = [];
let cols = 5;
// Access to HTML elements
const form = document.getElementById('inputForm');
const actionButtons = document.getElementsByClassName('action-button');
const buttons = document.getElementsByTagName("button");
// Input verification messages
const ID_INVALID = "Invalid Trading Partner ID";
const DATE_INVALID = "Invalid date";
// Input and output variables
let inTPID, inStartDate, inEndDate, inCount;
let outTPID, outName, outAbbr, outAdd;
// Function for communicating with API
async function CallAPI(url) {
    let response = await fetch(url);
    let object = await response.json();
    let i = 0;
    object = object.Items;
    await Promise.all(object.map( async (x) =>{
        let partnerUrl = x.FieldValues[3].Value.ItemURL;
        let subresponse_partner = await fetch(partnerUrl);
        let subobject_partner = await subresponse_partner.json();
        outName = subobject_partner.FieldValues[3].Value;
        outAbbr = x.FieldValues[3].Value.FieldValues[0].Value;
        outTPID = subobject_partner.FieldValues[5].Value;
        docID[i] = x.FieldValues[1].Value;
        date[i] = x.FieldValues[4].Value;
        amgross[i] = x.FieldValues[0].Value;
        curr[i] = x.FieldValues[2].Value.FieldValues[1].Value;
        i++;
    }))
    inCount = i;
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
        let gigachad = urlBase + inTPID;
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
                case 4:
                    let icon = document.createElement('icon');
                    let btnDown = document.createElement('button');
                    btnDown.appendChild(icon);
                    tableCol.appendChild(btnDown);
                    icon.classList.add("fa", "fa-download");
                    btnDown.style.width = '100%';
                    btnDown.style.height = '100%';
                    btnDown.addEventListener('click', () => {
                        let urlDown = "https://k2demo.abis.cz:44302/V22K2_API_DEMO/Formation/download/Special/CreatePDF/PAS?InvoiceOutRID=" + docID[i];
                        window.open(urlDown);
                    })
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


for (const button of buttons) {
    button.addEventListener("click", createRipple);
}
function createRipple(event) {
    const button = event.currentTarget;

    const circle = document.createElement("span");
    const diameter = Math.max(button.clientWidth, button.clientHeight);
    const radius = diameter / 2;

    circle.style.width = circle.style.height = `${diameter}px`;
    circle.style.left = `${event.clientX - button.offsetLeft - radius}px`;
    circle.style.top = `${event.clientY - button.offsetTop - radius}px`;
    circle.classList.add("ripple");

    const ripple = button.getElementsByClassName("ripple")[0];

    if (ripple) {
        ripple.remove();
    }

    button.appendChild(circle);
}



// BRAZIL
/*
async function callAPI2() {
    (async () => {
        let response = await fetch(urlBase);
        let object = await response.json();
        //object.map(x =>{
        //}) // Tohle je od Martina
        //console.log(object);
        alert(object);
        return object;
    })();
}

 */