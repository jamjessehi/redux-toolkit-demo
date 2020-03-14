import React from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import useInjectReducer from "utils/useInjectReducer";
import reducer, { selectSign, onFiledChanged } from "./slice";

const key = "sign";

export default () => {
  const { username } = useSelector(selectSign);

  const dispatch = useDispatch();

  useInjectReducer({ key, reducer });

  return (
    <>
      <nav>
        <Link to="/">Home</Link>
        <br />
        <br />
      </nav>
      <form>
        <input
          placeholder="username"
          value={username}
          onChange={e =>
            dispatch(
              onFiledChanged({ filed: "username", value: e.target.value })
            )
          }
        />
        <br />
        <input placeholder="password" value="" onChange={() => {}} />
        <br />
        <input placeholder="confirm password" value="" onChange={() => {}} />
      </form>
    </>
  );
};
