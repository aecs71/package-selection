import { Tabs, Tab } from 'react-bootstrap'
import Table from '../common/Table';
import React from 'react';
import ListItem from '../common/ListItem';
import Cart from './Cart';
import {rows} from '../../data/rows';
import {alacarteRows} from '../../data/alaRows';
let golbalTotal = [];
let totalChannels = [];
let cartArray = [];

//let rows = [{ id: 1, pack: "star pack", price: 49, size: 100, checked: false }, { id: 2, pack: "zee pack", price: 39, size: 10, checked: false }, { id: 3, pack: "sony pack", price: 31, size: 20, checked: false }];

class TablePage extends React.Component {

    constructor(props) {
        super(props);
        this.calculate = this.calculate.bind(this);
        this.addToCart=this.addToCart.bind(this);
        this.state = {
            total: 0,
            ncf: 0,
            gst: 0,
            payableByCustomer: 0,
            cartArray: [],
            addToCart:false,
            addCartBtnDisabled:false,
            handlingCharges:0
        }

        this.alaListMap = (alacarteRows.map(row => {
            return <ListItem />
        }))
    }

    calculate(cond, price, id, size, pack) {
        if (cond) {
            const cartObj = { id: id, pack: pack, price: price, size: size }
            golbalTotal[id] = price;
            totalChannels[id] = size
            cartArray.push(cartObj);
            if (rows.filter(item => item.id == id).length) {
                let index = rows.findIndex(obj => obj.id == id);
                rows[index].checked = true;
            }
            if (alacarteRows.filter(item => item.id == id).length) {
                let index = alacarteRows.findIndex(obj => obj.id == id);
                alacarteRows[index].checked = true;
            }

        }
        else {
            golbalTotal[id] = 0;
            totalChannels[id] = 0;
            cartArray = [...cartArray.filter(item => item.id != id)];
            if (rows.filter(item => item.id == id).length) {
                let index = rows.findIndex(obj => obj.id == id);
                rows[index].checked = false;
            }
            if (alacarteRows.filter(item => item.id == id).length) {
                let index = alacarteRows.findIndex(obj => obj.id == id);
                alacarteRows[index].checked = false;
            }

        }
        
        this.calculateGlobalTotal()
    }
    calculateGlobalTotal() {
        let total = 0;

        golbalTotal.map(item => {
            total = total + item;

        })
        let ncf = 0;; let gst = 0; let payableByCustomer = 0;let handlingCharges=0;
        if (total) {
            handlingCharges=20;
            ncf = this.calculateNcf();
            let gst1 = ((total + ncf) * 0.18);
            gst=Math.round(((total+ncf)*0.18)*100)/100;
            payableByCustomer = total + ncf + gst+handlingCharges;
           
        }
        this.setState({ total: total, ncf: ncf, gst: gst, payableByCustomer: payableByCustomer,addCartBtnDisabled:false,handlingCharges:handlingCharges })
    }
    calculateChannelTotal(){
        let total = 0;

        golbalTotal.map(item => {
            total = total + item;

        })
        return total;
    }
    calculateNcf() {
        let channelSize = 0;
        channelSize = totalChannels.reduce((a, b) => a + b, 0)
        if (channelSize <= 100)
            return 130

        return (130 + Math.ceil(Math.abs(channelSize - 100) / 25) * 20)
    }
    addToCart(){
            this.setState({cartArray:cartArray,addCartBtnDisabled:true});
    }
    render() {
        return (<div><Tabs defaultActiveKey="packs" id="uncontrolled-tab-example">
            <Tab eventKey="packs" title="Packs">
                <Table rowData={rows} rowLen={rows.length}
                    calculate={this.calculate} total={this.state.total}/>
            </Tab>
            <Tab eventKey="alacarte" title="Alacarte">
                <Table rowData={alacarteRows} rowLen={rows.length}
                    calculate={this.calculate} total={this.state.total} />
            </Tab>
            {/*  <Tab eventKey="hd" title="HD">
                <Table calculate={this.calculate} listMap={this.alaListMap} />
            </Tab> */}
            <Tab eventKey="cart" title="cart">
                <Cart calculate={this.calculate} addToCart={this.addToCart}rows={this.state.cartArray} total={this.state.total} 
                ncf={this.state.ncf} gst={this.state.gst} handlingCharges={this.state.handlingCharges}
                payableByCustomer={this.state.payableByCustomer} 
                 />
            </Tab>
        </Tabs>
           <div className="add-cart">
           <button className="btn btn-primary" onClick={this.addToCart} disabled={this.state.addCartBtnDisabled}>Add to cart</button>
           </div></div>)
    }
}
export default TablePage;