import React from 'react';

class LatestResults extends React.Component {
    render() {
        return (
            <div>
                <div className="container">
                    <h3>Latest results</h3>
                    <div className="row">
                        <div className="col-sm">
                            Latest average consumption: <span style={{color: "#17a2b8"}}>{this.props.latestAvCons} liters per 100 km</span>
                        </div>
                        <div className="col-sm">
                            Cost per 100 kilometers: <span style={{color: "#17a2b8"}}>{this.props.latestCostPer100} PLN</span>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default LatestResults;