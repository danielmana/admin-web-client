/**
 * NotFoundPage
 *
 * This is the page we show when the user visits a url that doesn't have a route
 *
 * NOTE: while this component should technically be a stateless functional
 * component (SFC), hot reloading does not currently support SFCs. If hot
 * reloading is not a necessity for you then you can refactor it and remove
 * the linting exception.
 */

import React from 'react';
import styled from 'styled-components';
import { FormattedMessage } from 'react-intl';

import { ContentWrapper } from '../App';

import messages from './messages';

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  flex-direction: column;
`;

const Title = styled.h1`
  text-align: center;
  font-size: 8em;
  margin-top: 0;
  font-weight: 100;
`;

export default () => (
  <ContentWrapper>
    <Container>
      <Title>
        <FormattedMessage {...messages.header} />
      </Title>
      <p>
        <FormattedMessage {...messages.paragraph} />
      </p>
    </Container>
  </ContentWrapper>
);
