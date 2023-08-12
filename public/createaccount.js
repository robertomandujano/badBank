function CreateAccount() {
  const [show, setShow] = React.useState(true);
  const [status, setStatus] = React.useState('');
  const [name, setName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const ctx = React.useContext(UserContext);

  function validate(field, label) {
    if (!field) {
      setStatus('Error: ' + label);
      setTimeout(() => setStatus(''), 3000);
      return false;
    }
    return true;
  }

  function validateEmail(email) {
    const isValid = /\S+@\S+\.\S+/.test(email);
    if (!isValid) {
      setStatus('Error: Invalid email address');
      setTimeout(() => setStatus(''), 3000);
      return false;
    }
    return true;
  }

  function handleSubmit(event) {
    event.preventDefault();
    if (!validate(name, 'name')) return;
    if (!validateEmail(email)) return;
    if (!validate(password, 'password')) return;
    ctx.users.push({ name, email, password, balance: 100 });
    setShow(false);
  }

  function handleClear() {
    setName('');
    setEmail('');
    setPassword('');
    setShow(true);
  }

  const isDisabled = !name || !email || !password || password.length < 8;

  return (
    <Card
      bgcolor="primary"
      header="Create Account"
      status={status}
      body={show ? (
        <form onSubmit={handleSubmit}>
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            placeholder="Enter name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <label htmlFor="email">Email address:</label>
          <input
            type="email"
            id="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button type="submit" disabled={isDisabled}>
            Create Account
          </button>
        </form>
      ) : (
        <>
          <h5>Success</h5>
          <p>Name: {name}</p>
          <p>Email: {email}</p>
          <button type="button" onClick={handleClear}>
            Add another account
          </button>
        </>
      )}
    />
  );
}
