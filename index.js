const rates = {};
const ratesUrl = "https://api.nbp.pl/api/exchangerates/tables/c/";
const select = document.querySelector(".select");
const form = document.querySelector(".form");
const input = document.querySelector(".input");
const result = document.querySelector(".result");
const loader = document.getElementById("loading");

// POBIERANIE DANYCH

async function getRates(e) {
  e.preventDefault();

  displayLoading();
  try {
    const res = await fetch(ratesUrl);
    const data = await res.json();
    const rateList = data[0]?.rates;

    Object.keys(rateList).forEach((rateKey) => {
      const rate = rateList[rateKey];
      if (rate.code === "EUR" || rate.code === "USD" || rate.code === "CHF") {
        rates[rate.code] = rate;
      }
    });
    calculateResult();
    hideLoading();
  } catch (error) {
    alert("Problem z pobieraniem danych spróbuj ponownie!");
    console.log(error);
  } finally {
    hideLoading();
  }
}

// PRZELICZANIE DANYCH

function calculateResult(event) {
  if (event) {
    event.preventDefault();
  }

  const selectedCode = select.value;
  const selectedRate = rates[selectedCode];
  const inputValue = parseFloat(input.value);

  if (selectedRate && !isNaN(inputValue) && inputValue > 0) {
    const convertedValue = inputValue * selectedRate.bid;
    result.textContent = ` TO:  ${convertedValue.toFixed(2)} PLN`;
  } else {
    alert("Podaj właściwą wartość.");
  }
}

// document.getElementById("btn").addEventListener("click", getRates);
// form.addEventListener("submit", calculateResult);

form.addEventListener("submit", getRates);

// LOADER

function displayLoading() {
  loader.classList.add("display");
  setTimeout(() => {
    loader.classList.remove("display");
  }, 5000);
}

function hideLoading() {
  loader.classList.remove("display");
}
