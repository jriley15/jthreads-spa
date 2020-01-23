interface Claims {
  email: string;
  id: string;
  expires: Number;
  issuer: string;
}
export interface AuthState {
  isAuthenticated: boolean;
  token: string;
  claims: Claims;
  checkedForAuth: boolean;
}

const initialState: AuthState = {
  isAuthenticated: false,
  token: "",
  claims: {
    email: "",
    id: "",
    expires: 0,
    issuer: ""
  },
  checkedForAuth: false
};

const authReducer = (state: AuthState, action: any) => {
  state = state || initialState;

  switch (action.type) {
    case "LOGIN":
      return {
        ...state,
        claims: {
          email:
            action.payload[
              "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name"
            ],
          id:
            "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier",
          expires: "exp",
          issuer: "iss"
        },
        isAuthenticated: true,
        token: action.token
      };

    case "LOGOUT":
      return {
        ...initialState
      };

    case "CHECKED_FOR_AUTH":
      return { ...state, checkedForAuth: true };

    default:
      return state;
  }
};

export default authReducer;
