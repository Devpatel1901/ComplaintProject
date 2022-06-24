import React, { Component } from 'react'
import {Link,Routes,Route,Navigate } from "react-router-dom";
import ShowComplaints from './ShowComplaints';
import AddComplaints from './AddComplaints';
import axios from 'axios';
import config from "./config";
import swal from "sweetalert";

export default class Navbar extends Component {
  constructor()
  {
    super();
    this.state={
      customer_id: 0,
      customer_email: "",
      redirect:false,
      accessToken: "",
    }
  }
  componentDidMount()
  {
    // let token = localStorage.getItem('token'); 
    // if(token === null){
    //   swal("Login Again", {
    //     icon: "warning",
    //   });
    //   this.setState({
    //     ...this.state,
    //     redirect: true
    //   })
    // }else{

    //   this.setState({
    //     accessToken: token
    //   })
    // }

    axios.get(config.SERVER+"/complaint/get-customer-id",{withCredentials:true})
      .then((res)=>{
        console.log(res);
        if(res.data.message !== "Session is not set")
        {
          this.setState({
              customer_id: res.data.CustomerID,
              customer_email: res.data.CustomerEmail
          })
          localStorage.setItem('customer_id',res.data.CustomerID);
          localStorage.setItem('customer_email',res.data.CustomerEmail);
        }else{
          swal("Login Again", {
            icon: "warning",
          });
          this.setState({
            ...this.state,
            redirect: true
          })
        }
      })
      .catch((err)=>{
        swal("Login Again", {
          icon: "warning",
          });
      })
  }

  handleLogout = () => {
    axios.get(config.SERVER+"/complaint/logout",{withCredentials:true})
      .then((response)=>{
        if(response.data.message === "Success"){
          localStorage.setItem('customer_id',undefined);
          localStorage.setItem('customer_email',undefined);
          swal("You are Successfully Logged out!!!", {
            icon: "success",
          });
          this.setState({redirect:true});
        }
      })
      .catch((e)=>{
        swal("Internal Server Error", {
            icon: "warning",
        });
    })
  }
  render() {
    return (
      <div>
        {this.state.redirect ? <Navigate to="/"/> :
        <nav className="navbar navbar-expand-lg bg-light">
            <div className="container-fluid">
                <Link className="navbar-brand" to="/navbar">Complaint Application</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                    <li className="nav-item dropdown">
                    <Link className="nav-link dropdown-toggle" to="/" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                        Complaint
                    </Link>
                    <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                        <li>
                            <Link className="dropdown-item" to="add-complaint">Add Complaint</Link>
                            {/* <a className="dropdown-item" href="/add-complaint">Add Complaint</a> */}
                        </li>
                        <li>
                            <Link className="dropdown-item" to="view-complaint">View Complaint</Link>
                            {/* <a className="dropdown-item" href="/view-complaint">View Complaint</a> */}
                        </li>
                    </ul>
                    </li>
                </ul>
                <div className="d-flex">
                  <button className="btn btn-outline-success" style={{marginTop:"0px"}}onClick={this.handleLogout}>Log out</button>
                </div>
                </div>
            </div>
        </nav>
        }
        <Routes>
          {/* <Route path="add-complaint" element={<AddComplaints customer_id={this.state.customer_id} customer_email={this.state.customer_email}/>}></Route> */}
          <Route path="add-complaint" element={<AddComplaints/>}></Route>
          {/* <Route path="add-complaint" element={<AddComplaints token={this.state.accessToken}/>}></Route> */}
          {/* <Route path="view-complaint" element={<ShowComplaints token={this.state.accessToken}/>}></Route> */}
          {/* <Route path="view-complaint" element={<ShowComplaints customer_id={this.state.customer_id} customer_email={this.state.customer_email}/>}></Route> */}
          <Route path="view-complaint" element={<ShowComplaints/>}></Route>
        </Routes>
      </div>
    )
  }
}
