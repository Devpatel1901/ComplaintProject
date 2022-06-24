import axios from 'axios';
import React, { Component } from 'react'
import "./ShowComplaints.css";
import config from "./config";
import { Navigate } from 'react-router-dom';
import swal from "sweetalert";

export default class ShowComplaints extends Component {
    constructor(props)
    {
        super(props);
        this.state={
            complaintList: [],
            Chats: [],
            note: "",
            complaint_id: 0,
            complaintListFilter: [],
            redirect: false,
        }
    }

    componentDidMount()
    {
        // console.log(this.props);
        // if(this.props.customer_id){
            axios.post(config.SERVER+"/complaint/get-customer-complaint",{customerid: localStorage.getItem('customer_id')})    
                .then((res)=>{
                    console.log(res.data);
                    this.setState({
                        complaintList: res.data,
                        complaintListFilter: res.data
                    })
                })
                .catch((err)=>{
                    swal("Internal Server Error", {
                        icon: "warning",
                    });
                })
        // }else{
        //     axios.get(config.SERVER+"/complaint/logout",{withCredentials:true})
        //     .then((response)=>{
        //         if(response.data.message === "Success"){
        //             swal("Login Again", {
        //                 icon: "warning",
        //             });
        //             this.setState({redirect:true});
        //         }
        //     })
        //     .catch((e)=>{
        //         swal("Internal Server Error", {
        //             icon: "warning",
        //         });
        //     })
        // }
    }

    GetChats = (complaintID) => {
        // console.log(complaintID);
        this.setState({
            complaint_id: complaintID
        })
        axios.post(config.SERVER+"/complaint/get-user-chats",{complaint_id: complaintID},{withCredentials:true})
            .then((res)=>{
                // console.log(res.data);
                this.setState({
                    ...this.state,
                    Chats: res.data,
                })
            })
            .catch((err)=>{
                console.log(err);
            })
    }

    handleNote = () => {
        var chat = document.getElementById('note').innerHTML;
        console.log(this.state);
        axios.post(config.SERVER+"/complaint/add-note",{note:chat,complaint_id:this.state.complaint_id,customerid: this.props.customer_id},{withCredentials:true})
            .then((res)=>{
                // console.log(res.data);
                this.GetChats(this.state.complaint_id);
                document.getElementById('note').innerHTML = "";
            })
            .catch((err)=>{
                console.log(err);
            })
    }

