import React from 'react';
import {Root, Popup} from 'popup-ui';
const FireBaseContext = React.createContext();

export const FireBaseProvider = ({children}) => {
  const actions = {
    Popup: Popup,
  };

  return (
    <Root>
      <FireBaseContext.Provider value={actions}>
        {children}
      </FireBaseContext.Provider>
    </Root>
  );
};

export default FireBaseContext;
