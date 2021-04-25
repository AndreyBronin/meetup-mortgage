import React from "react";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";


const App = () => {
  return (
    <main>
      <header>Head title</header>
      <Router>
        <Switch>
          <Route path="/page1">
            <div className="page1">Page1</div>
          </Route>
          <Route path="/" />
        </Switch>
      </Router>
    </main>
  );
};

export default App;
