import React, {Component} from 'react';
import './App.css';
import Navigation from "../Navigation";
import History from "../History";
import LatestResults from "../LatestResults";
import RefuelForm from "../RefuelForm";

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            averageConsumption: "",
            costPer100: "",
            localStorageUpdate: 0
        }
    };

    updateLatestResults = (averageConsumption, costPer100) => {
        this.setState({
            averageConsumption,
            costPer100
        })
    };

    localStorageDidUpdate = () => {
        this.setState({
            localStorageUpdate: this.state.localStorageUpdate+1
        })
    };

    render() {
        return (
            <div className="main">
                <Navigation/>
                <RefuelForm localStorageDidUpdate={this.localStorageDidUpdate} updateLatestResults={this.updateLatestResults}/>
                <LatestResults latestAvCons={this.state.averageConsumption} latestCostPer100={this.state.costPer100}/>
                <History latestAvCons={this.state.averageConsumption} localStorageUpdate={this.state.localStorageUpdate}/>
            </div>
        );
    }
}

export default App;
