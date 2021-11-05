import React, { useState, useEffect} from 'react'
import Header from './Header';
import { useParams, Redirect } from "react-router-dom";
import Cookies from 'js-cookie';

export default function InvoiceDetail() {

    const [total_price, setTotal_Price] = useState(0);
    const [names, setNames] = useState([]);
    const [prices, setPrices] = useState([]);
    const [error, setError] = useState('')

    const { id } = useParams();

    useEffect(() => {
        totalPrice();
        console.log(names, prices);
    },[names , prices])

    const totalPrice = () => {
        let total = 0;
        prices.forEach(element => {
          total += parseInt(element, 10);
        });
        setTotal_Price(total)
    }
    
    useEffect(() => {
        const handleLoading = () => {
          const url =  "/api/v1/invoices/"+ id;
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
           console.log('done...to detail page', response);
           setNames(response.invoice.names);
           setPrices(response.invoice.prices);
          })
          .catch(error => setError(error.message));
    
        }
        handleLoading()
      },[])

      if(!Cookies.get('my_csrf_token')){
        
        return <Redirect to='/login'  />
    }
  
      
    return (
        <>
        <Header/>
            <div className="single-page">
                <div className="invoice">
                    <div className="container">
                        <div className="row">
                            {error && <span className="error">{ error }</span>}
                            <div className="col-md-12">
                                <table className="table">
                                    <thead>
                                    <tr>
                                        <th scope="col">#</th>
                                        <th scope="col">Transaction Name</th>
                                        <th scope="col">Price ($)</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    { names.length ? names.map((txn, index) => 
                                    <tr key={index}>
                                        <th>{ index + 1}</th>
                                        <td>{ txn }</td>
                                        <td>{ prices[index] }</td>
                                    </tr>
                                     ): null}     
                                    </tbody>
                                    <tfoot>
                                    <tr>
                                    <td></td>
                                    <td>Total :</td>
                                    <td><strong>$ { total_price } </strong></td>
                                    </tr>
                                    </tfoot>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
        
