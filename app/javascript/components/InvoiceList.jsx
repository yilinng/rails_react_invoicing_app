import React, { useState } from 'react';
import Header from './Header';
import List from './List';
import { useHistory, Redirect } from "react-router-dom";
import Cookies from 'js-cookie';

export default function InvoiceList() {
    
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
           }
           throw new Error("Network response was not ok.");
       })
       .then(response => {
        console.log('done...to list page', response);
        history.push("/login");   
       })
       .catch(error => console.log(error.message));
    }

    if(!Cookies.get('my_csrf_token')){
        
        return <Redirect to='/login'  />
    }

    return (
        <div className="container py-3">
            <Header />
            <List/>
        </div>
    )
}
