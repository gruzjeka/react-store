export const CommonReducer =
  (...reducers) =>
  (state, action) => {
    for (let i = 0; i < reducers.length; i++) {
      let newState = reducers[i](state, action);
      if (newState !== state) {
        return newState;
      }
    }
    return state;
  };
