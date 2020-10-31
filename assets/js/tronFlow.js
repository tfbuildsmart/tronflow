const abi = [
  {
    outputs: [{ type: "uint256" }],
    constant: true,
    name: "devCommission",
    stateMutability: "View",
    type: "Function",
  },
  { name: "withdraw", stateMutability: "Nonpayable", type: "Function" },
  {
    outputs: [{ type: "uint256" }],
    constant: true,
    name: "totalPayout",
    stateMutability: "View",
    type: "Function",
  },
  {
    outputs: [{ type: "uint256" }],
    constant: true,
    name: "commissionDivisor",
    stateMutability: "View",
    type: "Function",
  },
  {
    outputs: [{ type: "uint256" }],
    constant: true,
    name: "totalInvested",
    stateMutability: "View",
    type: "Function",
  },
  {
    outputs: [{ type: "uint256" }],
    constant: true,
    name: "totalReinvest",
    stateMutability: "View",
    type: "Function",
  },
  {
    outputs: [{ type: "uint256" }],
    constant: true,
    name: "getvel",
    stateMutability: "View",
    type: "Function",
  },
  {
    outputs: [{ type: "uint256" }],
    constant: true,
    inputs: [{ name: "_addr", type: "address" }],
    name: "getProfit",
    stateMutability: "View",
    type: "Function",
  },
  {
    outputs: [
      { name: "trxDeposit", type: "uint256" },
      { name: "time", type: "uint256" },
      { name: "interestProfit", type: "uint256" },
      { name: "affRewards", type: "uint256" },
      { name: "payoutSum", type: "uint256" },
      { name: "affFrom", type: "address" },
      { name: "aff1sum", type: "uint256" },
      { name: "aff2sum", type: "uint256" },
      { name: "aff3sum", type: "uint256" },
      { name: "aff4sum", type: "uint256" },
      { name: "aff5sum", type: "uint256" },
      { name: "aff6sum", type: "uint256" },
      { name: "aff7sum", type: "uint256" },
      { name: "aff8sum", type: "uint256" },
    ],
    constant: true,
    inputs: [{ type: "address" }],
    name: "players",
    stateMutability: "View",
    type: "Function",
  },
  {
    payable: true,
    inputs: [{ name: "_affAddr", type: "address" }],
    name: "deposit",
    stateMutability: "Payable",
    type: "Function",
  },
  {
    outputs: [{ type: "uint256" }],
    constant: true,
    name: "totalPlayers",
    stateMutability: "View",
    type: "Function",
  },
  { name: "reinvest", stateMutability: "Nonpayable", type: "Function" },
  {
    outputs: [{ type: "uint256" }],
    constant: true,
    name: "activedeposits",
    stateMutability: "View",
    type: "Function",
  },
  {
    outputs: [{ type: "uint256" }],
    constant: true,
    name: "getContractBalanceRate",
    stateMutability: "View",
    type: "Function",
  },
  {
    inputs: [
      { name: "_marketingAddr", type: "address" },
      { name: "_projectAddr", type: "address" },
    ],
    stateMutability: "Nonpayable",
    type: "Constructor",
  },
  { payable: true, stateMutability: "Payable", type: "Fallback" },
  {
    inputs: [
      { indexed: true, name: "user", type: "address" },
      { indexed: true, name: "_referrer", type: "address" },
      { name: "_time", type: "uint256" },
    ],
    name: "Newbie",
    type: "Event",
  },
  {
    inputs: [
      { indexed: true, name: "user", type: "address" },
      { name: "amount", type: "uint256" },
      { name: "_time", type: "uint256" },
    ],
    name: "NewDeposit",
    type: "Event",
  },
  {
    inputs: [
      { indexed: true, name: "user", type: "address" },
      { name: "amount", type: "uint256" },
      { name: "_time", type: "uint256" },
    ],
    name: "Withdrawn",
    type: "Event",
  },
  {
    inputs: [
      { indexed: true, name: "referrer", type: "address" },
      { indexed: true, name: "referral", type: "address" },
      { indexed: true, name: "level", type: "uint256" },
      { name: "amount", type: "uint256" },
      { name: "_time", type: "uint256" },
    ],
    name: "RefBonus",
    type: "Event",
  },
  {
    inputs: [
      { indexed: true, name: "user", type: "address" },
      { name: "amount", type: "uint256" },
      { name: "_time", type: "uint256" },
    ],
    name: "Reinvest",
    type: "Event",
  },
];
let currentAccount;
let lastTransactionTime;
//const contractAddress = "TRktZxNpTmbFEchoQtj8U5fpk9Xn42ZnkQ";
 const contractAddress = "TFrBVjdpsuWQUMtjFpMxhUKg2q3oa6rgGv";

window.addEventListener("message", (e) => {
  console.log(e);

  if (e.data?.message?.action == "tabReply") {
    console.warn("tabReply event", e.data.message);
    if (e.data?.message?.data?.data?.node?.chain == "_") {
      console.info("tronLink currently selects the main chain");
    } else {
      console.info("tronLink currently selects the side chain");
    }
  }

  if (e.data?.message?.action == "setAccount") {
    console.warn("setAccount event", e.data.message);
    console.info("current address:", e.data.message.data.address);
  }
  if (e.data?.message?.action == "setNode") {
    console.warn("setNode event", e.data.message);
    if (e.data?.message?.data?.data?.node?.chain == "_") {
      console.info("tronLink currently selects the main chain");
    } else {
      console.info("tronLink currently selects the side chain");
    }
  }
});

