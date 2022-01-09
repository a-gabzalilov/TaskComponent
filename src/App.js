import React from 'react';
import 'react-table';
import './App.css';


class App extends React.Component {
    constructor(props) {
        super(props);
        this.generate_table=this.generate_table.bind(this);
        this.generate_value=this.generate_value.bind(this);
        this.change_order=this.change_order.bind(this);

        this.data = [];
        this.id = 0;
        this.state = {value: ''};
        this.handleChange=this.handleChange.bind(this);
    }

    find_id(id){
        let number = 0;
        for (let i = 0; i < this.data.length; i++){
            if (this.data[i][2] === id){
                number = i
            }
        }
        return number;
    }

    change_order(event){
        let value = event.target.value;
        var tblBody = document.getElementsByClassName("tBody")[0];
        if (value === "2")
        {
            for(let i = 1; i<tblBody.rows.length; i++)
                if (tblBody.rows[i].cells[1].innerHTML !== "true")
                {
                    tblBody.rows[i].hidden = true;
                }
                else{
                    tblBody.rows[i].hidden = false;
                }
        }
        if (value === "3")
        {
            for(let i = 1; i<tblBody.rows.length; i++)
                if (tblBody.rows[i].cells[1].innerHTML === "true")
                {
                    tblBody.rows[i].hidden = true;
                }
                else{
                    tblBody.rows[i].hidden = false;
                }
        }
        if (value === "1")
            for(let i = 1; i<tblBody.rows.length; i++)
                tblBody.rows[i].hidden = false;
    }

    change_status(){
        let done_number = 0;
        for (let i = 0; i < this.data.length; i++){
            if (this.data[i][1] === true){
                done_number++;
            }
        }
        let status = document.getElementById("status");
        status.innerHTML = "Выполнено " + done_number.toString() + "/" + this.data.length.toString();
    }

    generate_table(event) {
        let id = this.id;
        var tblBody = document.getElementsByClassName("tBody")[0];


        var row = document.createElement("tr");
        var cell = document.createElement("td");
        var cellText = document.createTextNode(this.state.value);
        cell.appendChild(cellText);
        row.appendChild(cell);
        console.log("tut");

        cell = document.createElement("td");
        cellText = document.createTextNode("Не выполнено");
        cell.appendChild(cellText);
        row.appendChild(cell);

        cell = document.createElement("td");
        var del = document.createElement("i");
        cellText = document.createTextNode("delete");
        del.appendChild(cellText);
        cell.appendChild(del);
        row.appendChild(cell);
        row.setAttribute("id", id.toString());


        row.getElementsByTagName("td")[0].addEventListener("click", ()=>{
            var child = row.getElementsByTagName("td")[1];
            if (this.data[this.find_id(id)][1] === true){
                this.data[this.find_id(id)][1] = false;
                child.innerHTML = "Не выполнено";
                this.change_status();
            } else{
                this.data[this.find_id(id)][1] = true;
                child.innerHTML = "Выполнено";
                this.change_status();
            }
        });

        row.getElementsByTagName("td")[2].addEventListener("click", ()=>{
            row.parentNode.removeChild(row);
            this.data.splice(this.find_id(id), 1);
            this.change_status();
        });

        tblBody.appendChild(row);
        event.preventDefault();
    }

    generate_value(event){
        this.data.push([this.state.value, false, this.id]);
        console.log(this.data, this.id);
        this.change_status();
        this.generate_table(event);
        this.id++;
    }

    handleChange(event){
        this.setState({value: event.target.value});
    }

    render() {
        return <div className="App">
            <form onSubmit={this.generate_value}>
                <label>
                    Текст:
                    <input type="text" value={this.state.value} onChange={this.handleChange} maxLength="5"/>
                </label>
                <input type="submit" value="Отправить"/>
            </form>
            <select name="Name_of_list_box" size="Number_of_options" className="List" onChange={this.change_order}>
                <option id = "All" value="1"> Все</option>
                <option id = "Done" value="2"> Выполнено</option>
                <option id = "NotDone" value="3"> Не Выполнено</option>
            </select>
            <table className="MainTable">
                <thead>
                <tr>
                    <th colSpan="3">Задания</th>
                </tr>
                </thead>
                <tbody className="tBody">
                <tr id = "tr1">
                    <td>Задание</td>
                    <td id="status">Выполнено 0/0</td>
                    <td><i>удалить</i></td>
                </tr>
                </tbody>
            </table>
        </div>;
    }
}
export default App;
