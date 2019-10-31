import React from 'react';
import ITransactionItem from '../../../../models/ITransactionItem';

const TransactionHistory:React.FC<{list: Array<ITransactionItem>}> = ({list}) => {
  let listResult;

  listResult = list.map( ({id, date, username, amount, balance}) => {
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

  if (!listResult.length) {
    listResult = (
        <tr>
          <td colSpan={5} className="text-center table-info">Your history is empty.</td>
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
            {listResult}
          </tbody>
        </table>
  );
};

export default TransactionHistory;
