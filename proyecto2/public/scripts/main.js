const emptyOptionStrig = '<option value="-1">Select cryptocurrency</option>';

const baseAssetSelect = document.getElementById('baseAssetSelect');
const quoteAssetSelect = document.getElementById('quoteAssetSelect');
const timeframeSelect = document.getElementById('timeframeSelect');
const zoomSlider = document.getElementById('zoom');

let ableToDraw = false;
let globalPriceData =[];
let numItems = zoomSlider.value;

fetch('https://api.binance.com/api/v1/exchangeInfo')
  .then(res => res.json())
  .then(data => {

    const assetsPairs = new Object();

    console.log(data);
    data.symbols.forEach(s => {
      if (assetsPairs[s.baseAsset] == null) assetsPairs[s.baseAsset] = [];
      assetsPairs[s.baseAsset].push(s.quoteAsset);
    });
    Object.keys(assetsPairs).forEach(bAsset => {
      const option = document.createElement('option');
      option.innerText = bAsset;
      baseAssetSelect.appendChild(option);
    })
    baseAssetSelect.onchange = () => {
      ableToDraw = false;
      quoteAssetSelect.innerHTML = emptyOptionStrig;

      const selectedBaseAsset = baseAssetSelect.selectedOptions[0].innerText;
      assetsPairs[selectedBaseAsset].forEach(qAsset => {
        const option = document.createElement('option');
        option.innerText = qAsset;
        quoteAssetSelect.appendChild(option);
      })
    }


  })
  .catch(err => console.error(err))


quoteAssetSelect.onchange = () => {
  ableToDraw = true;
  const baseAsset = baseAssetSelect.selectedOptions[0].innerText;
  const quoteAsset = quoteAssetSelect.selectedOptions[0].innerText;
  const timeframe = timeframeSelect.selectedOptions[0].getAttribute("value")

  fetch("https://api.binance.com/api/v3/klines?symbol=" + baseAsset + quoteAsset + "&interval="+timeframe+"&limit="+numItems)
    .then(res => res.json())
    .then(data => {
      const parsedData = data.map(d => {
        return {
          date: new Date(d[0]),
          open: parseFloat(d[1]),
          high: parseFloat(d[2]),
          low: parseFloat(d[3]),
          close: parseFloat(d[4]),
          volume: parseFloat(d[5])
        }
      });
      parsedData.columns = ["Data", "Open", "High", "Low", "Close", "Volume"];
      // parsedData.sort(function (a, b) {return d3.ascending(accessor.d(a), accessor.d(b));});

      globalPriceData=parsedData;
      // console.log(parsedData);
      draw(parsedData)

    })
    .catch(err => console.error(err))
}

timeframeSelect.onchange = ()=>{
  if (ableToDraw) quoteAssetSelect.onchange();
}

zoomSlider.oninput = ()=>{
  numItems = zoomSlider.value;
  if (ableToDraw) quoteAssetSelect.onchange();
}
