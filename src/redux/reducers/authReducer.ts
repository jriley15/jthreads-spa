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
}

const initialState: AuthState = {
  isAuthenticated: false,
  token: "",
  claims: {
    email: "",
    id: "",
    expires: 0,
    issuer: ""
  }
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
              "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress"
            ],
          id:
            action.payload[
              "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"
            ],
          name:
            action.payload[
              "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name"
            ],
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

    default:
      return state;
  }
};

export default authReducer;
