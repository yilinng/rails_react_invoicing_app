import React from 'react'
import { Link } from "react-router-dom";

export default function NotFound404() {
    return (
      <div className="vw-100 vh-100 primary-color d-flex align-items-center justify-content-center">
        <div className="jumbotron jumbotron-fluid bg-transparent">
          <div className="container secondary-color">
            <h1 className="display-4">Invoicing app</h1>
            <p className="lead">
              page not Found 404.
            </p>
            <hr className="my-4" />
            <Link
              to="/invoices"
              className="btn btn-lg custom-button"
              role="button"
            >
              redirect to page
            </Link>
          </div>
        </div>
    </div>
    )
}
