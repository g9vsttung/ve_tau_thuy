import React, { Component } from 'react';
import { Col, Row } from 'react-bootstrap';
import logo from '../../assets/images/logo.png'
import { HubConnectionBuilder } from '@microsoft/signalr';
import { createOrder } from '../../service/OrderBookingService';
import ReactLoading from 'react-loading';
class Confirm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            finish: false,
            content: "Thanh toán thành công",
            joinSuccess: false
        }
    }
    joinRoom = async () => {
        try {
            const KioskId = localStorage.getItem("KIOSK_ID");
            const RoomId = KioskId;
            const connection = new HubConnectionBuilder()
                //.withUrl(HOST_SIGNALR)
                .withUrl("https://tikap.cf:9931/signalR")
                .build();
            connection.on(
                "WEB_BOOKING_CHANNEL",
                (KioskId, check) => {
                    console.log(check);
                    if (check) {
                        this.setState({
                            finish: true
                        });
                    }
                }
            );
            connection.on(
                "WEB_CONNECTION_CHANNEL",
                (KioskId, messsage) => {
                    console.log(messsage);
                    this.setState({ joinSuccess: true })
                }

            );
            await connection.start();
            await connection.invoke("joinRoom", { "WebId": KioskId, "RoomId": RoomId });
        } catch (e) {
            console.log(e);
        }
    };
    onConfirm = async () => {
        var params = new URLSearchParams(window.location.search);

        var response = await createOrder({
            seatIds: params.getAll("listSeatId[]"),
            routeId: params.get("routeId"),
            stringOnTime: params.get("time"),
            onDate: params.get("date"),
            kioskId: localStorage.getItem("KIOSK_ID"),
            serviceApplicationId: localStorage.getItem("SERVICE_APPLICATION_ID")
        });
        console.log(response)
        if (response === "Đơn đã thanh toán") {
            console.log("check thanh cong")
            this.setState({
                content: "Đơn này đã được thanh toán trước đó!",
                finish: true
            })
        }
    }
    componentDidMount() {
        this.joinRoom();
    }
    render() {
        var params = new URLSearchParams(window.location.search);
        let button;
        if (this.state.joinSuccess) {
            button = <button type="button" name="" id="" className="btn btn-primary" onClick={() => this.onConfirm()}>Xác nhận</button>;
        } else {
            button = <ReactLoading type='bars' color="#e28743" height="30px" />
        }
        if (!this.state.finish)
            return (
                <div>
                    <div>
                        <img alt='logo' src={logo} style={{ marginRight: "20px", height: "35px" }}></img>
                        <p style={{ display: "inline-block", fontSize: "25px", fontStyle: "italic", WebkitTextStroke: "1px white", fontWeight: "bold", color: "rgba(0, 33, 176, 0.8)" }}>Vé Tàu Thủy</p>
                    </div>
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
                                        <td>{params.get("route")}</td>
                                        <td>{params.get("date")}</td>
                                        <td>{params.get("time")}</td>
                                        <td>{params.get("price")}đ</td>
                                        <td>{params.getAll("listSeatId").length}</td>
                                    </tr>
                                </tbody>
                            </table>

                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <div>
                                {button}
                            </div>
                        </Col>
                    </Row>


                </div>
            );
        else
            return (
                <div>
                    <div>
                        <img alt='logo' src={logo} style={{ marginRight: "20px", height: "35px" }}></img>
                        <p style={{ display: "inline-block", fontSize: "25px", fontStyle: "italic", WebkitTextStroke: "1px white", fontWeight: "bold", color: "rgba(0, 33, 176, 0.8)" }}>Vé Tàu Thủy</p>
                    </div>
                    <Row>
                        <Col>
                            <div>
                                <h1 style={{ fontWeight: "bold" }}>{this.state.content}</h1>
                            </div>
                        </Col>
                    </Row>
                </div>
            );
    }
}

export default Confirm;
