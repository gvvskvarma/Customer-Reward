import React from 'react';
// import axios from 'axios';

import styles from './Table.module.css';

export class Table extends React.Component {
  render() {
    return (
      <div className={styles.container}>
        <table>
          <thead>
            <tr>
              <th>Month</th>
              <th>Item</th>
              <th>Price</th>
            </tr>
          </thead>
          <tbody>
            {
              this.props.data.transaction.map((transaction, index) => {
                return (
                  <tr key={index}>
                    <td>{transaction.date}</td>
                    <td>{transaction.item}</td>
                    <td>{transaction.price}</td>
                  </tr>
                );
              })
            }
          </tbody>
          <tfoot>
          </tfoot>
        </table>
      </div>
    )
  }
}
