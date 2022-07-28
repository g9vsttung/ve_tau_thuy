import React, { Component } from 'react';
import { Col, Row } from 'react-bootstrap';
import logo from '../../assets/images/logo.png'

class Confirm extends Component {
    render() {
        var params = new URLSearchParams(window.location.search);
        return (
            <div>
                <a>
                    <img src={logo} style={{ marginRight: "20px", height: "35px" }}></img>
                    <p style={{ display: "inline-block", fontSize: "25px", fontStyle: "italic", WebkitTextStroke: "1px white", fontWeight: "bold", color: "rgba(0, 33, 176, 0.8)" }}>Vé Tàu Thủy</p>
                </a>
            <Row>
                <Col>
                b4-ta
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
                                <td>{params.getAll("lisstSeatId").length}</td>
                            </tr>
                        </tbody>
                    </table>
                </Col>
            </Row>
                <div>
                    
                </div>
            </div>
        );
    }
}

export default Confirm;
