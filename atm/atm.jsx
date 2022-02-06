const ATMDeposit = ({ onChange, isDeposit, isValid, error }) => {
    const choice = ['Deposit', 'Cash Back'];
    console.log(`ATM isDeposit: ${isDeposit}`);
    return (
      <label className="label huge">
        <h3> {choice[Number(!isDeposit)]}</h3>
        <input id="number-input" type="number" width="200" onChange={onChange} placeholder="$"></input>
        <input type="submit" disabled={!isValid} width="200" value="Submit" id="submit-input"></input>
        {!isValid && <div> {error} </div>}
      </label>
    );
  };
  
  const Account = () => {
    const [deposit, setDeposit] = React.useState(0);
    const [totalState, setTotalState] = React.useState(0);
    const [isDeposit, setIsDeposit] = React.useState(true);
    const [atmMode, setAtmMode] = React.useState("");
    const [validTransaction, setValidTransaction] = React.useState(false);
    const [error, setError] = React.useState("");
  
    let status = `Account Balance $ ${totalState} `;
    const handleChange = (event) => {
    console.log(`handleChange ${event.target.value}`);
      if (Number(event.target.value) <= 0) {
        return setValidTransaction(false);
      }
      if (atmMode === "Cash Back" && Number(event.target.value) > totalState) {
        setValidTransaction(false);
        setError ("Sorry, You're Broke.");
      } else {
        setValidTransaction(true);
      }
      setDeposit(Number(event.target.value));
  
    };
    const handleSubmit = (event) => {
      let newTotal = isDeposit ? totalState + deposit : totalState - deposit;
      setTotalState(newTotal);
      setValidTransaction(false);
      event.preventDefault();
    };
  
    const handleModeSelect = (event) => {
      setError("");
      setAtmMode(event.target.value);
      setValidTransaction(false);
      if (event.target.value === 'Deposit'){
        setIsDeposit(true);
       } else {
        setIsDeposit(false);
       }
    };
  
    return (
      <form onSubmit={handleSubmit}>
      <div className="body">
        <h2 id="total">{status}</h2>
          <select onChange={(e) => handleModeSelect(e)} name="mode" id="mode-select">
            <option id="no-selection" value="">Select Action</option>
            <option id="deposit-selection" value="Deposit">Deposit</option>
            <option id="cashback-selection" value="Cash Back">Cash Back</option>
        </select>
        {atmMode && (
          <ATMDeposit
            onChange={handleChange}
            isDeposit={isDeposit}
            isValid={validTransaction}
            error={error}
            ></ATMDeposit>
        )}
        </div>
      </form>
    );
  };
  // ========================================
  ReactDOM.render(<Account />, document.getElementById('root'));
  