const rates = {};
const ratesUrl = "http://api.nbp.pl/api/exchangerates/tables/c/";
const select = document.querySelector(".select");
const btn = document.getElementById("btn");
const input = document.querySelector(".input");
const result = document.querySelector(".result");
const loader = document.getElementById("loading");

async function getRates() {
  displayLoading();
  try {
    const res = await fetch(ratesUrl);
    const data = await res.json();
    const rateList = data[0].rates;

    Object.keys(rateList).forEach((rateKey) => {
      const rate = rateList[rateKey];
      if (rate.code === "EUR" || rate.code === "USD" || rate.code === "CHF") {
        rates[rate.code] = rate;
        const option = document.createElement("option");
        option.value = rate.code;
        option.innerText = rate.code;
        select.appendChild(option);
        hideLoading();
      }
    });

    btn.addEventListener("click", calculateResult);
  } catch (error) {
    console.log(error);
  }
}

function calculateResult() {
  const selectedCode = select.value;
  const selectedRate = rates[selectedCode];
  const inputValue = parseFloat(input.value);

  if (selectedRate && !isNaN(inputValue)) {
    const convertedValue = inputValue * selectedRate.bid;
    result.textContent = ` To:  ${convertedValue.toFixed(2)} PLN`;
  } else {
    alert("Podaj właściwą wartość.");
  }
}

getRates();

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
