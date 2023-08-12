function AllData() {
  const ctx = React.useContext(UserContext);
  const users = ctx.users;

  // Calculate the total number of users and their average balance
  const numUsers = users.length;
  const totalBalance = users.reduce((sum, user) => sum + user.balance, 0);
  const avgBalance = numUsers > 0 ? totalBalance / numUsers : 0;

  return (
    <>
      <Card
        bgcolor="info"
        header="All Data in Store"
        body={
          <div style={{ height: 'auto', overflow: 'auto' }}>
            <table className="table table-striped">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Password</th>
                  <th>Balance</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user, index) => (
                  <tr key={index}>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>{user.password}</td>
                    <td>{user.balance}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        }
      />
      <Card
        bgcolor="primary"
        header="User Statistics"
        body={
          <>
            <p>Number of users: {numUsers}</p>
            <p>Average balance: {avgBalance.toFixed(2)}</p>
          </>
        }
      />
    </>
  );
}