/**
 *
 */
$(document).ready(async () => {
  const url = new URL(window.location);
  const params = new URLSearchParams(url.search);
  if (params.has("ref")) {
    $("#refererAddress").val(params.get("ref"));
  }

  var checkConnectivity = setInterval(async () => {
    if (window.tronWeb && window.tronWeb.defaultAddress.base58) {
      clearInterval(checkConnectivity);
      showPopup("Connected to Tron LINK.", "success");

      const tronWeb = window.tronWeb;
      currentAccount = tronWeb.defaultAddress.base58;
      $("#accountRef").val(window.location.hostname + "?ref=" + currentAccount);
      $("#address").text(currentAccount);

      let contract = await tronWeb.contract().at(contractAddress);

      getTotalInvested(contract);
      getTotalInvestors(contract);
      getContractBalanceRate(contract);
      getDeposit(contract);
      getProfit(contract);

      getBalanceOfAccount();
    }
  }, 10);
});
//----------------//
async function getBalanceOfAccount() {
  return tronWeb.trx.getBalance(currentAccount).then((res) => {
    const balance = parseInt(res / 1000000);
    if (balance) {
      $("#getBalance").text(balance);
    } else {
      $("#getBalance").text(0);
    }
    return balance;
  });
}
async function deposit() {
  // TTDKQAFBuRg52wC6dtrnnMti7HTNjqCo1v
  let address = $("#refererAddress").val();
  let amount = $("#depositAmount").val();
  if (address.length < 10) {
    showPopup("Please Enter Right Address", "error");
  } else if (amount < 50) {
    showPopup("Minimum Amount is 50 TRX", "error");
  } else {
    if (window.tronWeb) {
      let contract = await tronWeb.contract().at(contractAddress);
      contract
        .deposit(address)
        .send({
          callValue: tronWeb.toSun(amount),
        })
        .then((output) => {
          // var newBalance = setInterval(async () => {
          //   const newBal = getBalanceOfAccount();
          //   console.log(newBal);
          // }, 1000);
          console.info("Hash ID:", output, "\n");
          showPopup("Deposit Successful", "success");
        });
    } else {
      showPopup("TronWeb is not Connected", "error");
    }
  }
}
//withDraw your fund!
async function withdraw() {
  if (window.tronWeb) {
    let contract = await tronWeb.contract().at(contractAddress);
    await contract
      .withdraw()
      .send()
      .then((output) => {
        getBalanceOfAccount();
        console.info("HashId:" + " " + output);
        showPopup("Withdraw Successful", "success");
      });
  } else {
    showPopup("TronWeb is not Connected", "error");
  }
}
//reinvest your fund!
async function reinvest() {
  if (window.tronWeb) {
    let contract = await tronWeb.contract().at(contractAddress);
    await contract
      .reinvest()
      .send()
      .then((output) => {
        // var newBalance = setInterval(async () => {
        //   const newBal = await getBalanceOfAccount();
        //   console.log(newBal);

        //   setTimeout(() => {
        //     clearInterval(newBalance);
        //   }, 60 * 1000);
        // }, 100);
        console.info("HashId:" + " " + output);
        showPopup("Reinvest Successful", "success");
      });
  } else {
    showPopup("TronWeb is not Connected", "error");
  }
}

/**
 * get total Invested
 * @param {*} contract
 */
async function getTotalInvested(contract) {
  let totalinvested = await contract.totalInvested().call();
  $("#totalInvested").text(totalinvested.toNumber() / 1000000);
}

/**
 * get total Investors
 * @param {*} contract
 */
async function getTotalInvestors(contract) {
  let totalInvestors = await contract.totalPlayers().call();
  $("#totalInvestors").text(totalInvestors.toNumber());
}

/**
 * get Contract Balance Rate
 * @param {*} contract
 */
async function getContractBalanceRate(contract) {
  let contractbalanceRate = await contract.getContractBalanceRate().call();
  $("#roi").text(contractbalanceRate.toNumber() / 10 + 1);
}

/**
 * get Deposit
 * @param {*} contract
 */
async function getDeposit(contract) {
  let invester = await contract.players(currentAccount).call();
  $("#actualCapital").val(invester.trxDeposit.toNumber() / 2);
}

/**
 *
 * @param {*} contract
 */
async function getProfit(contract) {
  let profit = await contract.getProfit(currentAccount).call();
  const halfProfit = profit.toNumber() / 2;
  $("#withdrawableAmount").val(halfProfit);
  $(".deduction").text(halfProfit);
  $("#withdrawableInterest").val(halfProfit);
  $("#totalWithdrawable").val(profit.toNumber());
  $("#invested").text(profit.toNumber());
  $("#withdrawal").text(halfProfit / 2);
  $("#reinvest-new-balance").text(
    parseInt($("#actualCapital").val()) + halfProfit
  );
  $("#withdrawal-new-balance").text(
    parseInt($("#actualCapital").val()) + halfProfit
  );
}

/**
 * show Popup
 * @param {*} error
 */
function showPopup(msg, type) {
  $(`#popup-${type}-msg`).html(msg);

  $(".popup").removeClass("show");

  $(`.${type}-popover`).addClass("show");
  window.setTimeout(() => {
    $(`.${type}-popover`).removeClass("show");
  }, 3 * 1000);
}
