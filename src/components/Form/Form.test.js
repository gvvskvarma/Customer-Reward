import React from 'react';
import { Form } from './Form';
import Adapter from 'enzyme-adapter-react-16';
import { shallow, configure } from 'enzyme';
configure({adapter: new Adapter()});


describe('<Form />', () => {
  let component;

  beforeEach(() => {
    component = shallow(<Form />);
  });

  test('It should mount', () => {
    expect(component).toBeDefined();
  });
});
