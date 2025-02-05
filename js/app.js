const apikey = "a580ae87b0018e835b6f06de";

const dropList = document.querySelectorAll(".drop-list select");
const nationalFlag = document.querySelectorAll(".select-box img");
const amountInput = document.querySelector(".amount input");
const fromCurrency = document.querySelector(".from select");
const toCurrency = document.querySelector(".to select");
const exchangeRateResult = document.querySelector(".exchange-rate");
const exchangeIconBtn = document.querySelector(".icon i");
const exchangeRateBtn = document.querySelector("form button");

for (let i = 0; i < dropList.length; i++) {
  for (currencyCode in countryList) {
    // 默認從USD中轉換到TWD
    let selected;
    if (i == 0) {
      selected = currencyCode == "USD" ? "selected" : "";
    } else if (i == 1) {
      selected = currencyCode == "TWD" ? "selected" : "";
    }

    // 渲染所有國家貨幣至select中
    let optionTag = `<option value="${currencyCode}" ${selected}>${currencyCode}</option>`;
    dropList[i].insertAdjacentHTML("beforeend", optionTag);
  }

  // 監聽更改select變更並切換國旗
  dropList[i].addEventListener("change", function () {
    let selectedCurrency = this.value;
    nationalFlag[
      i
    ].src = `https://flagsapi.com/${countryList[selectedCurrency]}/flat/64.png`;
  });
}

// 計算匯率
const getExchangeRate = async () => {
  // 取得使用者輸入金額
  let amoust = Number(amountInput.value);

  // 避免輸入空值或者0
  if (amoust == "" || amoust == "0") {
    amountInput.value = 1;
    amoust = 1;
  }

  // 讀取等待訊息
  exchangeRateResult.textContent = "Getting exchange rate…";

  const apiURL = `https://v6.exchangerate-api.com/v6/${apikey}/latest/${fromCurrency.value}`;

  try {
    const response = await fetch(apiURL);
    if (!response.ok) throw new Error(`HTTP 錯誤！狀態碼: ${response.status}`);

    // 取得轉換匯率結果
    const data = await response.json();
    let exchangeRate = data.conversion_rates[`${toCurrency.value}`];

    // 計算轉換後的金額
    let convertedAmount = (amoust * exchangeRate).toFixed(2);

    // 渲染結果到畫面上
    exchangeRateResult.textContent = `${amoust} ${fromCurrency.value} = ${convertedAmount} ${toCurrency.value}`;
  } catch (err) {
    console.error(`錯誤: ${err.message}`);
  }
};

// 兩邊交換
exchangeIconBtn.addEventListener("click", () => {
  // 交換fromCurrency和toCurrency的value
  const temp = fromCurrency.value;
  fromCurrency.value = toCurrency.value;
  toCurrency.value = temp;

  // 同步更新國旗
  nationalFlag[0].src = `https://flagsapi.com/${
    countryList[fromCurrency.value]
  }/flat/64.png`;

  nationalFlag[1].src = `https://flagsapi.com/${
    countryList[toCurrency.value]
  }/flat/64.png`;

  // 重新計算
  getExchangeRate();
});

exchangeRateBtn.addEventListener("click", (e) => {
  // 防止表單提交
  e.preventDefault();
  getExchangeRate();
});
