import React from 'react';
import styled from 'styled-components';
import CircularProgress from 'material-ui/CircularProgress';

const Wrapper = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const LoadingProgress = () => (
  <Wrapper>
    <CircularProgress />
  </Wrapper>
);

export default LoadingProgress;
