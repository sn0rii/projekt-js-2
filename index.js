const rates = {};
const ratesUrl = "https://api.nbp.pl/api/exchangerates/tables/c/";
const select = document.querySelector(".select");
const form = document.querySelector(".form");
const input = document.querySelector(".input");
const result = document.querySelector(".result");
const loader = document.getElementById("loading");

// POBIERANIE DANYCH

async function getRates() {
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
  } catch (error) {
    alert("Problem z pobieraniem danych spróbuj ponownie!");
    console.log(error);
  } finally {
    hideLoading();
  }
}

// PRZELICZANIE DANYCH

function calculateResult() {
  const selectedCode = select.value;
  const selectedRate = rates[selectedCode];
  const inputValue = parseFloat(input.value);

  if (selectedRate) {
    const convertedValue = inputValue * selectedRate.bid;
    result.textContent = ` TO:  ${convertedValue.toFixed(2)} PLN`;
  } else {
    alert("Coś poszło nie tak.");
  }
}

// SUBMIT ORAZ SPRAWDZANIE WARTOSCI

form.addEventListener("submit", function (e) {
  e.preventDefault();
  const value = parseFloat(input.value);
  if (!isNaN(value) && value > 0) {
    getRates(e);
  } else {
    alert("Podaj właściwą wartość.");
  }
});

// LOADER

function displayLoading() {
  loader.classList.add("display");
}

function hideLoading() {
  loader.classList.remove("display");
}
