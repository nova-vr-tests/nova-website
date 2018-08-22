import React from "react";
import ReactDOM from "react-dom";
import {AppDumb as App} from "./App";

window.requestAnimationFrame = function(callback) {
  setTimeout(callback, 0);
};

it("renders without crashing", () => {});
