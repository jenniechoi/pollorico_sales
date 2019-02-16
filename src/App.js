import React, { Component } from 'react';
import Logo from './components/Logo/Logo.js';
import Prices from './components/Prices/Prices.js';
import Sales from './components/Sales/Sales.js';
/*import Summary from './components/Summary/Summary.js';*/
import './App.css';

class App extends Component {
  constructor() {
    super ();
    this.state = {
      route: '',
      sales_date: '',
      sales: [{}],
      cornSales: '',
      restaurantSales: '',
      totalSales: ''
    }
  }

  onRouteChange = (route) => {
    this.setState({route: route});
  }
  loadDate = (data) => {
    this.setState({sales_date: data})
  }
  saveSale = (data) => {
    this.setState({sales: data})
  }
  saveCornSale = (data) => {
    this.setState({cornSales: data})
  }
  saveRestaurantSale = (data) => {
    this.setState({restaurantSales: data})
  }
  saveTotalSale = (data) => {
    this.setState({totalSales: data})
  }

  render() {
    const {route} = this.state;
    return (
      <div className="App">
        <header className="App-header">
            <Logo/>
        </header>
        
        {route === 'Prices'
        ? <div>
          <Prices 
            onRouteChange = {this.onRouteChange}/>
        </div>
        /*:route === 'Summary'
        ? <div>
          <Summary onRouteChange = {this.onRouteChange}/>
        </div>*/
        :
        <div>
          <Sales 
            sales_date = {this.state.sales_date}
            sales = {this.state.sales}
            cornSales = {this.state.cornSales}
            restaurantSales = {this.state.restaurantSales}
            totalSales = {this.state.totalSales}
            loadDate = {this.loadDate}
            saveSale = {this.saveSale}
            saveCornSale = {this.saveCornSale}
            saveRestaurantSale = {this.saveRestaurantSale}
            saveTotalSale = {this.saveTotalSale}
            onRouteChange = {this.onRouteChange}/>
        </div>
        }
      </div>
    );
  }
}

export default App;
