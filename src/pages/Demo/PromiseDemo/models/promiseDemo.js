export default {
  namespace: 'promiseDemo',
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
