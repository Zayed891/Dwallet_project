import { useState, useEffect } from "react";
import "./Main.css";

function Accounts({ web3, setAddress }) {
  const [provider, setProvider] = useState("None");
  const [balance, setBalance] = useState("None");
  const [account, setAccount] = useState("None");
  useEffect(() => {
    async function allAccounts() {
      const select = document.querySelector("#selectNumber");
      try {
        const options = await web3.eth.getAccounts();
        setProvider("Genache");
        for (let i = 0; i < options.length; i++) {
          let opt = options[i];
          const element = document.createElement("option");
          element.textContent = opt;
          element.value = opt;
          select.appendChild(element);
        }
      } catch (error) {
        setProvider("not connected");
      }
    }
    web3 && allAccounts();
  }, [web3]);

  async function selectAccount() {
    let selectedAccount = document.querySelector("#selectNumber").value;
    if (selectedAccount && selectedAccount != "Select an account") {
      setAddress(selectedAccount);
      let accountBalance = await web3.eth.getBalance(selectedAccount);
      const etherBalance = web3.utils.fromWei(accountBalance, "ether");
      setBalance(etherBalance);
      setAccount(selectedAccount);
    }
  }

  return (
    <>
      <form className="label1" id="myForm">
        <label htmlFor="selectNumber">Select an account</label>
        <select className="innerBox" id="selectNumber" onChange={selectAccount}>
          <option value="">Select an account</option>
        </select>
      </form>
      <span className="conAc">Connected Account: {account}</span>
      <br></br>
      <span className="acBal">Account Balance: {balance}</span>
      <br></br>
      <span className="provider">Provider : {provider}</span>
    </>
  );
}

export default Accounts;
