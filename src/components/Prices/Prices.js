import React from 'react';

class Prices extends React.Component {
    constructor(props) {
        super (props);
        this.state = {
            itemNew: '',
            priceNew: '',
            items: [ {} ]
        } 
    }

    componentDidMount() {
        fetch('https://ancient-inlet-27806.herokuapp.com/Pricestable')
        .then(response => response.json())
        .then(serverMessage => {
            if (serverMessage === "No items in database") {
            } else {
                this.setState({items: serverMessage})
            }
        })
     }

    onItemNew = (event) => {
        this.setState({itemNew: event.target.value})
    }
    onPriceNew = (event) => {
        this.setState({priceNew: event.target.value})
    }

    onItemChange = (index,event) => {
        /* !!!!!! Updates state of edited object in items state array 
        Copy state -> Update appropriate itemname using index -> Set state to the copy*/
        let copyItemState = this.state.items
        copyItemState[index].itemname = event.target.value
        this.setState({items: copyItemState})
    }
    onPriceChange = (index, event) => {
        let copyPriceState = this.state.items
        copyPriceState[index].price = event.target.value
        this.setState({items: copyPriceState})
    }

    /*Creating new items */
    onAddItem = () => {
        fetch('https://ancient-inlet-27806.herokuapp.com/Newitem', {
            method: 'post',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                name: this.state.itemNew,
                price: this.state.priceNew
            })  
        })
        .then(response => response.json())
        .then(serverMessage => {
            if (serverMessage === "missing fields") {
              alert('Error - Make sure name and price is filled out.')  
            } else if (serverMessage === "error"){
                alert('Error - Make sure the item does not already exist')
            } else {
                alert('Item created!')
                this.props.onRouteChange('Sales')
                this.props.onRouteChange('Prices')
            }
        })
    }

    /*Updates item name and price*/
    onUpdate = () => {
        fetch('https://ancient-inlet-27806.herokuapp.com/Updateitem' , {
            method: 'put',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                items: this.state.items
            })
        })
        .then(response => response.json())
        .then(changeMessage => {
            if (changeMessage === "item updated") {
                alert('Updated')
            } else if (changeMessage === "missing fields"){
                alert('Missing name or price. Try again.')
            } else {
                alert('Error. Try Again.')
            }
        })
    } 

    /*Calls server to delete from database */
    onDelete = (id,e) => {
        fetch('https://ancient-inlet-27806.herokuapp.com/Deleteitem', {
            method: 'delete',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                id: id
            })
        })
        .then(response => response.json())
        .then(deleteMessage => {
            if (deleteMessage === "item deleted") {
                alert('Deleted')
                this.props.onRouteChange('Sales')
                this.props.onRouteChange('Prices')
            } else {
                alert('Cannot delete')
            }
                
        })
    }
    
    renderItems = () => {
        let rows = [];
        if (this.state.items[0].id === undefined) {
            return 'No items'
        } else {
            this.state.items.forEach(item => {
                /*!!!!!!! Created index variable. Index of each item in the state array */
                let index = this.state.items.indexOf(item)
                rows.push(
                    <tr className="stripe-dark">
                        <td className="pa3">
                            <form>
                                {/*!!!!!!! Edited onChange function call. index from above, e is whatever was typed*/}
                                <input className="pa2 input-reset ba bg-white hover-bg-gray hover-white" type="name" name="name"  id="name" 
                                    value = {this.state.items[index].itemname}
                                    onChange={(e) => this.onItemChange(index,e)}/>
                            </form>
                        </td>
                        <td className="pa3">
                            <form>
                                <input className="pa2 input-reset ba bg-white hover-bg-gray hover-white" type="money" name="price"  id="price" 
                                    value = {this.state.items[index].price}
                                    onChange={(e) => this.onPriceChange(index,e)}/>
                            </form>
                        </td>
                        <td className="pa1">
                            <a 
                                onClick = {this.onUpdate}
                                className="f6 link dim br3 ba ph3 pv2 dib black bg-white" href="#0">
                                    Update
                            </a>
                        </td>
                        <td className="pa1">
                            <a 
                                onClick = {(e) => this.onDelete(item.id,e)}
                                className="f6 link dim br3 ba ph3 pv2 dib black bg-white" href="#0">
                                    Delete
                            </a>
                        </td>
                    </tr>
                ) 
            });
            return rows;
        }
    }

    render() {
        return ( 
            <div>
                {/*Button to go back to sales - simple route change*/}
                <nav class="dt w-100 border-box pa3 ph5-ns">
                    <div className="dtc v-mid w-75 tr">
                        <a className="link dim dark-gray f6 f5-ns dib mr3 mr4-ns" href="#0" title="Sales" onClick = {() =>this.props.onRouteChange('Sales')} >Daily Sales Input</a>
                        {/*<a className="link dim dark-gray f6 f5-ns dib mr3 mr4-ns" href="#0" title="Summary" onClick = {() =>this.props.onRouteChange('Summary')}>Sales Summary</a>*/}
                    </div>
                </nav>             

                {/*Header */}
                <h1 className="mt2 mb0 baskerville i fw1 f1">Items Summary</h1>

                {/*Chart to populate items and prices*/}
                <div className="pa4">
                    <div className="overflow-auto">
                        <table className="tl f6 mw9 center bg-white ba" cellspacing="0">
                        <thead>
                            <tr className="stripe-dark">
                                <th className="fw7 f8 tc pa3 b bg-white">Item</th>
                                <th className="fw7 f8 tc pa3 b bg-white">Price</th>
                            </tr>
                        </thead>
                        <tbody className="lh-copy">
                            {this.renderItems()}
                            <tr className="stripe-dark">
                                <td className="pa3">
                                    <form>
                                        <input className="pa2 input-reset ba bg-white hover-bg-gray hover-white" type="name" name="name"  id="name" 
                                            value = {this.state.itemNew}
                                            onChange={this.onItemNew}/>
                                    </form>
                                </td>
                                <td className="pa3">
                                    <form>
                                        <input className="pa2 input-reset ba bg-white hover-bg-gray hover-white" type="money" name="price"  id="price" 
                                            value = {this.state.priceNew}
                                            onChange={this.onPriceNew}/>
                                    </form>
                                </td>
                                
                                {/*Button to update number of items - fetch put from server*/}
                                <td className = "pa1">
                                    <a 
                                        onClick = {this.onAddItem}
                                        className="f6 link dim br3 ba ph3 pv2 dib black bg-white" href="#0">
                                            Add Item
                                    </a>
                                </td>    
                                <td></td>                                
                            </tr>
                        </tbody>
                        </table>
                    </div>
                </div>
            </div>
        );
    }
}

export default Prices;