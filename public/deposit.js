function Deposit() {
  const [show, setShow] = React.useState(true);
  const [status, setStatus] = React.useState('');
  const [amount, setAmount] = React.useState('');
  const ctx = React.useContext(UserContext);

  function validate(field, label) {
    if (!field) {
      setStatus('Error: ' + label);
      setTimeout(() => setStatus(''), 3000);
      return false;
    }
    return true;
  }

  function handleDeposit() {
    if (!validate(amount, 'Please enter an amount')) return;

    const newBalance = ctx.currentUser.balance + Number(amount);
    if (newBalance < 0) {
      setStatus('Error: Invalid amount');
      setTimeout(() => setStatus(''), 3000);
      return;
    }

    ctx.currentUser.balance = newBalance;
    setShow(false);
  }

  function clearForm() {
    setAmount('');
    setShow(true);
  }

  function handleChange(event) {
    const input = event.target.value.replace(/\D/g, '');
    setAmount(input);
  }

  return (
    <Card
      bgcolor="info"
      header="Deposit"
      status={ctx.currentUser ? status : 'Please log in to access this page.'}
      body={ctx.currentUser ? (show ? (
        <>
          Balance: {ctx.currentUser.balance} <br />
          Amount<br />
          <input type="text" className="form-control" id="amount" placeholder="Enter amount" value={amount} onChange={handleChange} /><br />
          <button type="submit" className="btn btn-light" onClick={handleDeposit}>Deposit</button>
        </>
      ) : (
        <>
          <h5>Deposit Successful</h5>
          <p>New balance: {ctx.currentUser.balance}</p>
          <p>Current balance: {ctx.currentUser.balance}</p>
          <button type="submit" className="btn btn-light" onClick={clearForm}>Make another deposit</button>
        </>
      )) : null}
    />
  );
}
