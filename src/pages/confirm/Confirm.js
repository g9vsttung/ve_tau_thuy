import React, { Component } from 'react';
import { Col, Row } from 'react-bootstrap';
import logo from '../../assets/images/logo.png'
import { HubConnectionBuilder } from '@microsoft/signalr';
import { createOrder } from '../../service/OrderBookingService';

class Confirm extends Component {
    constructor(props) {
        super(props);
        this.state={
            finish : false
        }
    }
    joinRoom = async () => {
        try {
          const KioskId = localStorage.getItem("KIOSK_ID");
          const RoomId = KioskId;
          const connection = new HubConnectionBuilder()
            //.withUrl(HOST_SIGNALR)
            .withUrl("https://localhost:5001/signalR")
            .build();
          connection.on(
            "WEB_BOOKING_CHANNEL",
            (KioskId, check) => {
                console.log(check);
                if(check){
                    this.setState({
                        finish:true
                      });
                }
            }     
          );
          connection.on(
            "WEB_CONNECTION_CHANNEL",
            (KioskId, messsage) => {
                console.log(messsage);   
            }
            
          );
          await connection.start();
          await connection.invoke("joinRoom", { "WebId":KioskId,"RoomId":RoomId} );
        } catch (e) {
          console.log(e);
        }
      };
    onConfirm = async () =>{
        var params = new URLSearchParams(window.location.search);
        
        await createOrder({
            seatIds : params.getAll("listSeatId[]"),
            routeId : params.get("routeId"),
            stringOnTime : params.get("time"),
            onDate : params.get("date"),
            kioskId : localStorage.getItem("KIOSK_ID"),
            serviceApplicationId : localStorage.getItem("SERVICE_APPLICATION_ID")
        })
    }
    componentDidMount(){
        this.joinRoom();
    }
    render() {
        var params = new URLSearchParams(window.location.search);
        if(!this.state.finish)
        return (
            <div>
                <a>
                    <img src={logo} style={{ marginRight: "20px", height: "35px" }}></img>
                    <p style={{ display: "inline-block", fontSize: "25px", fontStyle: "italic", WebkitTextStroke: "1px white", fontWeight: "bold", color: "rgba(0, 33, 176, 0.8)" }}>Vé Tàu Thủy</p>
                </a>
                <Row>
                    <Col>
                       
                        <table className="table">
                            <thead >
                                <tr>
                                    <th >Tuyến đi</th>
                                    <th>Ngày</th>
                                    <th>Giờ</th>
                                    <th>Giá</th>
                                    <th>Số vé</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td scope="row">{params.get("route")}</td>
                                    <td>{params.get("date")}</td>
                                    <td>{params.get("time")}</td>
                                    <td>{params.get("price")}đ</td>
                                    <td>{params.getAll("listSeatId").length}</td>
                                </tr>
                            </tbody>
                        </table>
                        
                    </Col>
                </Row>
                <div>
                <button type="button" name="" id="" className="btn btn-primary" onClick={() => this.onConfirm()}>Xác nhận</button>
                </div>
            </div>
        );
        else
        return(
            <div>
                <a>
                    <img src={logo} style={{ marginRight: "20px", height: "35px" }}></img>
                    <p style={{ display: "inline-block", fontSize: "25px", fontStyle: "italic", WebkitTextStroke: "1px white", fontWeight: "bold", color: "rgba(0, 33, 176, 0.8)" }}>Vé Tàu Thủy</p>
                </a>
                <Row>
                    <Col>
                        <div>
                            <h1 style={{fontWeight:"bold"}}>Thanh toán thành công</h1>
                        </div>
                    </Col>
                </Row>
            </div>
        );
    }
}

export default Confirm;
