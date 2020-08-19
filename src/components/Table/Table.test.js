import React from 'react';
import { Table } from './Table';

import Adapter from 'enzyme-adapter-react-16';
import { shallow, configure } from 'enzyme';
configure({adapter: new Adapter()});

describe('<Table />', () => {
  let component;

  beforeEach(() => {
    component = shallow(<Table data={{transaction:[{ date: "2020-21-05 10:12:45", item: "mnop", price: 23 }]}}/>);
  });

  test('It should mount', () => {
    expect(component).toBeDefined();
  });
});
