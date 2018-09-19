import * as React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';

import InitiateDebit from './index';

test('should render w/o breaking', () => {
  const wrapper = shallow(<InitiateDebit setInitiateCreditDebit={() => {}} />);
  expect(toJson(wrapper)).toMatchSnapshot();
});
