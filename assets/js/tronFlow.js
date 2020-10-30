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
let connection;
let currentAccount;
const contractAddress = "TRktZxNpTmbFEchoQtj8U5fpk9Xn42ZnkQ";

window.addEventListener("message", (e) => {
  checkConnection(e);
});

// ---------------//
async function checkConnection(e) {
  if (window.tronWeb?.defaultAddress?.base58) {
    showPopup("Connected to Tron LINK.");

    currentAccount = window.tronWeb.defaultAddress.base58;
    $(document).ready(async function () {
      document.getElementById("accoutRef").value =
        window.location.hostname + "?ref=" + currentAccount;

      let contract = await tronWeb.contract().at(contractAddress);

      getTotalInvested(contract);
      getTotalInvestors(contract);
      getContractBalanceRate(contract);
      getDeposit(contract);
      getProfit(contract);

      getBalanceOfAccount();
    });
  } else {
    showPopup("Tron LINK is not available");
  }

  if (e.data.message && e.data.message.action == "setNode") {
    console.log("setNode event", e.data.message);
    if (e.data.message.data.node.chain == "_") {
      console.log("tronLink currently selects the main chain");
    } else {
      console.log("tronLink currently selects the side chain");
    }
  }
}
//----------------//
// async function isLocked() {
//   if (window.tronWeb.defaultAddress.base58 == null) {
//     console.log(err);
//     jQuery("#lock").text(err);
//   } else if (window.tronWeb.defaultAddress.base58 === 0) {
//     jQuery("#lock").text("TRON LINK is locked.");
//   } else {
//     jQuery("#lock").text("TRON LINK is unlocked.");
//   }
// }
//----------------//
async function getBalanceOfAccount() {
  tronWeb.trx.getBalance(currentAccount, function (err, res) {
    const balance = parseInt(res / 1000000);
    if (balance) {
      jQuery("#getBalance").text(balance);
    } else {
      jQuery("#getBalance").text(0);
    }
  });
}
async function deposit() {
  // TTDKQAFBuRg52wC6dtrnnMti7HTNjqCo1v
  let address = jQuery("#reffererAddress").val();
  let amount = jQuery("#depositamount").val();
  if (address.length < 10) {
    showPopup("Please Enter Right Address");
  } else if (amount < 50) {
    showPopup("Minimum Amount is 50 TRX");
  } else {
    let contract = await tronWeb.contract().at(contractAddress);
    contract
      .deposit(address)
      .send({
        callValue: tronWeb.toSun(amount),
      })
      .then((output) => {
        console.log("Hash ID:", output, "\n");
      });
  }
}
//withDraw your fund!
async function withdraw() {
  let contract = await tronWeb.contract().at(contractAddress);
  await contract
    .withdraw()
    .send()
    .then((output) => {
      console.log("HashId:" + " " + output);
    });
}
//reinvest your fund!
async function reinvest() {
  let contract = await tronWeb.contract().at(contractAddress);
  await contract
    .reinvest()
    .send()
    .then((output) => {
      console.log("HashId:" + " " + output);
    });
}

/**
 * get total Invested
 * @param {*} contract
 */
async function getTotalInvested(contract) {
  let totalinvested = await contract.totalInvested().call();
  jQuery("#totalInvested").text(totalinvested.toNumber() / 1000000);
}

/**
 * get total Investors
 * @param {*} contract
 */
async function getTotalInvestors(contract) {
  let totalInvestors = await contract.totalPlayers().call();
  jQuery("#totalInvestors").text(totalInvestors.toNumber());
}

/**
 * get Contract Balance Rate
 * @param {*} contract
 */
async function getContractBalanceRate(contract) {
  let contractbalanceRate = await contract.getContractBalanceRate().call();
  jQuery("#roi").text(contractbalanceRate.toNumber() / 10 + 1);
}

/**
 * get Deposit
 * @param {*} contract
 */
async function getDeposit(contract) {
  let invester = await contract.players(currentAccount).call();
  document.getElementById("actualCapital").value =
    invester.trxDeposit.toNumber() / 2;
}

/**
 *
 * @param {*} contract
 */
async function getProfit(contract) {
  let profit = await contract.getProfit(currentAccount).call();
  const halfProfit = profit.toNumber() / 2;
  document.getElementById("withdrawableAmount").value = halfProfit;
  jQuery(".deduction").text(halfProfit);
  document.getElementById("withdrawableInterest").value = halfProfit;
  document.getElementById("totalWithdrawable").value = profit.toNumber();
  jQuery("#invested").text(profit.toNumber());
  jQuery("#withdrawal").text(halfProfit / 2);
  jQuery("#reinvest-new-balance").text(
    parseInt(document.getElementById("actualCapital").value) + halfProfit
  );
  jQuery("#withdrawal-new-balance").text(
    parseInt(document.getElementById("actualCapital").value) + halfProfit
  );
}

/**
 * show Popup
 * @param {*} error
 */
function showPopup(error) {
  $("#popup-error-msg").html(error);

  $(".error-popover").toggleClass("show");
  window.setTimeout(function () {
    $(".error-popover").toggleClass("show");
  }, 5000);
}

$("#reinvestModal").on("show.bs.modal", function (e) {});
