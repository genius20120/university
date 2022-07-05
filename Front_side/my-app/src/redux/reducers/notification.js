const initialState = {
  hasNotification: JSON.parse(localStorage.getItem("hasNotif")) || false,
};
export function notificationReducer(state = initialState, action) {
  switch (action.type) {
    case "setNewNotification":
      const newState = {
        ...state,
      };
      newState.hasNotification = action.payload;
      localStorage.setItem("hasNotif", JSON.stringify(action.payload));
      return newState;
    default:
      return state;
  }
}
