import React, { useEffect } from "react";
import { NamespaceState } from "../redux/reducers/namespaceReducer";
import { useSelector, useDispatch } from "react-redux";
import useApi from "./useApi";

interface RootState {
  namespaceState: NamespaceState;
}

const useNamespaces = () => {
  const { get } = useApi();
  const namespaceState = useSelector(
    (state: RootState) => state.namespaceState
  );
  const dispatch = useDispatch();

  const fetchNamespaces = async () => {
    let response: any = await get("/Namespace/GetAll", {});

    if (response.success) {
      dispatch({ type: "SET_NAMESPACES", namespaces: response.data });
    } else {
      console.log("Error fetching namespaces: ", response.errors);
    }
  };

  useEffect(() => {
    if (!namespaceState.didInitialFetch) {
      dispatch({ type: "INITIAL_FETCH" });
      fetchNamespaces();
    }
  }, []);

  return {
    fetchNamespaces: fetchNamespaces,
    ...namespaceState
  };
};

export default useNamespaces;
