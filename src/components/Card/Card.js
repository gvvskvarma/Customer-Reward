import React from 'react';
import styles from './Card.module.css';

export class Card extends React.PureComponent {
  render() {
    return (
      <div className={this.getStyles()}>
        <div> MONTH : {this.props.data.rewardInfo.month} </div> 
        <div> REWARD : {this.props.data.rewardInfo.reward} Ponits </div> 
      </div>
    )
  }

  getStyles () {
    if (this.isProfileCard) {
      return [ styles.profileCard, styles.container ].join(' ') ;
    } else {
      return [ styles.card, styles.container ].join(' ') ;
    }
  }
}
