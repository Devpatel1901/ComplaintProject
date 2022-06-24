import React, { Component } from 'react'
import './Add_complaint.css';
import axios from 'axios';
// import { Link } from 'react-router-dom';
import config from "./config";
import { Navigate } from 'react-router-dom';
import swal from "sweetalert";

export default class add_complaint extends Component {
    constructor(){
        super()
        this.state = {
            prod_id: 0,
            complaint_description: "",
            customer_id: 0,
            machine_no: 0,
            branch_id: 0,
            branch_name: "",
            complain_id: 0,
            complain_name: "",
            customer_name: "",
            product_data: [],
            branch_data:[],
            complainList: [],
            redirect: false,
        };
    }

    componentDidMount(){
        // console.log(this.props.customer_id);
        console.log(localStorage.getItem('customer_id'));
        // console.log(localStorage.getItem('customer_email'));
        // if(localStorage.getItem('customer_id')){

            axios.post(config.SERVER+"/complaint/get_cinfo",{customer_id:localStorage.getItem('customer_id')}).then((res) => {
                console.log("Customer Data:- ",res.data);
                this.setState({...this.state,customer_name: res.data[0].CustomerName});
            }).catch((e)=>{
                swal("Internal Server Error", {
                    icon: "warning",
                });
            })
    
            axios.get(config.SERVER+"/complaint/get_pinfo").then((res1) => {
                this.setState({...this.state,product_data: res1.data})
            }).catch((e)=>{
                swal("Internal Server Error", {
                    icon: "warning",
                });
            })
    
            axios.post(config.SERVER+"/complaint/get_branchinfo",{customer_id:localStorage.getItem('customer_id')}).then((res1) => {
                console.log("Branch Data:- ",res1.data);
                this.setState({...this.state,branch_data: res1.data})
            }).catch((e)=>{
                swal("Internal Server Error", {
                    icon: "warning",
                });
            })
    
            axios.get(config.SERVER+"/complaint/get-complain").then((res1) => {
                this.setState({...this.state,complainList: res1.data})
            }).catch((e)=>{
                swal("Internal Server Error", {
                    icon: "warning",
                });
            })
        // }else{
        //         swal("Login Again", {
        //           icon: "warning",
        //         });
        //         this.setState({
        //             redirect:true
        //         })
        // }


    }

    handleSubmit = (e) => {
        e.preventDefault();
        console.log(this.state);
        axios.post(config.SERVER+"/complaint/add_complaint", {prod_id : this.state.prod_id, complaint_description: this.state.complaint_description, customer_id: this.state.customer_id,machine_no: this.state.machine_no,branch_id: this.state.branch_id,complain_id:this.state.complain_id,complain_name:this.state.complain_name,branch_name:this.state.branch_name,customer_email:localStorage.getItem('customer_email')},{withCredentials: true})
            .then((res) => {
                if(res.data.message !== "Error"){
                    swal(`Complaint Registered.Please Note the Ticket Number: ${res.data.result.insertId}`, {
                        icon: "success",
                    });
                }else{
                    swal("Internal Server Error",{
                        icon:"warning",
                    })
                }
                console.log(res);
            })
            .catch((err)=>{
                    swal("Internal Server Error", {
                        icon: "warning",
                    });
            })
    }

  render() {
    return (
        <>
        {this.state.redirect ? <Navigate to="/"/> : 
    <div className="container">
        <div className=" text-center mt-5">
            <h1>Complaint Form</h1>
        </div>
        <div className="row">
            <div className="col-lg-7 mx-auto">
            <div className="card mt-2 mx-auto p-4 bg-light">
            <div className="card-body bg-light">
            <div className = "container">
                <form id="contact-form" onSubmit={this.handleSubmit} role="form">
                <div className="controls">
                    <div className="row">
                        <div className="col-md-6">
                            <div className="form-group">
                                    <label htmlFor="form_need">Product Name </label>
                                    <select className="form-control" name={"prod"} onChange={(e) => {this.state.prod_id = e.target.value}} required>
                                    <option value="" selected disabled>--Please Select Your Product--</option>
                                        {this.state.product_data.map((x) => {
                                            return (<option key={x.ProductID} value={x.ProductID}> {x.ProductName} </option>)
                                        })}
                                    </select>
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="form-group">
                                    <label htmlFor="form_need">Customer Name </label>
                                    <input type="text" value={this.state.customer_name} className="form-control" readOnly/>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-6">
                            <div className="form-group">
                                <label htmlFor="form_name">Customer Branch </label>
                                <select className="form-control" id="branch_id" name="branch_id" onChange={(e)=>{
                                    var element = document.getElementById("branch_id");
                                    var text=element.options[element.selectedIndex].text;
                                    console.log(text);
                                    this.setState({branch_id:e.target.value,branch_name:text})
                                    }} required>
                                        <option value="" selected disabled>--Please Select Your Branch--</option>
                                        {this.state.branch_data.map((x) => {
                                            return (<option key={x.CustomerBranchID} value={x.CustomerBranchID}> {x.BranchName} </option>)
                                        })}
                                </select>
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="form-group">
                                <label htmlFor="form_name">Machine No. </label>
                                <input id="form_name" type="number" name="machine_no" className="form-control" onChange={(e) => {this.setState({machine_no: e.target.value})}}/>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-12">
                            <label htmlFor="exampleFormControlTextarea1">Select Complain</label>
                            <select className="form-control" id="complain_id" name="complain_id" onChange={(e)=>{
                                var element = document.getElementById("complain_id");
                                var text=element.options[element.selectedIndex].text;
                                console.log(text);
                                this.setState({complain_id:e.target.value,complain_name:text})
                                }} required>
                                        <option value="" selected disabled>--Please Select Your Complaint--</option>
                                        {this.state.complainList.map((x) => {
                                            return (<option value={x.ComplainID} key={x.ComplainID}> {x.ComplainDescription} </option>)
                                        })}
                            </select>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-12">
                            <label htmlFor="exampleFormControlTextarea1">Complaint Description</label>
                            <textarea className="form-control" rows="3" onChange={(e) => {this.setState({complaint_description: e.target.value})}}></textarea>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-12">
                            <input type="submit" className="btn btn-success btn-send  pt-2 btn-block my-4" value="Submit The Compliant" style={{width:"100%"}} />
                        </div>
                    </div>
                </div>
                </form>
            </div>
            </div>
            </div>
            </div>
        </div>
        </div>}
        </>
    )
  }
}