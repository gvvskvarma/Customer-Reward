import React from 'react';
import styles from './ProfileCard.module.css';


export class ProfileCard extends React.Component {
  constructor(props) {
    super(props)
    this.isProfileCard = (this.props.option && this.props.option.profile ) || false;
    this.customerInfo = this.props.data.customerInfo;
  }
  render() {
    return (
      <div className={this.getStyles()}>
        <div> FIRST NAME : {this.customerInfo.firstName} </div> 
        <div> LAST NAME : {this.customerInfo.lastName} </div> 
        <div> AGE : {this.customerInfo.age} </div> 
        <div> SEX : {this.customerInfo.sex} </div> 
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
