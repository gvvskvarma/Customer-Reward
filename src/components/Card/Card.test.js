import React from 'react';
import { Card } from './Card'
import Adapter from 'enzyme-adapter-react-16';
import { shallow, configure } from 'enzyme';

configure({adapter: new Adapter()});

describe('<Card />', () => {
  let component;

  beforeEach(() => {
    component = shallow(<Card data={{ rewardInfo: { month: 'Jan', reward: 90 } }} />);
  });

  test('It should mount', () => {
    expect(component).toBeDefined();
  });

  test('It should have specified number of elements', () => {
    let node = component.find('div');
    console.log(node);
    expect(node.length).toEqual(3);
  });

});
