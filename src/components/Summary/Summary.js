import React from 'react';

    class Summary extends React.Component {
        constructor (props) {
            super (props);
            this.state = {

            }
        }

    weeklySummary = () => {
        return <p>Weekly data</p>
    }
    monthlySummary = () => {
        return <p>Monthly data</p>
    }
    sixMonthSummary = () => {
        return <p>6 Month data</p>
    }
    yearSummary = () => {
        return <p>Year data</p>
    }
    allTimeSummary = () => {
        return <p>All Time data</p>
    }

    render () {
        return (
            <div>
                {/*Navigation menu*/}
                <nav class="dt w-100 border-box pa3 ph5-ns">
                    <div className="dtc v-mid w-75 tr">
                        <a className="link dim dark-gray f6 f5-ns dib mr3 mr4-ns" href="#0" title="About" onClick = {() =>this.props.onRouteChange('Sales')}>Daily Sales Input</a>
                        <a className="link dim dark-gray f6 f5-ns dib mr3 mr4-ns" href="#0" title="Store" onClick = {() =>this.props.onRouteChange('Prices')}>Change Prices</a>
                    </div>
                </nav>

                {/*Navigation menu to select graph */}
                <div className="bg-transparent black-80 tc pv4 avenir">
                    <h1 className="mt2 mb0 baskerville i fw1 f1">Sales Summary</h1>
                    <nav className="bt bb tc mw7 center mt4">
                        <a className="f6 f5-l link bg-animate black-80 hover-bg-lightest-blue dib pa3 ph4-l" onClick = {() =>this.weeklySummary()} href="#0">Weekly</a>
                        <a className="f6 f5-l link bg-animate black-80 hover-bg-light-green dib pa3 ph4-l" onClick = {() =>this.monthlySummary()} href="#0">Monthly</a>
                        <a className="f6 f5-l link bg-animate black-80 hover-bg-light-blue dib pa3 ph4-l" onClick = {() =>this.sixMonthSummary()} href="#0">6 Month</a>
                        <a className="f6 f5-l link bg-animate black-80 hover-bg-light-pink dib pa3 ph4-l" onClick = {() =>this.yearSummary()} href="#0">Yearly</a>
                        <a className="f6 f5-l link bg-animate black-80 hover-bg-light-yellow dib pa3 ph4-l" onClick = {() =>this.allTimeSummary()} href="#0">All Time</a>
                    </nav>
                </div>
            </div>
        )
    }   
}

export default Summary;
