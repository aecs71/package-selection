import React from 'react';
class ListItem extends React.Component{
    constructor(props){
        super(props);
        this.state={
            serviceCheck:props.rowData.checked
        }
        this.handleChange=this.handleChange.bind(this);
      
    }
    componentWillReceiveProps(nextProps){
        this.setState({serviceCheck:nextProps.rowData.checked})
    }
    handleChange(e){
        const {rowData}=this.props
        const target=event.target;
        const name=target.name;
        const value=target.checked;
        if(value){
            this.props.calculate(true,rowData.price,
                rowData.id,rowData.size,rowData.pack);
        }
        else
        this.props.calculate(false,rowData.price,
            rowData.id,rowData.size);

           // this.setState({serviceCheck:value})
    }
    render(){

return(<tr>
    <td>{this.props.rowData.pack}</td>
    <td>{this.props.rowData.price}</td>
    <td><input type="checkbox" name="serviceCheck"  checked={this.state.serviceCheck}
    id={"cabc"} onChange={this.handleChange}
    /><label htmlFor={"cabc"}>
    <span></span></label></td>
</tr>)}
}
export default ListItem;