export function setNotification(hasNew = false) {
  return {
    type: "setNotificatoin",
    payload: hasNew,
  };
}
