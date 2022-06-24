const emptyOptionStrig = '<option value="-1">Select cryptocurrency</option>';

const baseAssetSelect = document.getElementById('baseAssetSelect');
const quoteAssetSelect = document.getElementById('quoteAssetSelect');
const resultsTable = document.getElementById('resultsTable');


fetch('https://api.binance.com/api/v1/exchangeInfo')
.then(res => res.json())
.then(data =>{
  
  const assetsPairs = new Object();

  data.symbols.forEach(s=>{
    if (assetsPairs[s.baseAsset]==null)assetsPairs[s.baseAsset]=[];
    assetsPairs[s.baseAsset].push(s.quoteAsset);
  });
  Object.keys(assetsPairs).forEach(bAsset=>{
    const option = document.createElement('option');
    option.innerText = bAsset;
    baseAssetSelect.appendChild(option);
  })
  baseAssetSelect.onchange= ()=>{
    quoteAssetSelect.innerHTML = emptyOptionStrig;

    const selectedBaseAsset = baseAssetSelect.selectedOptions[0].innerText;
    assetsPairs[selectedBaseAsset].forEach(qAsset=>{
      const option = document.createElement('option');
      option.innerText = qAsset;
      quoteAssetSelect.appendChild(option);
    })
  }


})
.catch(err => console.error(err))


quoteAssetSelect.onchange = ()=>{
  const baseAsset = baseAssetSelect.selectedOptions[0].innerText;
  const quoteAsset = quoteAssetSelect.selectedOptions[0].innerText;

  fetch('https://api.binance.com/api/v3/ticker/24hr?symbol='+baseAsset+quoteAsset)
  .then(res=>res.json())
  .then(data => {
    console.log(resultsTable.getElementsByTagName('tbody')[0])
    const tableBody = resultsTable.getElementsByTagName('tbody')[0];
    tableBody.innerHTML = "";
  
    const appendRow = (name,value)=>{
      const varCol = document.createElement("td");
      varCol.innerText = name;
      const valueCol = document.createElement("td");
      valueCol.innerText = value;
      
      const row = document.createElement('tr');
      row.appendChild(varCol);
      row.appendChild(valueCol);

      tableBody.appendChild(row);

    }
    console.log(data);
    appendRow("Open price" ,data.prevClosePrice);
    appendRow("Actaul price" ,data.lastPrice);
    appendRow("Change" ,data.priceChange);
    appendRow("Percentual change" ,data.priceChangePercent);

  })
}
