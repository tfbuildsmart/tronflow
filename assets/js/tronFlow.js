const abi =[{"outputs":[{"type":"uint256"}],"constant":true,"name":"devCommission","stateMutability":"View","type":"Function"},{"name":"withdraw","stateMutability":"Nonpayable","type":"Function"},{"outputs":[{"type":"uint256"}],"constant":true,"name":"totalPayout","stateMutability":"View","type":"Function"},{"outputs":[{"type":"uint256"}],"constant":true,"name":"commissionDivisor","stateMutability":"View","type":"Function"},{"outputs":[{"type":"uint256"}],"constant":true,"name":"totalInvested","stateMutability":"View","type":"Function"},{"outputs":[{"type":"uint256"}],"constant":true,"name":"totalReinvest","stateMutability":"View","type":"Function"},{"outputs":[{"type":"uint256"}],"constant":true,"name":"getvel","stateMutability":"View","type":"Function"},{"outputs":[{"type":"uint256"}],"constant":true,"inputs":[{"name":"_addr","type":"address"}],"name":"getProfit","stateMutability":"View","type":"Function"},{"outputs":[{"name":"trxDeposit","type":"uint256"},{"name":"time","type":"uint256"},{"name":"interestProfit","type":"uint256"},{"name":"affRewards","type":"uint256"},{"name":"payoutSum","type":"uint256"},{"name":"affFrom","type":"address"},{"name":"aff1sum","type":"uint256"},{"name":"aff2sum","type":"uint256"},{"name":"aff3sum","type":"uint256"},{"name":"aff4sum","type":"uint256"},{"name":"aff5sum","type":"uint256"},{"name":"aff6sum","type":"uint256"},{"name":"aff7sum","type":"uint256"},{"name":"aff8sum","type":"uint256"}],"constant":true,"inputs":[{"type":"address"}],"name":"players","stateMutability":"View","type":"Function"},{"payable":true,"inputs":[{"name":"_affAddr","type":"address"}],"name":"deposit","stateMutability":"Payable","type":"Function"},{"outputs":[{"type":"uint256"}],"constant":true,"name":"totalPlayers","stateMutability":"View","type":"Function"},{"name":"reinvest","stateMutability":"Nonpayable","type":"Function"},{"outputs":[{"type":"uint256"}],"constant":true,"name":"activedeposits","stateMutability":"View","type":"Function"},{"outputs":[{"type":"uint256"}],"constant":true,"name":"getContractBalanceRate","stateMutability":"View","type":"Function"},{"inputs":[{"name":"_marketingAddr","type":"address"},{"name":"_projectAddr","type":"address"}],"stateMutability":"Nonpayable","type":"Constructor"},{"payable":true,"stateMutability":"Payable","type":"Fallback"},{"inputs":[{"indexed":true,"name":"user","type":"address"},{"indexed":true,"name":"_referrer","type":"address"},{"name":"_time","type":"uint256"}],"name":"Newbie","type":"Event"},{"inputs":[{"indexed":true,"name":"user","type":"address"},{"name":"amount","type":"uint256"},{"name":"_time","type":"uint256"}],"name":"NewDeposit","type":"Event"},{"inputs":[{"indexed":true,"name":"user","type":"address"},{"name":"amount","type":"uint256"},{"name":"_time","type":"uint256"}],"name":"Withdrawn","type":"Event"},{"inputs":[{"indexed":true,"name":"referrer","type":"address"},{"indexed":true,"name":"referral","type":"address"},{"indexed":true,"name":"level","type":"uint256"},{"name":"amount","type":"uint256"},{"name":"_time","type":"uint256"}],"name":"RefBonus","type":"Event"},{"inputs":[{"indexed":true,"name":"user","type":"address"},{"name":"amount","type":"uint256"},{"name":"_time","type":"uint256"}],"name":"Reinvest","type":"Event"}]
let connection;
let mainAccount;
let contractAddress = "TRktZxNpTmbFEchoQtj8U5fpk9Xn42ZnkQ"; // Muzammmil Testing

window.addEventListener("message", (e) => {
  setInterval(async function checkConnection() {
    if (
      window.tronWeb &&
      window.tronWeb.defaultAddress &&
      window.tronWeb.defaultAddress.base58 === "undefined"
    ) {
      connection = "TROn LINK is not available";
      jQuery("#metamaskConnection").text(connection);
    } else {
      connection = "Connected to Tron LINK.";
      jQuery("#metamaskConnection").text(connection);

      mainAccount = await window.tronWeb.defaultAddress.base58;
      jQuery(document).ready(function () {
        isLocked();
        getBalanceOfAccount();
      });
    }

    if (e.data.message && e.data.message.action == "setNode") {
      console.log("setNode event", e.data.message);
      if (e.data.message.data.node.chain == "_") {
        console.log("tronLink currently selects the main chain");
      } else {
        console.log("tronLink currently selects the side chain");
      }
    }
  }, 3000);

  if (window.tronWeb && window.tronWeb.defaultAddress.base58) {
    // clearInterval(obj)
    let tronweb = window.tronWeb;
  }
});
//----------------//
async function isLocked() {
  if (window.tronWeb.defaultAddress.base58 == null) {
    console.log(err);
    jQuery("#lock").text(err);
  } else if (window.tronWeb.defaultAddress.base58 === 0) {
    jQuery("#lock").text("TRON LINK is locked.");
  } else {
    jQuery("#lock").text("TRON LINK is unlocked.");
  }
}
//----------------//
async function getBalanceOfAccount() {
  tronWeb.trx.getBalance(mainAccount, function (err, res) {
    jQuery("#getBalance").text(res / 1000000);
  });
}
async function deposit() {
  let address = jQuery("#reffererAddress").val();
  let amount = jQuery("#depositamount").val();
  if(amount<50){
    jQuery("#transferToken").text("minimm Amount is 50 TRX!");
  }else{
    let contract = await tronWeb.contract().at(contractAddress);
    contract
      .deposit(address)
      .send({
        callValue: tronWeb.toSun(amount),
      })
      .then((output) => {
        console.log("- Output:", output, "\n");
        jQuery("#transferToken").text("Hash ID:" + " " + output);
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
      jQuery("#withdraw").text("HashId:" + " " + output);
    });
}
//reinvest your fund!
async function reinvest() {
  let contract = await tronWeb.contract().at(contractAddress);
  await contract
    .reinvest()
    .send()
    .then((output) => {
      jQuery("#reinvest").text("HashId:" + " " + output);
    });
}