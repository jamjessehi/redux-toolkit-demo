import React from "react";
import loadable from "utils/loadable";
import LinearProgress from "components/LinearProgress";

export default loadable(() => import("./index"), {
  fallback: <LinearProgress />
});
