import React from "react";
import UpdateInput from "./UpdateInput";
import TodoList from './TodoList';
class DisplayData extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            id: ''
        }
    }
    updateId = (uid) => {
        if (this.state.id === '') {
            this.changeId(uid);
        }
        else {
            this.changeId('');
        }
    }
    changeId=(uid)=>{
        this.setState({id:uid});
    }
    render() {
        return (
            <div className="list">
                {this.props.List.map((ele) => (
                    this.state.id === ele._id ?
                        <UpdateInput listEle={ele} key={ele._id} changeId={this.changeId} updateId={this.updateId} List={this.props.List} newList={this.props.newList} newlistData={this.props.newlistData} changeData={this.props.changeData}/> :
                        <TodoList listEle={ele} key={ele._id} List={this.props.List} insertData={this.props.insertData} updateId={this.updateId} newList={this.props.newList} newlistData={this.props.newlistData} changeData={this.props.changeData}/>
                ))}
            </div>
        )
    }
}
export default DisplayData;