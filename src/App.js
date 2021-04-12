import React from "react";
import { Route, Switch, withRouter, useHistory } from "react-router-dom";
import Owner from "./components/assetOwners/Owner";
import AssetLists from "./components/assets/AssetLists";
import Type from "./components/assetTypes/Type";
import Dashboard from "./components/layouts/Dashboard";
import Header from "./components/layouts/Header";
import NavBar from "./components/layouts/NavBar";

const App = () => {
  return (
    <Switch>
      <>
        <Header />
        <NavBar />
        <Route exact path="/dashboard" component={Dashboard} />
        <Route exact path="/asset/type" component={Type} />
        <Route exact path="/assets" component={AssetLists} />
        <Route exact path="/owner/:type" component={Owner} />
      </>
    </Switch>
  );
};

export default App;
