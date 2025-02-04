const dropList = document.querySelectorAll(".drop-list select");
const amountInput = document.querySelector(".amount input");
const exchangeBtn = document.querySelector("form button");

for (let i = 0; i < dropList.length; i++) {
  // 渲染所有國家貨幣至select中
  for (currencyCode in countryList) {
    let optionTag = `<option value="${currencyCode}">${currencyCode}</option>`;
    dropList[i].insertAdjacentHTML("beforeend", optionTag);
  }
}

// 金額
let amount;

const exchangeRate = () => {
  // 取得user輸入的金額
  amount = amountInput.value;
  console.log(amount);
};

exchangeBtn.addEventListener("click", exchangeRate);
