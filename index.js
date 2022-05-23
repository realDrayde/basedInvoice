let urlMain = "https://k2demo.abis.cz:44302/V22K2_API_DEMO/Data/TInvoiceOutDM?fields=TradingPartnerId,DocumentIdentificationCalc,AmountGrossC,Currency&conditions=TradingPartnerId;EQ;21";


async function callApiMain()
{
    (async () => {
        let response = await fetch(urlMain);
        let user = await response.json();
        subTypes = user.MovementSubTypes;
        console.log(subTypes);

    })();


}