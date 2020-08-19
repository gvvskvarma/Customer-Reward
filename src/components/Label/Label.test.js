import React from 'react';
import { Label } from './Label';
import Adapter from 'enzyme-adapter-react-16';
import { shallow, configure } from 'enzyme';

configure({adapter: new Adapter()});

describe('<Label />', () => {
  let component;

  beforeEach(() => {
    component = shallow(<Label data= {{text : 'reward'}}/>);
  });

  test('It should mount', () => {
    expect(component).toBeDefined();
  });
});
