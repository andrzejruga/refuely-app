import React from 'react';
import { Button, FormGroup, Label, Input } from 'reactstrap';

class RefuelForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            literPrice: "",
            numberOfLiters: "",
            totalPrice: "",
            numberOfKms: "",
            date: "",
            averageConsumption: "",
            costPer100: "",
            resultsArray: [
                {
                    meter: 0,
                    liters: 0,
                    totalprice: 0,
                    literprice: 0,
                    date: "",
                    averageConsumption: "",
                    costPer100: ""
                }
            ]
        }
    }

    updateUi = () => {
        if (this.state.literPrice.length > 0 && this.state.numberOfLiters.length > 0) {
            const totPri = (this.state.literPrice * this.state.numberOfLiters);
            this.setState({
                totalPrice: totPri
            })
        } else if (this.state.totalPrice.length > 0 && this.state.numberOfLiters.length > 0) {
            const litPri = (this.state.totalPrice / this.state.numberOfLiters);
            this.setState({
                literPrice: litPri
            })
        }
        const averageConsumption = (this.state.numberOfLiters / ((this.state.numberOfKms - (this.state.resultsArray.length > 0 ? this.state.resultsArray[this.state.resultsArray.length-1].meter : 0)) / 100)).toFixed(2);
        const costPer100 = (this.state.totalPrice / ((this.state.numberOfKms - (this.state.resultsArray.length > 0 ? this.state.resultsArray[this.state.resultsArray.length-1].meter : 0)) / 100)).toFixed(2);

        this.setState({
            averageConsumption,
            costPer100
        });
        this.props.updateLatestResults(averageConsumption, costPer100);
    };

    changeHandler = event => {
        this.setState({
            [event.target.name]: event.target.value,
            averageConsumption: this.state.averageConsumption,
            costPer100: this.state.costPer100
        }, this.updateUi);
    };

    setResults = event => {
        const newResult = {
            meter: this.state.numberOfKms,
            liters: this.state.numberOfLiters,
            totalprice: parseFloat(this.state.totalPrice).toFixed(2),
            literprice: parseFloat(this.state.literPrice).toFixed(2),
            date: this.state.date,
            averageConsumption: this.state.averageConsumption,
            costPer100: this.state.costPer100
        };
        const resultsArray = [...this.state.resultsArray, newResult];
        localStorage.setItem('results', JSON.stringify(resultsArray));
        this.setState({
            resultsArray
        }, this.props.localStorageDidUpdate);
        this.setState({
            literPrice: "",
            numberOfLiters: "",
            totalPrice: "",
            numberOfKms: "",
            date: ""
        });
    };

    render() {
        return (
            <div>
                <div className="container">
                    <h1>reFuely App</h1>
                    <div className="row">
                        <div className="col-sm">
                            <FormGroup>
                                <Label for="meter">Odometer state (kilometers)</Label>
                                <Input onChange={this.changeHandler} type="number" name="numberOfKms" id="meter" placeholder="enter meter value from the moment you refueled" value={this.state.numberOfKms}/>
                            </FormGroup>
                        </div>
                        <div className="col-sm">
                            <FormGroup>
                                <Label for="liters">Number of liters</Label>
                                <Input onChange={this.changeHandler} type="number" name="numberOfLiters" id="liters" placeholder="enter how many liters did you refuel" value={this.state.numberOfLiters}/>
                            </FormGroup>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-sm">
                            <FormGroup>
                                <Label for="total-price">Total price</Label>
                                <Input onChange={this.changeHandler} type="number" name="totalPrice" id="total-price" placeholder="enter total price OR" value={this.state.totalPrice}/>
                            </FormGroup>
                        </div>
                        <div className="col-sm">
                            <FormGroup>
                                <Label for="liter-price">Price per liter</Label>
                                <Input onChange={this.changeHandler} type="number" name="literPrice" id="liter-price" placeholder="enter price per liter" value={this.state.literPrice}/>
                            </FormGroup>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-sm">
                            <FormGroup>
                                <Label for="exampleDate">Date</Label>
                                <Input onChange={this.changeHandler} type="date" name="date" id="exampleDate" placeholder="date placeholder" value={this.state.date}/>
                            </FormGroup>
                        </div>
                        <div className="col-sm btn-cell">
                            <Button className="btn" color="info" onClick={this.setResults}>Submit</Button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default RefuelForm;