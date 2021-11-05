import React from 'react'
import { Link } from "react-router-dom";


export default function NotFound404() {
    return (
        <div className="notFound primary-color d-flex justify-content-evenly">
            <h3>not Found 404</h3>
            <div className="toHomepage">
                <Link to="/" className="btn btn-link">home page</Link>
            </div>
        </div>
    )
}
