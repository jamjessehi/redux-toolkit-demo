import { useEffect, useContext } from "react";
import { ReactReduxContext } from "react-redux";

export default ({ key, reducer }) => {
  const { store } = useContext(ReactReduxContext);

  useEffect(() => {
    store.injectReducer(key, reducer);
  }, []);
};
