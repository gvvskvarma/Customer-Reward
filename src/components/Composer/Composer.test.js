import React from 'react';
import { Composer } from './Composer';
import Adapter from 'enzyme-adapter-react-16';
import { shallow, configure } from 'enzyme';
configure({adapter: new Adapter()});

describe('<Composer />', () => {
  let component;

  beforeEach(() => {
    component = shallow(<Composer data={[{id: "2", firstName: "Manik", lastName: "Natcha", age: 30, sex: "male"} ]}/>);
  });

  test('It should mount', () => {
    expect(component).toBeDefined();
  });
});
