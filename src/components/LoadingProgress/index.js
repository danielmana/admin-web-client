import React from 'react';
import styled from 'styled-components';
import CircularProgress from 'material-ui/CircularProgress';


const Wrapper = styled.div `
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

class LoadingProgress extends React.Component { // eslint-disable-line react/prefer-stateless-function

  render() {
    return (
      <Wrapper>
        <CircularProgress />
      </Wrapper>
    );
  }
}

export default LoadingProgress;
