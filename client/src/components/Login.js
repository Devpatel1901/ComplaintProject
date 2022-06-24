import axios from 'axios';
import React, { Component } from 'react'
import { Navigate} from 'react-router-dom';
import "./Login.css";
import config from "./config";
import swal from "sweetalert";

export default class Login extends Component {
    constructor()
    {
        super();
        this.state={
            customer_email: "",
            password: "",
            redirect: false,
            customer_id: 0,
        }
    }

    handleonchange = (e) =>{
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleSubmit = (e) =>{
        e.preventDefault();
        console.log(this.state);
        axios.post(config.SERVER+"/complaint/login",this.state,{withCredentials:true})
            .then((res)=>{
                console.log(res);
                if(res.data.message === "Successfull Login")
                {
                    this.setState({
                        redirect: true,
                        customer_id: res.data.CustomerID
                    })
                }else if(res.data.message === "Wrong Username/Password Combination"){
                    swal(res.data.message, {
                        icon: "warning",
                    });
                }else if(res.data.message === "User doesn't exist"){
                    swal(res.data.message, {
                        icon: "warning",
                    });
                }
            })
            .catch((err)=>{
                swal("Internal Server Error", {
                    icon: "warning",
                });
            })
    }
  render() {
    return (
    // <div>
    //     {this.state.redirect ? <Navigate to="/navbar"/> : 
    //     <div className="global-container" style={{backgroundColor:"#f5f5f5"}}>
    //         <div className="card login-form">
    //         <div className="card-body">
    //             <h3 className="card-title text-center">Log in</h3>
    //             <div className="card-text">
    //                 {/* <div className="alert alert-danger alert-dismissible fade show" role="alert">Incorrect username or password.</div> */}
    //                 <form onSubmit={this.handleSubmit}>
    //                     <div className="form-group">
    //                         <label for="exampleInputEmail1">Email address</label>
    //                         <input type="email" className="form-control" name="customer_email" onChange={this.handleonchange} aria-describedby="emailHelp"/>
    //                     </div>
    //                     <div className="form-group">
    //                         <label for="exampleInputPassword1">Password</label>
    //                         <input type="password" className="form-control" name='password' onChange={this.handleonchange}/>
    //                     </div>
    //                     <button type="submit" className="btn btn-primary btn-block">Sign in</button>
    //                 </form>
    //             </div>
    //         </div>
    //     </div>
    //     </div>}
    // </div>
//     <>
//     {this.state.redirect ? <Navigate to="/navbar"/> : 
//     <div className="container">
//     <div className="row">
//       <div className="col-md-6 offset-md-3">
//         <h2 className="text-center text-dark mt-5">Login Form</h2>
//         <div className="card my-5">

//           <form className="card-body cardbody-color p-lg-5" onSubmit={this.handleSubmit}>

//             <div className="text-center">
//               <img src="https://www.logodesign.net/image/finance-bar-chart-with-arrow-in-square-2852ld" className="img-fluid profile-image-pic img-thumbnail rounded-circle my-3" width="200px" alt="profile"/>
//             </div>

//             <div className="mb-3">
//               <input type="email" className="form-control" name="customer_email" onChange={this.handleonchange} aria-describedby="emailHelp" placeholder="Email Address"/>
//             </div>
//             <div className="mb-3">
//               <input type="password" className="form-control" name='password' onChange={this.handleonchange} placeholder="Password"/>
//             </div>
//             <div className="text-center"><button type="submit" className="btn btn-color px-5 mb-5 w-100">Login</button></div>
//           </form>
//         </div>

//       </div>
//     </div>
//   </div>}
//   </>
<>
{this.state.redirect ? <Navigate to="/navbar"/>:
<form onSubmit={this.handleSubmit}>

<div className="container-fluid px-1 px-md-5 px-lg-1 px-xl-5 py-5 mx-auto" style={{margin:"73px"}}>
    <div className="card card0 border-0">
        <div className="row d-flex">
            <div className="col-lg-6">
                <div className="card1 pb-5">
                    <div className="row">
                        <img src="https://i.imgur.com/CXQmsmF.png" className="logo"/>
                    </div>
                    <div className="row px-3 justify-content-center mt-4 mb-5 border-line">
                        <img src="https://i.imgur.com/uNGdWHi.png" className="image"/>
                    </div>
                </div>
            </div>
            <div className="col-lg-6">
                <div className="card2 card border-0 px-4 py-5">
                    <div className="row mb-4 px-3">
                        {/* <h6 className="mb-0 mr-4 mt-2">Log in with</h6> */}
                    </div>
                    <div className="row px-3 mb-4">
                        <div className="line"></div>
                        <small className="or text-center">Log In</small>
                        <div className="line"></div>
                    </div>
                    <div className="row px-3">
                        <label className="mb-1"><h6 className="mb-0 text-sm">Email Address</h6></label>
                        <input className="mb-4" type="email" name="customer_email" onChange={this.handleonchange} placeholder="Enter a valid email address"/>
                    </div>
                    <div className="row px-3">
                        <label className="mb-1"><h6 className="mb-0 text-sm">Password</h6></label>
                        <input type="password" name='password' onChange={this.handleonchange} placeholder="Enter a valid password"/>
                    </div>
                    <div className="row px-3 mb-4">
                    </div>
                    <div className="row mb-3 px-3">
                        <button type="submit" className="btn btn-blue text-center">Login</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
</form>}
</>
    )
  }
}
