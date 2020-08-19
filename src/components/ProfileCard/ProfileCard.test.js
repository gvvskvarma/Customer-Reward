import React from 'react';
import { ProfileCard } from './ProfileCard';
import Adapter from 'enzyme-adapter-react-16';
import { shallow, configure } from 'enzyme';
configure({adapter: new Adapter()});

describe('<ProfileCard />', () => {
  let component;

  beforeEach(() => {
    component = shallow(<ProfileCard data={{customerInfo: {age: 30, firstName: "Mathu", id: "1", lastName: "Radhak", sex: "female"}}} />);
  });

  test('It should mount', () => {
    expect(component).toBeDefined();
  });
});
