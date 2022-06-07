import { useMemo } from "react";
import { useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import { actions } from "../redux";
import { setAuthenticatedUser } from "../redux/actions";

export function useAction() {
  const dispatch = useDispatch();
  return useMemo(
    function () {
      return bindActionCreators(actions, dispatch);
    },
    [dispatch]
  );
}
