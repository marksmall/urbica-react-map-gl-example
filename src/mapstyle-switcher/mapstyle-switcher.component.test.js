import React from 'react';
import { mount } from 'enzyme';

import MapStyleSwitcher from './mapstyle-switcher.component';

describe('MapStyle Switcher Component', () => {
  let testee = null;
  let selectMapStyle = null;
  let selectedMapStyle = null;

  const MAP_STYLE_DATA = [
    {
      id: 'streets',
      uri: 'mapbox://styles/astrosat/cjtrrv8be37ge1fqwl0ef8rb9',
      title: 'Streets'
    },
    {
      id: 'light',
      uri: 'mapbox://styles/astrosat/cjtiotoam3tff1fruptp84ekd',
      title: 'Light'
    },
    {
      id: 'dark',
      uri: 'mapbox://styles/astrosat/cjtrrxg8l1nxt1fpd6x7f0ln8',
      title: 'Dark'
    },
    {
      id: 'satellite',
      uri: 'mapbox://styles/astrosat/cjtsgocbv57ok1fqqsjez3de6',
      title: 'Satellite'
    }
  ];

  beforeEach(() => {
    selectMapStyle = jest.fn();
    selectedMapStyle = MAP_STYLE_DATA[1];
    testee = mount(
      <MapStyleSwitcher
        mapStyles={MAP_STYLE_DATA}
        selectedMapStyle={selectedMapStyle}
        selectMapStyle={selectMapStyle}
      />
    );
  });

  it('should render all Map Styles', () => {
    expect(testee.find('li').length).toEqual(4);
  });

  it('should render with the `Light` Map Style selected', () => {
    expect(testee.find('[id="light"]').prop('checked')).toEqual(true);
  });

  it('should call the selectMapStyle with the `Dark` Map Style is selected', () => {
    testee
      .find('[id="dark"]')
      .simulate('change', { target: { value: 'Change function' } });
    expect(selectMapStyle).toHaveBeenCalledWith(MAP_STYLE_DATA[2]);
    expect(selectMapStyle).not.toHaveBeenCalledWith(MAP_STYLE_DATA[1]);
  });
});
