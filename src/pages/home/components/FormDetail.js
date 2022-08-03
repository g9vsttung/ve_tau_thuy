import { DatePicker, TimePicker } from 'antd';
import 'antd/dist/antd.css';
import React, { Component } from 'react';
import moment from 'moment';
import {getAllSeat} from "../../../service/SeatService"
import {getAllService} from "../../../service/RouteService"




class FormDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            routeIdForm: "",
            routeForm:"",
            dateForm: "",
            timeForm: "",
            time:"",
            routes:[],
            price:0
        }

    }
    async componentDidMount(){
        const routes = await getAllService();
        this.setState({routes});                                                                                                                                                                                                                                                
    }
    getDisabledHours = () => {
        var hours = [];
        for(var i =0; i <= moment().hour(); i++){
            hours.push(i);
        }
        return hours;
    }
    render() {
        const onDateChange = (date, dateString) => {
            this.setState({ dateForm: dateString });
        };
        function disabledDate(current) {
            // Can not select days before today 
            return current && current.valueOf() < moment().subtract(1, "days");
        }
        const onClickSearch= async ()=>{
            var list = await getAllSeat(this.state.dateForm, this.state.timeForm, this.state.routeIdForm);          
             this.props.searchBoat(list, this.state.price, this.state.routeIdForm, this.state.routeForm, this.state.dateForm, this.state.timeForm);
        }
        const onClickSelectRoute=(id, name, money)=>{
            document.getElementById('triggerId').innerHTML = name;
            this.setState({routeIdForm: id, price: money, routeForm: name});
        }
        const elements =this.state.routes.map((e)=>{
            return <a key={e.id} className="dropdown-item" href="#" onClick={()=>onClickSelectRoute(e.id, e.fromPlace+"-"+e.toPlace, e.price)}>{e.fromPlace}-{e.toPlace}</a>
        } );
        return (
            <div id='formDetail'>
                <div style={{ backgroundColor: "rgba(0, 0, 0, 0.11)", paddingTop: "5px", borderBottom: "5px solid rgba(0, 0, 143, 1)" }}>
                    <h5 className='fontMainColor' style={{display:"inline-block"}}>Thông tin hành trình</h5>
                    <i className="fas fa-bars" style={{color:"rgba(0, 0, 143, 1)", display:"inline-block",float:"left",marginTop:"5px",marginLeft:"8px", fontSize:"1.25rem",position:"relative"}}></i>
                </div>

                <div style={{ padding: "15px", float: "left" , width:"100%"}}>
                    <span className="fontMainColor">Tuyến đi: </span>
                    <div className="btn-group" style={{ marginBottom: "10px",width:"100%"}}>
                        <div className='dropDownButton'>
                            <button className="btn btn-block dropdown-toggle " type="button" id="triggerId" data-toggle="dropdown" aria-haspopup="true"
                                aria-expanded="false" >
                                -- Chọn tuyến tàu --
                            </button>
                            <div className="dropdown-menu dropdown-menu-right" aria-labelledby="triggerId">                               
                                {elements}
                            </div>
                        </div>
                    </div>
                    <span className="fontMainColor">Ngày khởi hành: </span>
                    <DatePicker style={{ width: "100%", marginBottom: "10px" }} onChange={onDateChange} disabledDate={disabledDate} />
                    <span className="fontMainColor">Giờ khởi hành: </span>
                    <TimePicker format="HH" showNow={false} value={this.state.time} style={{ width: "100%", marginBottom: "20px" }} onSelect={(value) => {
                        const timeString = moment(value).format("HH:mm:ss");
                        this.setState({ timeForm: timeString });
                        this.setState({ time: value });
                    }} />
                    <div>
                        <input className="btn btn-primary" type="button" value="Tìm kiếm" onClick={()=>onClickSearch()} />
                    </div>
                </div>


            </div>
        );
    }
}

export default FormDetail;
