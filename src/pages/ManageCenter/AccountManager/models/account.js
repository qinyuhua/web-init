export default {
  namespace: 'account',
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
