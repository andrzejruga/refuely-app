import React from 'react';

class HistoryHeader extends React.Component {
    render() {
        return (
            <thead>
            <tr>
                <th scope="col">Date</th>
                <th scope="col">Meter<br/>[kms]</th>
                <th scope="col">Liters</th>
                <th scope="col">Price per liter<br/>[PLN]</th>
                <th scope="col">Total price<br/>[PLN]</th>
                <th scope="col">Avg consump. per 100 kms<br/>[liters]</th>
                <th scope="col">Cost per 100 kms<br/>[PLN]</th>
            </tr>
            </thead>
        );
    }
}

class HistoryItem extends React.Component {
    render() {
        return (
            <tr>
                <td>{this.props.historyRowData.date}</td>
                <td>{this.props.historyRowData.meter}</td>
                <td>{this.props.historyRowData.liters}</td>
                <td>{this.props.historyRowData.literprice}</td>
                <td>{this.props.historyRowData.totalprice}</td>
                <td>{this.props.historyRowData.averageConsumption}</td>
                <td>{this.props.historyRowData.costPer100}</td>
            </tr>
        );
    }
}

class HistoryItems extends React.Component {
    render() {
        const historyRow = this.props.resultsTableHist.map((item, index) => {
            return <HistoryItem historyRowData={item} key={index}/>
        });
        return (
            <tbody>
                {historyRow}
            </tbody>
        );
    }
}

class History extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            resultsTable: []
        }
    };

    componentDidUpdate(prevProps) {
        if (prevProps.localStorageUpdate !== this.props.localStorageUpdate) {
            this.setState({
                resultsTable: JSON.parse(localStorage.getItem('results'))
            })
        }
    };

    render() {
        const litSum = this.state.resultsTable.reduce((prev, curr) => {
            return prev + Number(curr.liters)
        }, 0);
        const totPriceSum = this.state.resultsTable.reduce((prev, curr) => {
            return prev + Number(curr.totalprice)
        }, 0);

        return (
            <div>
                <div className="container">
                    <h3>History</h3>
                    <div className="row">
                        <div className="col-sm">
                            Total average consumption: <span style={{color: "#17a2b8"}}>{this.state.resultsTable.length > 0 ? (litSum / ((this.state.resultsTable[this.state.resultsTable.length-1].meter - this.state.resultsTable[0].meter) / 100)).toFixed(2) : "zero"} liters per 100 km</span>
                        </div>
                        <div className="col-sm">
                            Total cost per 100 kilometers: <span style={{color: "#17a2b8"}}>{this.state.resultsTable.length > 0 ? (totPriceSum / ((this.state.resultsTable[this.state.resultsTable.length-1].meter - this.state.resultsTable[0].meter) / 100)).toFixed(2) : "zero"} PLN</span>
                        </div>
                    </div>
                    <br/>
                    <table className="table table-striped table-responsive-md table-history">
                        <HistoryHeader/>
                        <HistoryItems resultsTableHist={this.state.resultsTable}/>
                    </table>
                </div><br/>
            </div>
        );
    }
}

export default History;