import { HubConnectionBuilder } from '@microsoft/signalr';
import { QRCodeSVG } from 'qrcode.react';
import React, { Component } from 'react';
import { Row, Col } from 'react-bootstrap';
import Checked from '../../../assets/images/checked.png'
import Cano from '../../../assets/images/cano.jpg';
import Seat from './Seat';
class Sologan extends Component {
    constructor(props) {
        super(props);
        this.state = {
            payment: this.props.payment
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
                    if (check) {
                        this.props.setOrderSuccess();
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
            await connection.invoke("joinRoom", { "WebId": KioskId, "RoomId": RoomId });
        } catch (e) {
            console.log(e);
        }
    };
    componentDidMount() {
        this.joinRoom();
    }

    render() {
        if (typeof (this.props.listSeat) !== 'undefined' && this.props.listSeat != null) {
            if (this.props.listSeat.length === 0) {
                return (
                    <div>
                        <img src={Cano} style={{ width: "100%" }} alt="" />
                        <span className='colorAnimation' style={{ textAlign: "center", fontSize: "25px", fontStyle: "italic", fontWeight: "bold", color: "orange" }}>Mua vé ngay, giá trong tầm tay !</span>
                    </div>
                );
            }
            else {
                const elements = this.props.listSeat.map((e) => {
                    if (e.status === "unavailabe")
                        return <Seat description={false} key={e.name} name={e.name} status={e.status} />

                    else
                        return <Seat key={e.name} id={e.id} name={e.name} status={e.status} onSelectedSeat={this.props.onSelectedSeat} />
                }

                );
                if (this.props.payment) {
                    if (!this.props.orderSuccess) {
                        var listSelectedNameUrl = "";
                        var listSelectedIdUrl = "";
                        var listNameSeat = "";
                        this.props.listSelected.map((seat) => {
                            listSelectedIdUrl = listSelectedIdUrl + "&listSeatId[]=" + seat.id;
                            listSelectedNameUrl = listSelectedNameUrl + "&listSeatName[]=" + seat.name;
                            listNameSeat = listNameSeat + seat.name + " - ";
                            return true;
                        });
                        listNameSeat = listNameSeat.slice(0,-3);

                        var confirmUrl = `${window.location.origin}/confirm?route=${this.props.route}&routeId=${this.props.routeId}&date=${this.props.date}&time=${this.props.time}${listSelectedIdUrl}${listSelectedNameUrl}&price=${this.props.price}&kioskId=${localStorage.getItem("KIOSK_ID")}&serviceApplicationId=${localStorage.getItem("SERVICE_APPLICATION_ID")}`;
                        console.log(confirmUrl)
                        return (
                            <div>
                                <Row>
                                    <Col>
                                        <div style={{ width: "100%" }}>
                                            <table className="table" style={{ width: "100%" }}>
                                                <thead className="thead-inverse">
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
                                                        <td>{this.props.route}</td>
                                                        <td>{this.props.date}</td>
                                                        <td>{this.props.time}</td>
                                                        <td>{this.props.price.toLocaleString()}đ</td>
                                                        <td>{this.props.quantity}</td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                        <span style={{display:"inline-block", fontWeight:"bold", fontSize:"25px"}}>Các ghế đã chọn: </span> <br/>
                                        <div style={{height:"15px"}}></div>
                                        <span style={{textAlign:"center", fontSize:"25px", border:"3px solid green", display:"inline", padding:"10px", borderRadius:"15px"}}>{listNameSeat}</span>
                                        <div style={{height:"15px"}}></div>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                        {/* <a href={confirmUrl}>Test</a> */}
                                        <QRCodeSVG
                                            id='qrcode'
                                            value={confirmUrl}
                                            size={400}
                                            level={'H'}
                                            includeMargin={true}
                                        />
                                    </Col>
                                </Row>
                            </div>
                        );
                    } else {

                        return (
                            <div style={{marginTop:"30px"}}>
                                <Row>
                                    <Col>
                                        <h3 style={{fontWeight:"bold"}}>Thanh toán thành công</h3>
                                        <h3 style={{fontWeight:"bold"}}>Chúc quý khách có chuyến đi vui vẻ</h3>
                                        <img alt='success' src={Checked} style={{  width: "25%", marginTop:"25px" }}></img>
                                    </Col>
                                </Row>
                            </div>
                        );
                    }

                }

                else
                    return (
                        <div>
                            <Row>
                                <Col >
                                    <p style={{ display: 'inline-block', float: 'left', fontSize: "17px", paddingTop: "10px" }}>Ghế đã bán:</p>
                                    <Seat description={true} name="X" status="unavailable" /> <br />
                                </Col>
                                <Col>
                                    <p style={{ display: 'inline-block', float: 'left', fontSize: "17px", paddingTop: "10px" }}>Ghế trống : </p>
                                    <Seat description={true} name="X" status="available" />
                                </Col>
                                <Col>
                                    <p style={{ display: 'inline-block', float: 'left', fontSize: "17px", paddingTop: "10px" }}>Ghế đã chọn : </p>
                                    <Seat description={true} name="X" status="selected" />
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <h3 className='fontMainColor' style={{ marginBottom: "8px", marginTop: "10px", fontWeight: "bold" }}>Đầu tàu</h3>
                                    <div style={{ width: "75%", borderBottom: "1px groove grey", display: "inline-block", marginBottom: "15px" }}></div>
                                </Col>
                            </Row>

                            <div className='parent'><div><div className='verticalLine'></div></div>
                                {elements}
                                <div style={{ width: "100%" }}>
                                    <Row style={{ padding: "15px" }}>
                                        <Col>
                                            <span className='fontMainColor' style={{ fontWeight: "bold", fontSize: "22px", height: "25px" }}>
                                                Giá vé: <p style={{ display: "inline-block", color: "black" }}>{this.props.price.toLocaleString()} </p> vnđ / vé
                                            </span>
                                            <span className='fontMainColor' style={{ fontWeight: "bold", fontSize: "22px" }}>
                                                Số lượng: <p style={{ display: "inline-block", color: "black" }}>{this.props.quantity} </p> vé
                                            </span>
                                        </Col>
                                        <Col>
                                            <span className='fontMainColor' style={{ fontWeight: "bold", display: 'inline-block', float: 'right', fontSize: "30px" }}>
                                                Tổng: <p style={{ display: "inline-block", color: "black" }}>{this.props.total.toLocaleString()}</p> vnđ
                                            </span>
                                            <button style={{ float: "right", clear: "both", fontSize: "20px" }} onClick={() => this.props.onClickPayment()} type="button" className="btn btn-primary" >Thanh toán</button>
                                        </Col>
                                    </Row>
                                </div>
                            </div>
                        </div>
                    );
            }
        } else
            <div></div>

    }
}

export default Sologan;
