export default {
  namespace: 'parent',
  state: {},
  effects: {},
  reducers: {
    changeReducers(state, { payload }) {
      return {
        ...state,
        ...payload,
      };
    },
  },
};
