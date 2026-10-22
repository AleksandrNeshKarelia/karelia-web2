const appReducer = (state, action) => {
  const { payload, type } = action;

  switch (type) {
    case "GET_URHEILIJAT":
      return {
        ...state,
        urheilijat: payload,
      };
    case "GET_URHELIJA":
      return {
        ...state,
        urhelija: payload,
      };
    case "DELETE_URHELIJA":
      return {
        ...state,
        urhelijat: state.urhelijat.filter(
          (urhelija) => urhelija.id !== action.payload,
        ),
      };
    case "ADD_URHELIJA":
      return {
        ...state,
        urheilijat: [action.payload, ...state.urheilijat],
      };
    case "EDIT_URHELIJA":
      return {
        ...state,
        urheilijat: state.urheilijat.map((urhelija) =>
          urhelija.id === action.payload.id ? action.payload : urhelija,
        ),
      };
    default:
      return state;
  }
};

export default appReducer;
