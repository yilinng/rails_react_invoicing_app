import React, {useState, useEffect} from 'react'
import { Link, useHistory } from "react-router-dom";

export default function List() {

  const history = useHistory();
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
    .then(() => {
     console.log('delete success');
     history.go(0);
    })
    .catch(error => console.log(error))
  }

  useEffect(() => {
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
    handleLoading()
  },[])

    return (
    <main>
      <div className="row row-cols-1 row-cols-md-3 mb-3 text-center">

        <div className="container invoicelist">
          {invoice.length ? invoice.map(item =>
           <div className="d-flex justify-content-around border shadow-sm p-3 mb-2 bg-body rounded" key={item.id}>
            <div className="invoiceLink">
              <Link to={'/invoices/'+ item.id} className="fs-4 text-reset">{item.name} </Link>
            </div>
           <div className="buttonList">
             <button className="btn btn-secondary" onClick={() => handleDelete(item.id)}>Delete</button>
             <button className="btn btn-info">Edit</button>
            </div>
          </div>
          ):
          <div>no invoice can see..</div>
          }
           
          { error && <div className="error">{ error }</div>}
        </div>
        
      </div>   
    </main>
    
    )
}
