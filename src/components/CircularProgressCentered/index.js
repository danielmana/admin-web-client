import React from 'react';
import { CircularProgress } from 'material-ui';

const styles = {
  root: {
    position: 'fixed',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
  },
};

class CircularProgressCentered extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function

  render() {
    return (
      <CircularProgress
        style={styles.root}
      />
    );
  }
}

export default CircularProgressCentered;

