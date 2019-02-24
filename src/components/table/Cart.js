import React from 'react';
import CartItems from './CartItems';
const columns = [
    { key: "pack", name: "Pack" },
    { key: "price", name: "Price" },
    { key: "remove", name: "Remove" }

]
class Cart extends React.Component {
    constructor(props) {
        super(props);
        
        
    }
   
    
    render() {
        return (<div><table className="table">
            <thead className="thead-dark">
                <tr>
                    {columns.map(column => {
                        return <th key={column.key}>{column.name}</th>
                    })}
                </tr>
            </thead>
            <tbody>
                {(this.props.rows.length>0)?this.props.rows.map(row=>{
                       return (<CartItems key={row.id} row={row} calculate={this.props.calculate} addToCart={this.props.addToCart}/>)
                   }):<tr><td>Please add items to your cart</td></tr>}
            </tbody>
        </table>
        <div className="add-cart">
        <button className="btn btn-success" onClick={this.props.globalTotal}>Calculate total price</button>
        </div>
       Channel Total:{this.props.total}<br/>
        ncf:{this.props.ncf}<br/>
        gst:{this.props.gst}<br/>
        handling charges:{this.props.handlingCharges}<br/>
        payable by customer:{this.props.payableByCustomer}
        </div>)
    }
}
export default Cart;