import { Navigate, Route, Routes } from "react-router-dom";
import { NamedPageObjs, routesToArray } from "../../constants/router";

export default function RouterUnpack({
    routes,
    defaultPath,
  }: {
    routes: NamedPageObjs;
    defaultPath: string;
  }) {
    return (
      <Routes>
        {routesToArray(routes).map(({ path, element }) => (
          <Route path={`${path}/*`} element={element} key={path} />
        ))}
        <Route path="*" element={<Navigate to={defaultPath} replace />}></Route>
      </Routes>
    );
  }