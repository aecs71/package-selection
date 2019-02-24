import React from 'react';

const CartItems=({row,calculate,addToCart})=>{
    const removeItem=()=>{
        calculate(false,row.price,row.id,row.size,row.pack);
       addToCart();
    }
    return(<tr >
        <td>{row.pack}</td>
        <td>{row.price}</td>
        <td><button className="btn btn-danger" onClick={removeItem}>Remove</button></td>
    </tr>)
}
export default CartItems;