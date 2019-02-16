import React from 'react';

class Sales extends React.Component {
    constructor(props) {
        super (props);
        this.state = {
            sales: this.props.sales,
            dateChange: '',
            numberChange: '',
            restaurantSales: '',
            totalSales: '',
            cornSales: this.props.cornSales,
            recallData: false
        } 
    }

    componentDidMount() {
        if (!this.props.sales_date) {    
        } else {
            fetch('https://ancient-inlet-27806.herokuapp.com/Salestable/' + this.props.sales_date)
            .then(response => response.json())
            .then(data => {
                 this.props.saveSale(data)
            })
            .then(() => {
                fetch('https://ancient-inlet-27806.herokuapp.com/Corntable/' + this.props.sales_date)
                .then(response => response.json())
                .then(data => {
                     this.props.saveCornSale(data)
                     this.setState({cornSales: data[0].total})
                     this.setState({recallData: true})
                })
            })


        }
     }
     
    parseMoney = (money) => {
        return parseFloat(money.substr(1))
    }
    calculateRestaurantSales = () => {
        if (!this.state.recallData) {
            return 0
        } else {
            let totalSales = 0;
            this.props.sales.forEach(sale => {
                totalSales = this.parseMoney(sale.total) + totalSales
            });
            return totalSales.toFixed(2)
        }
    }
    calculateTotal = () => {
        if (!this.state.recallData) {
            return 0
        } else {
            let totalSales = 0;
            this.props.sales.forEach(sale => {
                totalSales = this.parseMoney(sale.total) + totalSales
            });
            
            return (totalSales + this.parseMoney(this.state.cornSales)).toFixed(2)
        }
    }
    calculateCorn = () => {
        if (!this.state.recallData) {
            return 0
        } else {
            return this.parseMoney(this.state.cornSales).toFixed(2)
        }
    }
    onNumberChange = (index,event) => {
        let copySalesState = this.props.sales
        copySalesState[index].number = event.target.value
        this.props.saveSale(copySalesState)
    }
    onCornSalesChange = (event) => {
        this.setState({cornSales: event.target.value})
        this.props.saveCornSale(event.target.value)
    }
    onDateChange = (event) => {
        this.setState({dateChange: event.target.value})
        this.props.loadDate(event.target.value)
        fetch('https://ancient-inlet-27806.herokuapp.com/Selectday', {
            method: 'post',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                sales_date: event.target.value
            })  
        })
        .then(response => response.json())
        .then(data => {
            this.setState({sales: data})
        })
        .then(() => {
            this.props.onRouteChange('Prices')
            this.props.onRouteChange('Sales')
        })

        fetch('https://ancient-inlet-27806.herokuapp.com/Cornpost', {
            method: 'post',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                sales_date: event.target.value
            })  
        })
        .then(response => response.json())
        .then(data => {
            this.setState({cornSales: data})
        })
        .then(() => {
            this.props.onRouteChange('Prices')
            this.props.onRouteChange('Sales')
        })
    }
    onUpdateCorn = () => {
        fetch('https://ancient-inlet-27806.herokuapp.com/Updatecorn', {
            method: 'put',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                sales_date: this.props.sales_date,
                total: this.props.cornSales
            })  
        })
        .then(response => response.json())
    }
    
    onUpdateSales = () => {
        fetch('https://ancient-inlet-27806.herokuapp.com/Updatesales' , {
            method: 'put',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                sales: this.props.sales
            })
        })
        .then(response => response.json())
        .then(changeMessage => {
            if (changeMessage === 'no sales data') {
                alert('Missing sales data')
            } else if (changeMessage === 'item updated'){
                alert('Updated.')
            }
        })
        .then(() => {
            this.props.onRouteChange('Prices')
            this.props.onRouteChange('Sales')
        })

        fetch('https://ancient-inlet-27806.herokuapp.com/Updatecorn', {
            method: 'put',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                sales_date: this.props.sales_date,
                total: this.props.cornSales
            })  
        })
        .then(response => response.json())
        .then(() => {
            this.props.onRouteChange('Prices')
            this.props.onRouteChange('Sales')
        })
    } 

    /*Creates bottom table listing sales for the selected date */
    renderSales = () => {
        let rows = [];
        if (!this.props.sales_date) {
            return 'No Sales Data';
        } else {
            this.props.sales.forEach(sale => {
                let index = this.props.sales.indexOf(sale)
                rows.push(
                    <tr className="stripe-dark">
                        <td className="pv3 b tc pr3 bb b--black-20">{sale.itemname}</td>
                        <td className="pv3 tc pr3 bb b--black-20">
                            <form>
                                <input className="input-reset ba bg-white hover-bg-gray hover-white" type="money" name="price"  id="price" 
                                    value = {sale.number}
                                    onChange={(e) => this.onNumberChange(index,e)}/>
                            </form>
                        </td>
                        <td className="pv3 tc pr3 bb b--black-20">{sale.total}</td>
                    </tr>
                ) 
            });
            return rows;
        }
    }

    render() {
        return ( 
            <div>
                {/*Navigation menu*/}
                <nav className="dt w-100 border-box pa3 ph5-ns">
                    <div className="dtc v-mid w-75 tr">
                        <a className="link dim dark-gray f6 f5-ns dib mr3 mr4-ns" href="#0" title="Prices" onClick = {() =>this.props.onRouteChange('Prices')}>Change Prices</a>
                        {/*<a className="link dim dark-gray f6 f5-ns dib mr3 mr4-ns" href="#0" title="Summary" onClick = {() =>this.props.onRouteChange('Summary')}>Sales Summary</a>*/}
                    </div>
                </nav>

                {/*Header */}
                <h1 className="mt2 mb0 baskerville i fw1 f1">Daily Sales</h1>

                {/*Select date on mini calendar calls function to change table data when selected - get to populate table and post empty if all blank*/}
                <div className = 'bg-transparent center mw6 pa2'>
                    <label className="bg-transparent" htmlFor="start">Select date  </label>
                    <input className = "center bg-white" type="date" id="start" name="trip-start"
                        onChange={this.onDateChange}
                        value= {this.state.dateChange}></input>                    
                </div>

                {/*Total sales box with corn input */}
                <div className="pa2 overflow-auto">
                    <p>{this.props.sales_date}</p>
                    <table className="f6 mw7 center bg-white ba" cellspacing="0">
                        <thead>
                            <tr>
                                <th className="fw6 b pa3 tc bb b--black-20 tl pb3 pr3 bg-white ">Item</th>
                                <th className="fw6 b pa3 tc bb b--black-20 tl pb3 pr3 bg-white">Total</th>
                                <th className="fw6 b pa3 tc bb b--black-20 tl pb3 pr3 bg-white">Estimated Profit (30%)</th>
                            </tr>
                        </thead>
                        <tbody className="lh-copy">
                            <tr>
                                <td className="pa2 tc pr3 bb b--black-20">Restaurant</td>
                                <td className="pv3 tr pr3 bb b--black-20">${this.calculateRestaurantSales()}</td>
                                <td className="pv3 tr pr3 bb b--black-20">${(this.calculateRestaurantSales() * 0.3).toFixed(2)}</td>
                            </tr>
                            <tr>
                                <td className="pa2 tc pr3 bb b--black-20">Corn</td>
                                <td className="pv3 tr pr3 bb b--black-20">
                                    <form>
                                        <input className="tr pa2 input-reset ba bg-white hover-bg-gray hover-white w-50" type="name" name="name"  id="name" 
                                            value = {this.state.cornSales}
                                            onChange={this.onCornSalesChange}/>
                                    </form>
                                </td>
                                <td className="pv3 tr pr3 bb b--black-20">${(this.calculateCorn()*0.3).toFixed(2)}</td>
                            </tr>
                            <tr className = 'stripe-dark b'>
                                <td className="pv3 tc pr3 bb b--black-20">Total</td>
                                <td className="pv3 tr pr3 bb b--black-20">${this.calculateTotal()} </td>
                                <td className="pv3 tr pr3 bb b--black-20">${(this.calculateTotal() * 0.3).toFixed(2)}</td>
                            </tr>
                        </tbody>
                    </table>
                    {/*Button to update number of items - fetch put from server*/}
                    <div style ={{display: 'flex', justifyContent: 'center', margin: '1em'}}>
                        <a 
                            onClick = {() =>this.onUpdateSales()}
                            className="f6 link dim br3 ba bw1 ph3 pv2 mb2 dib mid-gray bg-white" href="#0">
                                Update Corn Sales
                        </a>
                    </div>
                </div>  

                {/*Chart to populate items and prices*/}
                <div className="pa4">
                    <div className="overflow-auto">
                        <table className="tl f6 w-50 mw8 center bg-white ba" cellspacing="0">
                        <thead>
                            <tr className="stripe-dark">
                                <th className="fw6 tc pa3 b bg-white">Item</th>
                                <th className="fw6 tc pa3 b bg-white">* Number Sold</th>
                                <th className="fw6 tc pa3 b bg-white">= Price</th>
                            </tr>
                        </thead>
                            <tbody className="lh-copy">
                                    {this.renderSales(this.state.selectedDate)}
                            </tbody>
                        </table>                        
                    </div>

                    {/*Button to update number of items - fetch put from server*/}
                    <div style ={{display: 'flex', justifyContent: 'center', margin: '1em'}}>
                        <a 
                            onClick = {() =>this.onUpdateSales()}
                            className="f6 link dim br3 ba bw1 ph3 pv2 mb2 dib mid-gray bg-white" href="#0">
                                Update Restaurant Sales
                        </a>
                    </div>
                </div>
            </div>
        );
    }
}

export default Sales;