import React from 'react';
import styles from './Profile.module.css';
import { Card } from '../Card/Card'
import { Label } from '../Label/Label';
import { Table } from '../Table/Table';

import axios from 'axios';

export class Profile extends React.Component {
  constructor(props) {
    super(props);
     this.cardClickHandler = this.cardClickHandler.bind(this);
    this.state = { transactionInfo: [], emptyResponse: false, month: ''};
   }

  cardClickHandler(value) {
    axios.get('http://localhost:8080/transaction?id=' + this.props.data.id + '&month=' + value)
    .then(
      (resp) => {
        // console.log(resp.data);
        if (resp.data.transactionResponse) {
          this.setState({ ...this.state, transactionInfo: resp.data.transactionResponse, month: value });
        } else {
          this.setState({ ...this.state, emptyResponse: true });
        }
      },
    ).catch(error => {
      console.log('Error' + error)
    })
  }

  render() {
    const totalRewards = this.props.data.reward.map((elem) => elem.reward).reduce( (total,elem) => total+elem)
    return (
      <div>
        <div className = {styles.rewardTotal}> Reward Total : {totalRewards} Points</div>
        {this.props.data.reward.length > 0 &&
          <span>
            {this.props.data.reward.map((reward, index) => {
              return (
                <div className={styles.flexContainer} key={index} onClick={this.cardClickHandler.bind(this, reward.month)}>
                  <Card 
                    data={{ rewardInfo: { month: reward.month, reward: reward.reward } }}
                    option={{ profile: false }}
                  />
                </div>
              )
            })}
          </span>
        }
        {
          this.state.month &&
          <React.Fragment>
            <hr /> <Label data={{ text: 'Transactions' }} /> <hr />
            {/* <Table data= {{id : this.props.data.id, month: this.state.month }}/> */}
            <Table data= {{transaction : this.state.transactionInfo }}/>
          </React.Fragment>
        }
      </div>
    )
  }
}