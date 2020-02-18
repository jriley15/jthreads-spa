interface Namespace {
  namespaceId: string;
  name: string;
  url: string;
  threads: number;
}
export interface NamespaceState {
  namespaces: Array<Namespace>;
  didInitialFetch: boolean;
}

const initialState: NamespaceState = {
  namespaces: [],
  didInitialFetch: false
};

const authReducer = (state: NamespaceState, action: any) => {
  state = state || initialState;

  switch (action.type) {
    case "INITIAL_FETCH":
      return {
        ...state,
        didInitialFetch: true
      };
    case "SET_NAMESPACES":
      return {
        ...state,
        namespaces: action.namespaces
      };

    default:
      return state;
  }
};

export default authReducer;
