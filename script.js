const cryptoSelect = document.getElementById('crypto-select');
const currencySelect = document.getElementById('currency-select');
const resultDiv = document.getElementById('result');
const getRateBtn = document.getElementById('get-rate');

// Sample lists
const cryptocurrencies = ['bitcoin', 'ethereum', 'litecoin'];
const currencies = ['usd', 'eur', 'mxn'];

function populateSelect(selectElement, options) {
  selectElement.innerHTML = '';
  options.forEach(opt => {
    const option = document.createElement('option');
    option.value = opt;
    option.textContent = opt.toUpperCase();
    selectElement.appendChild(option);
  });
}

populateSelect(cryptoSelect, cryptocurrencies);
populateSelect(currencySelect, currencies);

getRateBtn.addEventListener('click', async () => {
  const crypto = cryptoSelect.value;
  const currency = currencySelect.value;

  try {
    const response = await fetch(`https://api.coingecko.com/api/v3/simple/price?ids=${crypto}&vs_currencies=${currency}`);
    const data = await response.json();
    const rate = data[crypto][currency];
    resultDiv.textContent = `1 ${crypto.toUpperCase()} = ${rate} ${currency.toUpperCase()}`;
  } catch (error) {
    resultDiv.textContent = 'Error fetching exchange rate.';
    console.error(error);
  }
});