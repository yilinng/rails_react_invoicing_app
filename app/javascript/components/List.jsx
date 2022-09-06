import React, { useState, useEffect } from 'react'
import { Link } from "react-router-dom";

export default function List() {

  const [error ,setError] = useState('');
  const [invoice, setInvoice] = useState([]);

  const handleDelete = (id) => {
    console.log(id, "form delete button");

    const url =  "/api/v1/invoices/" + id;
    const token = document.querySelector('meta[name="csrf-token"]').content;
    fetch(url, {
        method: "DELETE",
        headers: {
         "X-CSRF-Token": token,
         "Content-Type": "application/json"
       }
    })
    .then(response => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error('something wrong. please try again.');
      }
    })
    .then((res) => {
     console.log(res.message);
     handleLoading();
    })
    .catch(error => console.log(error))
  }

  function shorten(s,l) {
    return (s.match(new RegExp(".{"+l+"}\\S*"))||[s])[0];
  }

  const handleLoading = () => {
      
    const url =  "/api/v1/invoices";
    const token = document.querySelector('meta[name="csrf-token"]').content;
    fetch(url, {
        method: "GET",
        headers: {
         "X-CSRF-Token": token,
         "Content-Type": "application/json"
       }
    })
    .then(response => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error('something wrong. please try again.');
      }
    
    })
    .then(response => {
     console.log('done...to list page', response);
      setInvoice(response);
    })
    .catch(error => setError(error.message))
  }

  useEffect(() => {
    handleLoading();
  },[])

    return (
    <main>
      <div className="row row-cols-1 row-cols-md-3 mb-3 text-center">

        <div className="container invoicelist">
          {invoice.length ? invoice.map(item =>
            <div className="border shadow-sm p-3 mb-2 bg-body rounded" key={item.id} style={{display:"flex", justifyContent: "space-between"}}>
              <div className="invoiceLink">
                <Link to={'/invoices/'+ item.id} className="fs-4 text-reset">{shorten(item.name, 10)} </Link>
              </div>
              
            <div className="buttonList">
             <button className="btn btn-secondary delete" onClick={() => handleDelete(item.id)}>Delete</button>
             <Link to={`/invoices/${item.id}/edit`} className="btn btn-info edit" style={{fontWeight: 'bolder'}}>Edit</Link>
            </div>
          </div>
          ):
          <div className="noInvoice">no invoice can see..</div>
          }
           
          { error && <div className="error">{ error }</div>}
        </div>
        
      </div>   
    </main>
    
    )
}
