export const SET_VIEWPORT = 'SET_VIEWPORT';
export const SET_HOVERED_LSOA = 'SET_HOVERED_LSOA';

export const setViewport = viewport => ({
  type: SET_VIEWPORT,
  viewport
});

export const onLsoaHovered = feature => dispatch => {
  console.log('HOVERED FEATURE: ', feature);
  return dispatch({
    type: SET_HOVERED_LSOA,
    feature
  });
};
