import React from 'react';
import styles from './App.module.css';

import { Form } from './components/Form/Form';
import { Label } from './components/Label/Label';
import { ErrorBoundary } from './components/Common/ErrorBoundary/ErroyBoundary';

class App extends React.Component {
  render() {
    return (
      <div className={styles.viewSize}>
        <ErrorBoundary>
          <Label data={{ text: 'Customer Reward Program' }}> </Label>
          <Form />
        </ErrorBoundary>
      </div>
    )
  }
}

export default App;
