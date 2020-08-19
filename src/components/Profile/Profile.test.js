import React from 'react';
import { Profile } from './Profile';

import Adapter from 'enzyme-adapter-react-16';
import { shallow, configure } from 'enzyme';
configure({adapter: new Adapter()});

describe('<Profile />', () => {
  let component;

  beforeEach(() => {
    component = shallow(<Profile data={{id:1, reward:[{month:'Jan', reward:90 }]}}/>);
  });

  test('It should mount', () => {
    expect(component).toBeDefined();
  });
});
