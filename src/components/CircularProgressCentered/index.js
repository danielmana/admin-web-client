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

const CircularProgressCentered = () => <CircularProgress style={styles.root} />;

export default CircularProgressCentered;
