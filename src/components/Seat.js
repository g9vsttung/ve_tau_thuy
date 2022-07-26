import React, { Component } from 'react';

class Seat extends Component {

    constructor(props) {
        super(props);
        // this.state = {
        //     color: "red"
        // }
    }

    render() {
        if (this.props.description === true) {
            if (this.props.status === "unavailable")

            return (

                <div style={{ justifyContent: "center", display: "inline-block",float: 'left', alignItems: "center", border: "1px groove grey", borderBottom: "7px solid black", borderTopLeftRadius: "15px", borderTopRightRadius: "15px", backgroundColor: "red" }}>
                    <p style={{ fontSize: "smaller", margin: "5px", fontWeight: "bold" , paddingLeft:"10px", paddingRight:"10px" }}>{this.props.name}</p>
                </div>
            );
        else
            return (

                <div style={{ justifyContent: "center",  display: "inline-block",float: 'left', alignItems: "center", border: "1px groove grey", borderBottom: "7px solid black", borderTopLeftRadius: "15px", borderTopRightRadius: "15px", backgroundColor: this.props.status === "available" ? "rgba(0, 0, 0, 0.11)" : "rgba(183, 247, 190, 0.8)" }}>
                    <p style={{ fontSize: "smaller", margin: "5px", fontWeight: "bold", paddingLeft:"10px", paddingRight:"10px" }}>{this.props.name}</p>
                </div>
            );
        } else
            if (this.props.status === "unavailable")

                return (

                    <div className='child' style={{ justifyContent: "center", display: "flex", alignItems: "center", width: "8%", border: "1px groove grey", borderBottom: "7px solid black", borderTopLeftRadius: "15px", borderTopRightRadius: "15px", backgroundColor: "red" }}>
                        <p style={{ fontSize: "smaller", margin: "5px", fontWeight: "bold" }}>{this.props.name}</p>
                    </div>
                );
            else
                return (

                    <div className='child' onClick={() => this.props.onSelectedSeat(this.props.name)} style={{ justifyContent: "center", display: "flex", alignItems: "center", width: "8%", border: "1px groove grey", borderBottom: "7px solid black", borderTopLeftRadius: "15px", borderTopRightRadius: "15px", backgroundColor: this.props.status === "available" ? "rgba(0, 0, 0, 0.11)" : "rgba(183, 247, 190, 0.8)" }}>
                        <p style={{ fontSize: "smaller", margin: "5px", fontWeight: "bold" }}>{this.props.name}</p>
                    </div>
                );

    }
}

export default Seat;
