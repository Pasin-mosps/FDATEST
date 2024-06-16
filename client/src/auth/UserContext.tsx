// UserContext.tsx
import React, { createContext, useReducer, ReactNode } from 'react';

interface UserState {
  username: string;
  role: string;
}

type UserAction = 
  | { type: 'LOGIN'; payload: UserState }
  | { type: 'LOGOUT' };

const initialState: UserState = {
  username: '',
  role: '',
};

const UserContext = createContext<{
  state: UserState;
  dispatch: React.Dispatch<UserAction>;
}>({
  state: initialState,
  dispatch: () => null,
});

const userReducer = (state: UserState, action: UserAction): UserState => {
  switch (action.type) {
    case 'LOGIN':
      return {
        ...state,
        username: action.payload.username,
        role: action.payload.role,
      };
    case 'LOGOUT':
      return {
        ...state,
        username: '',
        role: '',
      };
    default:
      return state;
  }
};

const UserProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(userReducer, initialState);

  return (
    <UserContext.Provider value={{ state, dispatch }}>
      {children}
    </UserContext.Provider>
  );
};

export { UserContext, UserProvider };
