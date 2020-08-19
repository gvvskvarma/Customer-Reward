import React from 'react';
import styles from './Label.module.css';


export class Label extends React.Component {
  constructor(props) {
    super(props);
    this.textData = this.props.data && this.props.data.text 
  }
  render() {
    return (
      <div>
        <div className={styles.header}> 
          { this.textData }
        </div> 
      </div>
    )
  }
}