    handleListBoxChange = (e) => {
        // console.log(typeof(e.target.value));
        if(e.target.value === "-1")
        {
            this.setState({
                // ...this.state,
                complaintListFilter: this.state.complaintList,
            })
        }else{
            var arr = [];
            for (var i = 0 ; i < this.state.complaintList.length ; i++)
            {
                if(this.state.complaintList[i].MachineNo === e.target.value)
                {
                    arr.push(this.state.complaintList[i]);
                }
            }
            this.setState({
                ...this.state,
                complaintListFilter: arr,
            })

        }
    }
  render() {
    return (
        <> 
        {this.state.redirect ? <Navigate to="/"/> : 
        <div>
        <h1 className="text-center my-2">View Complaints</h1>
        <div className="container py-5" style={{display: "flex",justifyContent:"center"}}>
            <div className="row">
                <div className="col-lg-3">
                    <label for="sel2" className="form-label">Machine Select: </label>
                        <select multiple className="form-select" name="filter" onChange={this.handleListBoxChange}>
                            <option value="-1">Select All</option>
                            {this.state.complaintList.map((e,key)=>{
                                return(
                                    <option value={e.MachineNo}>{e.MachineNo}</option>
                                )
                            })}
                    </select>
                </div>
                <div className="col-lg-9 mx-auto">
                    <ul className="list-group shadow text-center my-3">
                        {this.state.complaintListFilter.map((e,key)=>{
                            console.log(key);
                            return(<li className="list-group-item">
                                <div className="media align-items-lg-center flex-column flex-lg-row p-3">
                                <div className="media-body order-2 order-lg-1">
                                    <h3 className="mt-0 font-weight-bold mb-2 text-primary">Ticket No. #{e.ComplaintID}</h3>
                                    <p className="font-italic mb-0 medium">Product Name: {e.ProductName}</p>
                                    <p className="font-italic mb-0 medium">Customer Branch Name: {e.BranchName}</p>
                                    <p className="font-italic mb-0 medium">Machine No: {e.MachineNo}</p>
                                    <p className="font-italic mb-0 medium">Complaint Description: {e.ComplaintDescription}</p>
                                </div>
                                </div>
                                <button type="button" className="btn btn-success" data-bs-toggle="modal" data-bs-target="#exampleModal" data-bs-whatever="@mdo" onClick={()=>this.GetChats(e.ComplaintID)}>Add Note</button>
                            </li>)
                        })}
                    </ul>
                </div>
                <div className="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog modal-dialog-scrollable">
                        <div className="modal-content">
                            <div className="page-content page-container" id="page-content" style={{overflowY:"auto"}}>
                                    <div className="row container d-flex justify-content-center">
                                        <div className="col-md-12">
                                            <div className="card card-bordered">
                                                <div className="card-header">
                                                    <h4 className="card-title"><strong>Chat</strong></h4>
                                                </div>


                                                <div className="ps-container ps-theme-default ps-active-y" id="chat-content" style={{overflowY: "scroll !important" ,height:"400px !important"}}>

                                                            {this.state.Chats.map((e)=>{
                                                                if(e.EmployeeID === 0)
                                                                {
                                                                    return(
                                                                        <>
                                                                        <div className="media media-chat" style={{textAlign:"right"}}>
                                                                                <span style={{color:"#48b0f7"}}>{e.ReplyDescription}</span>
                                                                                <br/>
                                                                                <small style={{color:"black"}}><time>{e.ReplyDate.slice(11,16)} {e.ReplyDate.slice(11,13) < 12 ? "A.M." : "P.M."}</time></small>
                                                                            </div>
                                                                        </>
                                                                    )
                                                                }else{
                                                                    return(
                                                                        <>
                                                                        <div className="media media-chat" style={{textAlign:"left"}}>
                                                                                <span style={{color:"#48b0f7"}}>{e.ReplyDescription}</span>
                                                                                <br/>
                                                                                <small style={{color:"black"}}><time>{e.ReplyDate.slice(11,16)} {e.ReplyDate.slice(11,13) < 12 ? "A.M." : "P.M."}</time></small>
                                                                            </div>
                                                                        </>
                                                                    )
                                                                }
                                                            })}

                                                    </div>

                                                    {/* <div className="publisher bt-1 border-light">
                                                        <textarea className="publisher-input" row="3" column="40" style={{resize:"none"}} name="note" value={this.state.note} onMouseMove={this.handleSelection} onChange={(e)=>{this.setState({note:e.target.value})}} id="note" placeholder="Write something"/>
                                                        <i className='bx bx-bold' onClick={this.handleEditingClick}></i>
                                                        <i className='bx bx-italic' onClick={this.handleEditingClick}></i>
                                                        <i className='bx bx-underline' onClick={this.handleEditingClick}></i>
                                                        <i className='bx bxs-send' onClick={this.handleNote}></i>
                                                    </div> */}

                                                    <div className="publisher bt-1 border-light">
                                                    <div id="note" className="publisher-input" onChange={(e)=>{this.setState({note:e.target.value})}} contenteditable="true"></div>
                                                    <button className="plain-button" onClick={()=> document.execCommand('bold')}><i className='bx bx-bold'></i></button>
                                                    <button className="plain-button"onClick={()=> document.execCommand('italic')}><i className='bx bx-italic'></i></button>
                                                    <button className="plain-button" onClick={()=> document.execCommand('underline')}> <i className='bx bx-underline'></i></button>
                                                    <i className='bx bxs-send' onClick={this.handleNote}></i>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
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
