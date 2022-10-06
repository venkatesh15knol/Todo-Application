import React from "react";
class Input extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            task: '',
            time: ''
        };
    }
    addTask = async () => {
        if (this.state.task !== "" && this.state.time !== "") {
            const result = await fetch("http://localhost:4000/todo/new", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    activity: this.state.task,
                    date: this.state.time
                })
            }).then(res => res.json());
            const arr=[...this.props.newList,result];
            arr.sort((a,b)=>{
                return new Date(a.date)-new Date(b.date);
            })
            this.props.newlistData([...arr]);
        }
        else {
            alert('Enter correct details');
        }
    }
    componentDidUpdate(prevProps){
        if(prevProps.newList!==this.props.newList){
            this.props.changeData()
        }
    }
    render() {
        return (
            <div className="inputField" key={2344}>
                <label>Enter task: </label>
                <input type='text' value={this.state.task} onChange={(e) => this.setState({task:e.target.value})} className="activity" />
                <br />
                <br />
                <label>Enter date:  </label>
                <input type='date' value={this.state.time} onChange={(e) => this.setState({time:e.target.value})} />
                <button onClick={this.addTask}>Add</button>
                <div className="filter">
                    <label>Filter: </label>
                    <select value={this.props.filterState} onChange={(e)=>this.props.changeFilter(e.target.value)}>
                        <option value="select">select Option</option>
                        <option value="all">All</option>
                        <option value="completed">Completed</option>
                        <option value="pending">Pending</option>
                    </select>
                    <button onClick={this.props.changeData}>Filter</button>
                </div>
            </div>
        )
    }
}
export default Input;