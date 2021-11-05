import React from "react";
import { Link } from "react-router-dom";

export default () => (
  <div className="vw-100 vh-100 primary-color d-flex align-items-center justify-content-center">
    <div className="jumbotron jumbotron-fluid bg-transparent">
      <div className="container secondary-color">
        <h1 className="display-4">Invoicing app</h1>
        <p className="lead">
          use ruby on rails and react
        </p>
        <hr className="my-4" />
        <Link
          to="/login"
          className="btn btn-lg custom-button"
          role="button"
        >
          log in
        </Link>
        <Link
          to="/signup"
          className="btn btn-lg custom-button"
          role="button"
        >
          Sign up
        </Link>
      </div>
    </div>
  </div>
);