import React, { Component } from 'react';
import { Row, Col } from 'react-bootstrap';
import logo from '../../../assets/images/logo.png';

class Header extends Component {
    render() {
        return (
            <div style={{marginTop:"30px"}}>
                <a>
                    <img src={logo} style={{ marginRight: "20px", height: "150px" }}></img>
                    <p style={{ display: "inline-block", fontSize: "50px", fontStyle: "italic", WebkitTextStroke: "1px white", fontWeight: "bold", color: "rgba(0, 33, 176, 0.8)" }}>Vé Tàu Thủy</p>
                </a>
                <Row style={{marginTop:"50px"}}>
                    <Col></Col>
                    <Col md={9}>
                        <Row>
                            <Col style={{ padding: "0px 0px 0px 0px" }}>
                                <h5 style={{ padding: "10px 10px 10px 10px", backgroundColor: "rgba(0, 0, 143, 1)", marginLeft: "1px", borderTopLeftRadius:"10px",borderBottomLeftRadius:"10px" }}>
                                    <a href='' target={"_parent"} style={{ color: "white" }}>ĐẶT VÉ</a>
                                </h5>
                            </Col>
                            <Col style={{ padding: "0px 0px 0px 0px" }}>
                                <h5 style={{ padding: "10px 0px 10px 0px", backgroundColor: "rgba(0, 0, 143, 1)", marginLeft: "1px" }}>
                                    <a href='' target={"_parent"} style={{ color: "white" }}>QUY ĐỊNH</a>
                                </h5>
                            </Col>
                            <Col style={{ padding: "0px 0px 0px 0px" }}>
                                <h5 style={{ padding: "10px 10px 10px 10px", backgroundColor: "rgba(0, 0, 143, 1)", marginLeft: "1px" }}>
                                    <a href='' target={"_parent"} style={{ color: "white" }}>HƯỚNG DẪN</a>
                                </h5>
                            </Col>
                            <Col style={{ padding: "0px 0px 0px 0px" }}>
                                <h5 style={{ padding: "10px 10px 10px 10px", backgroundColor: "rgba(0, 0, 143, 1)", marginLeft: "1px", borderTopRightRadius:"10px", borderBottomRightRadius:"10px" }}>
                                    <a href='' target={"_parent"} style={{ color: "white" }}>LIÊN HỆ</a>
                                </h5>
                            </Col>
                        </Row>

                    </Col>
                    <Col></Col>
                </Row>



            </div>
        );
    }
}

export default Header;
