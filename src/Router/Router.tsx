import * as React from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import { AppContextProviders } from "../Application/AppContextProviders";

import {
  ApplicationFeaturesPage,
  BlankPage,
  GabbyOverviewPage,
  HomePage,
  ProjectionDemoPage,
  PredicateTreeDemoPage,
} from "../Pages";

import { HOME_DIR } from "./common";

const Router = (): JSX.Element => {
  return (
    <AppContextProviders>
      <BrowserRouter>
        <Switch>
          <Route exact path={`${HOME_DIR}`} component={HomePage} />
          <Route path={`${HOME_DIR}predicate-demo`} component={PredicateTreeDemoPage} />
          <Route path={`${HOME_DIR}projection-demo`} component={ProjectionDemoPage} />
          {/* <Route path={`${homeDir}gabby-components`} component={GabbyComponentsPage} /> */}

          <Route path={`${HOME_DIR}blank-page`} component={BlankPage} />
          <Route
            path={`${HOME_DIR}application-features`}
            component={ApplicationFeaturesPage}
          />

          {/* Not Found */}
          {/* <Route component={() => <Redirect to="/" />} /> */}
        </Switch>
      </BrowserRouter>
    </AppContextProviders>
  );
};
export default Router;
