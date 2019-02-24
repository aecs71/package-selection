import React from 'react';
import ListItem from './ListItem';
const columns = [
    { key: "pack", name: "Pack" },
    { key: "price", name: "Price" },
    { key: "select", name: "Select" }

]


class Table extends React.Component {
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
                {
                  this.props.rowData.map(row => {
                    return <ListItem key={row.id} rowData={row} 
                        calculate={this.props.calculate}  />
                })
                }
            </tbody>
        </table>Channel Price:{this.props.total}</div>)
    }
}
export default Table;