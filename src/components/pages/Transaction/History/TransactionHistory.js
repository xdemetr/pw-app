import React from 'react';

const TransactionHistory = (props) => {

  let list = props.list.map( ({id, date, username, amount, balance}) => {
    return(
        <tr className={amount < 0 ? 'table-danger': 'table-success'} key={id}>
          <td>{id}</td>
          <td>{date}</td>
          <td>{username}</td>
          <td>{amount}</td>
          <td>{balance}</td>
        </tr>
    )
  });

  if (list.length === 0) {
    list = (
        <tr>
          <td colSpan="5" className="text-center table-info">Your history is empty.</td>
        </tr>
    )
  }

  return (
        <table className="table">
          <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">date</th>
            <th scope="col">user</th>
            <th scope="col">amount</th>
            <th scope="col">balance</th>
          </tr>
          </thead>
          <tbody>
            {list}
          </tbody>
        </table>
  );
};

export default TransactionHistory;
