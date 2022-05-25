let urlMain = "https://k2demo.abis.cz:44302/V22K2_API_DEMO/Data/TInvoiceOutDM?fields=TradingPartnerId,DocumentIdentificationCalc,AmountGrossC,Currency&conditions=TradingPartnerId;EQ;21";
let id;
let abbr;
let name;
let address;

async function callApi() {
    const request = new Request(urlMain);

    const response = await fetch(request);
    const object = await response.json();

    object.map(x =>{

    id = x.FieldValues[6].Value;

    })


    populate(object);
    console.log(object);
}

// random řádek [insert js code]

function populate(obj) {


    //Tady bude kód, který vypíše hodnoty z API do UI

    const myPara = document.createElement('p');



    //myPara.textContent = `Hometown: ${obj['homeTown']} // Formed: ${obj['formed']}`;
    //header.appendChild(myPara);


}

/* Uložím si sem
    (async () => {
        let response = await fetch(urlMain);
        let user = await response.json();



        console.log(items);

        }

    )

     */





/*function populateHeader(obj) {
    const header = document.querySelector('header');
    const myH1 = document.createElement('h1');
    myH1.textContent = obj['partner'];
    header.appendChild(myH1);

    const myPara = document.createElement('p');
    myPara.textContent = `Hometown: ${obj['homeTown']} // Formed: ${obj['formed']}`;
    header.appendChild(myPara);
}

function populateHeroes(obj) {
    const section = document.querySelector('section');
    const heroes = obj['members'];

    for (const hero of heroes) {
        const myArticle = document.createElement('article');
        const myH2 = document.createElement('h2');
        const myPara1 = document.createElement('p');
        const myPara2 = document.createElement('p');
        const myPara3 = document.createElement('p');
        const myList = document.createElement('ul');

        myH2.textContent = hero.name;
        myPara1.textContent = `Secret identity: ${hero.secretIdentity}`;
        myPara2.textContent = `Age: ${hero.age}`;
        myPara3.textContent = 'Superpowers:';

        const superPowers = hero.powers;
        for (const power of superPowers) {
            const listItem = document.createElement('li');
            listItem.textContent = power;
            myList.appendChild(listItem);
        }

        myArticle.appendChild(myH2);
        myArticle.appendChild(myPara1);
        myArticle.appendChild(myPara2);
        myArticle.appendChild(myPara3);
        myArticle.appendChild(myList);

        section.appendChild(myArticle);
    }
}*/

async function populate() {

    const requestURL = 'https://k2demo.abis.cz:44302/V22K2_API_DEMO/Data/TInvoiceOutDM?fields=TradingPartnerId,DocumentIdentificationCalc,AmountGrossC,Currency&conditions=TradingPartnerId;EQ;21';
    const request = new Request(requestURL);

    const response = await fetch(request);
    const partners = await response.json();

    populateHeader(partners);
    populateHeroes(partners);

}

function populateHeader(obj) {
    const header = document.querySelector('header');
    const myH1 = document.createElement('h1');
    myH1.textContent = obj['partnerName'];
    header.appendChild(myH1);

    const myPara = document.createElement('p');
    myPara.textContent = `Partner: ${obj['']} // Formed: ${obj['formed']}`;
    header.appendChild(myPara);
}






