import React, { useState, useEffect } from 'react'
import Header from './Header'
import { Redirect, useHistory, useParams } from "react-router-dom";
import Cookies from 'js-cookie';

export default function CreateInvoice() {

    const { id } = useParams();
    const history = useHistory();
    const [error ,setError] = useState('');
    const [loading ,setLoading] = useState('');
    const [invoice, setInvoice] = useState({ name: "", total_price: 0 })
    const [transactions, setTransactions] = useState([]);
    const [nextTxnId, setNextTxnId] = useState(1);
    const [name, setName] = useState('');
    const [price, setPrice] = useState(0);
    const [topic, setTopic] = useState('')


    const saveTransaction = () => {

        const dataToTransaction = {
            id: nextTxnId,
            name: name,
            price: price
        }

        if (name.length != 0 && price > 0) {
            setTransactions(oldData => [...oldData, dataToTransaction])
        }

    }

    const saveEditTransaction = () => {
        const dataToTransaction = {
            id: nextTxnId,
            name: name,
            price: Number(price)
        }

        if (name.length != 0 && price > 0) {
            transactions[nextTxnId-1] = dataToTransaction
            console.log(transactions);
            calcTotal();
        }
    }

    const deleteTransaction = (id) => {
        let newList = transactions.filter(function(el) {
            return el.id !== id;
          });
    
          setNextTxnId( nextTxnId - 1 );
          setTransactions(newList);
         
        
    }

    const calcTotal = () => {
        let total = 0;
        transactions.forEach(element => {
          total += parseInt(element.price, 10);
        });

        setInvoice(prevState => ({
            ...prevState,
            total_price: total
        }));

        
        setNextTxnId( nextTxnId + 1);

        setName('');
        setPrice(0);
    }


    const handleSubmit = (e) => {
        e.preventDefault();

        if(transactions.length < 1 || topic.length < 1){
           return setError("you have to input name and price...")
        }    

        const passData = {
            name: topic,
            names: [],
            prices: []
        }

        transactions.forEach(element => {
            passData.names.push(element.name);
            passData.prices.push(element.price);
        });
  
        setLoading("Creating Invoice, please wait ...");
  
        const url =  "/api/v1/invoices/" + id;
        const token = document.querySelector('meta[name="csrf-token"]').content;
     
        fetch(url, {
            method: "PATCH",
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
                throw new Error('something wrong. please try again.');
              }
            
        })
        .then(response => {
         setLoading("");   
         console.log('create done...to list page', response);
         history.push("/invoices");   
        })
        .catch(error => setError(error.message));
        
    }

    useEffect(() => {
        calcTotal();
        console.log(transactions, "transcation...")
    },[transactions])

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
            response.invoice && response.invoice.names.map((item, idx) => {
                const dataToTransaction = {
                    id: (idx + 1),
                    name: item,
                    price: response.invoice.prices[idx]
                }
                setTransactions(oldData => [...oldData, dataToTransaction])
            });         
           console.log('done...to detail page', response);
           setTopic(response.invoice.name);
          })
          .catch(error => setError(error.message));
    
        }
        handleLoading()
      },[])

      
      if(!Cookies.get('my_csrf_token')){
        
        return <Redirect to='/login'  />
    }
  
    return (
        <div className="container py-3">
        <Header topic={topic}/>
        <div className="container">
        <div className="tab-pane p-3 fade show active">
        <div className="row">
            <div className="col-md-12">
            <h3>Enter details below to create invoice</h3>
            <form onSubmit={(e) => handleSubmit(e)}>
                <div className="form-group mb-3">
                <label htmlFor="create-invoice-name" className="form-label">Invoice Name:</label>
                <input id="create-invoice-name" type="text" className="form-control" placeholder="Invoice Name" value={topic ? topic : "input topic.."} onChange={(e) => setTopic(e.target.value)}/>
                </div>

                <div className="form-group mb-3">
                Invoice Price: <span>$ {invoice.total_price} </span>
                </div>

                <hr />
                <h3>Transactions </h3>
                <div className="form-group">
                <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#transactionModal">Add Transaction</button>
                <div className="modal fade" id="transactionModal" tabIndex="-1" aria-labelledby="transactionModalLabel" aria-hidden="true">
                    <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLabel">Add Transaction</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                        <div className="form-group mb-3">
                            <label htmlFor="txn_name_modal" className="form-label">Transaction name:</label>
                            <input id="txn_name_modal" type="text" className="form-control" value={name ? name : ''} onChange={(e) => setName(e.target.value)}/>
                        </div>
                        <div className="form-group mb-3">
                            <label htmlFor="txn_price_modal" className="form-label">Price ($):</label>
                            <input id="txn_price_modal" type="numeric" className="form-control" value={price ? price : 0} onChange={(e) => setPrice(e.target.value)}/>
                        </div>
                        </div>
                        <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Discard Transaction</button>
                        <button type="button" className="btn btn-primary" data-bs-dismiss="modal" onClick={() => saveTransaction()}>Save Transaction</button>
                        </div>
                    </div>
                    </div>
                </div>
                {/* edit transcation*/}
                <div className="modal fade" id="transactionModalEdit" tabIndex="-1" aria-labelledby="transactionModalEditLabel" aria-hidden="true">
                    <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLabel">Edit Transaction</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                        <div className="form-group mb-3">
                            <label htmlFor="txn_name_modal" className="form-label">Transaction name:</label>
                            <input id="txn_name_modal" type="text" className="form-control" value={name ? name : ''} onChange={(e) => setName(e.target.value)}/>
                        </div>
                        <div className="form-group mb-3">
                            <label htmlFor="txn_price_modal" className="form-label">Price ($):</label>
                            <input id="txn_price_modal" type="numeric" className="form-control" value={price ? price : 0} onChange={(e) => setPrice(e.target.value)}/>
                        </div>
                        </div>
                        <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Discard Transaction</button>
                        <button type="button" className="btn btn-primary" data-bs-dismiss="modal" onClick={() => saveEditTransaction()}>Update Transaction</button>
                        </div>
                    </div>
                    </div>
                </div>

                <div className="col-md-12">
                    <table className="table">
                        <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Transaction Name</th>
                            <th scope="col">Price ($)</th>
                            <th scope="col"></th>
                        </tr>
                        </thead>
                        <tbody>
                        { transactions.length > 0 ? transactions.map(txn => 
                             <tr key={txn.id}>
                             <td>{ txn.id }</td>    
                             <td>{ txn.name }</td>
                             <td>{ txn.price } </td>
                                <td className="btnlist">
                                    <button type="button" style={{marginRight: "10px" ,marginBottom: "5px", backgroundColor:"#009090", color: "white"}} className="btn" data-bs-toggle="modal" data-bs-target="#transactionModalEdit" 
                                    onClick={() => {setName(txn.name); setPrice(txn.price); setNextTxnId(txn.id)}}>Edit</button>
                                    <button type="button" className="btn btn-danger" onClick={() => deleteTransaction(txn.id)}>Delete</button>
                                </td>
                             </tr>
                        ): <tr>
                            <th></th>
                            <td>not transaction ...please add new one.</td>
                            </tr>}            
                        </tbody>
                    </table>
                </div>

                <div className="form-group">
                <button  style={{backgroundColor: "#5ca904", color: "white", fontWeight: "bolder"}} className="btn">Update Invoice</button>
                { loading && <span>{ loading }</span> }
                {error && <span className="error">{ error }</span>}
                </div>
                </div>
            </form>
            </div>
        </div>
        </div>
    </div>
    </div>
    )
}
