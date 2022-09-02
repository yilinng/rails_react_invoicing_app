import React from "react";
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";
import Home from "../components/Home";
import Login from "../components/Login";
import Signup from "../components/Signup";
import InvoiceList from "../components/InvoiceList";
import InvoiceDetail from "../components/InvoiceDetail";
import CreateInvoice from "../components/CreateInvoice";
import InvoiceEdit from "../components/InvoiceEdit";
import NotFound404 from "../components/NotFound404";

export default (
  <Router>
    <Switch>
      <Route path="/" exact component={Home} />
      <Route path="/login" exact component={Login} />
      <Route path="/signup" exact component={Signup} />
      <Route path="/invoices" exact component={InvoiceList} />
      <Route path="/invoices/create" exact component={CreateInvoice} />
      <Route path="/invoices/:id" exact component={InvoiceDetail} />
      <Route path="/invoices/:id/edit" exact component={InvoiceEdit} />
      <Route path="" component={NotFound404} />
    </Switch>
  </Router>
);