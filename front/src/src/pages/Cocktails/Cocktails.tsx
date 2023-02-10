import { Route, Routes } from "react-router-dom";
import { PAGES, routesToArray } from "../../constants/router";

export default function Cocktails() {

  return (
    <Routes>
      {routesToArray(PAGES(true).COCKTAILS.innerRoutes).map((attrs, key) => (
        <Route {...{ ...attrs, key }} />
      ))}
    </Routes>
  );
}
