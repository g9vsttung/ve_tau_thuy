import React, { Component } from 'react';
import { Row, Col } from 'react-bootstrap';
import Event from './Event';
import FormDetail from './FormDetail';
import Sologan from './Sologan';

class Frame extends Component {
    constructor(props) {
        super(props);
        this.state = {
            listSelected: [],
            listSeat: [],
            price: 0,
            quantity: 0,
            total: 0,
            routeIdForm: "",
            routeForm: "",
            dateForm: "",
            timeForm: "",
        }
    }
    onSelectedSeat = (id, name) => {

        let index = this.state.listSeat.findIndex(s => s.name === name);
        let list = [...this.state.listSeat];
        let seat = this.state.listSeat.find(x => x.name === name);
        console.log(seat);
        if (seat.status === "available") {
            seat.status = "selected";
            list[index] = seat;
            this.setState({ listSeat: [].concat(list), listSelected: this.state.listSelected.concat({id, name}), quantity: this.state.quantity + 1, total: this.state.total + this.state.price });
        } else {
            seat.status = "available";
            list[index] = seat;
            let indexS = this.state.listSelected.findIndex(s => s === name);
            let listS = [...this.state.listSelected];
            listS.splice(indexS, 1);
            this.setState({ listSeat: [].concat(list), listSelected: [].concat(listS), quantity: this.state.quantity - 1, total: this.state.total - this.state.price });
        }
    }
    searchBoat = (list, money, routeId, routeName, date, time) => {
        this.setState({ listSeat: [] });
        this.setState({
            listSeat: [].concat(list), 
            price: money,
            routeIdForm : routeId,
            routeForm : routeName,
            dateForm : date,
            timeForm :time
        });
    }
    render() {
        console.log(this.state.listSelected)
        return (
            <div>
                <Row>
                    <Col></Col>
                    <Col sm={9} style={{ padding: "0px 0px 0px 0px" }}>
                        <div style={{ width: "100%", backgroundColor: "white", padding: "30px 30px 30px 30px", height: "1000px", display: "block" }}>
                            <Row>
                                <Col sm={3}>
                                    <FormDetail searchBoat={this.searchBoat} />
                                </Col>
                                <Col>
                                    <Sologan routeId={this.state.routeIdForm} route={this.state.routeForm} date={this.state.dateForm} time={this.state.timeForm} quantity={this.state.quantity} price={this.state.price} total={this.state.total} listSeat={this.state.listSeat} listSelected={this.state.listSelected} onSelectedSeat={this.onSelectedSeat} />
                                </Col>
                                <Col sm={3}>
                                    <Event />
                                </Col>
                            </Row>

                        </div>
                    </Col>
                    <Col></Col>
                </Row>
            </div>
        );
    }
}

export default Frame;
