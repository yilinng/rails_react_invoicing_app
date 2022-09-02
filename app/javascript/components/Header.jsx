import React, { useState } from 'react'
import { Link, useHistory } from "react-router-dom";

export default function Header({topic}) {

    const history = useHistory();
    const [error ,setError] = useState('');
    const [loading ,setLoading] = useState('');

    const handleLogout = () => {
        const url = "/api/v1/logout";
        
       setError('');
       setLoading(true);

       const token = document.querySelector('meta[name="csrf-token"]').content;
       fetch(url, {
           method: "POST",
           headers: {
            "X-CSRF-Token": token,
            "Content-Type": "application/json"
          }
       })
       .then(response => {
           if(response.ok){
               return response.json();
           }else {
            throw new Error('something wrong.');
          }
       })
       .then((res) => {
        console.log(res.message);
        history.push("/login");   
       })
       .catch(error => setError(error.message));
    }

    return (
        <div>
            <header>
            <div className="d-flex flex-column flex-md-row align-items-center pb-3 mb-4 border-bottom">
            <Link to={'/invoices'} className="d-flex align-items-center text-dark text-decoration-none">
            <svg xmlns="http://www.w3.org/2000/svg" width="40" height="32" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
                <span className="fs-4">Invoice app</span>
            </Link>

            <nav className="d-inline-flex mt-2 mt-md-0 ms-md-auto">
                <Link to={'/invoices'} className="me-3 py-2 text-dark text-decoration-none homeLink">home</Link>
                <Link to={'/invoices/create'} className="me-3 py-2 text-dark text-decoration-none createLink">Create</Link>
                <button disabled={loading} className="py-2 text-dark text-decoration-none logoutLink" onClick={handleLogout}>Logout</button>
            </nav>
            </div>

            <div className="pricing-header p-3 pb-md-4 mx-auto text-center">
            <h1 className="display-4 fw-normal">{topic ? topic : "Pricing" }{ error ? error : '' }</h1>
            <p className="fs-5 text-muted">Quickly build an effective pricing table for your potential customers with this Bootstrap example. It's built with default Bootstrap components and utilities with little customization.</p>
            </div>
        </header>

        </div>
    )
}
