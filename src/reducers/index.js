import { combineReducers } from "redux";
import { routerReducer } from "react-router-redux";

import demo from "./demo";
import project from "./project";
<<<<<<< HEAD
import MyAnalysesPage from "./MyAnalyses";
import Dashboard from "./Dashboard";
=======
import search from "./search";
>>>>>>> feature-search

const Reducers = combineReducers({
  demo,
  project,
  MyAnalysesPage,
  Dashboard,
  routing: routerReducer,
  search
});

export default Reducers;
