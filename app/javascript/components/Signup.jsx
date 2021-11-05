import React, { useRef, useState } from 'react';
import { Link, Redirect, useHistory } from "react-router-dom";
import Cookies from 'js-cookie';

export default function Signup(){

    const emailRef = useRef('');
    const passwordRef = useRef('');
    const [error ,setError] = useState('');
    const [loading ,setLoading] = useState('');

    const history = useHistory();

    const handleSubmit = (e) => {
       e.preventDefault();

       const url = "/api/v1/signup";
       const passData = {
            email: emailRef.current.value,
            password: passwordRef.current.value
       };

       setError('');
       setLoading(true);

       const token = document.querySelector('meta[name="csrf-token"]').content;
       fetch(url, {
           method: "POST",
           headers: {
            "X-CSRF-Token": token,
            "Content-Type": "application/json"
          },
           body : JSON.stringify(passData)
       })
       .then(response => {
        if (response.ok) {
            return response.json();
          } else {
            throw new Error('something wrong.');
          }
        
       })
       .then(response => {
        console.log('done...to list page', response);
        history.push("/invoices");   
       })
       .catch(error => setError(error.message))
    }

    
    if(Cookies.get('my_csrf_token')){
        
        return <Redirect to='/invoices'  />
    }


    return (
        <div className="LoginForm">
            <div className="container signContainer">
                <h1>Sign Up</h1>
                <p>Please fill in this form to create an account.</p>
            <hr/>

            <form onSubmit={handleSubmit}>
                <label htmlFor="email"><b>Email</b></label>
                <input ref={emailRef} type="text" placeholder="email.." required/>
            
                <label htmlFor="psw"><b>Password</b></label>
                <input ref={passwordRef} type="password" placeholder="password.." required/>
                
    
                <div className="clearfix">
                    <button disabled={loading} type="submit" className="btn btn-outline-primary">Sign Up</button>
                    <Link to="/login" className="btn btn-link">Login</Link>
                    {error && <span className="error">{ error }</span>}
                </div>
            </form>
               
            </div>
        </div>

    );
}