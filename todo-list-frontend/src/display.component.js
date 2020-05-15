import React, { Component } from 'react'
import { Container, Row, Button} from 'react-bootstrap';
import {NavLink} from 'react-router-dom';
import axios from 'axios';

const List = (props) =>{
    return(
    <div>
       <NavLink style={{textDecoration:'none'}} activeClassName='is-active'  to={`/lists/${props.listId}`} >
           <div onClick = {props.onClick} className={props.className}>
            <p className="list-item">{props.item}</p>
            </div>
            </NavLink>
    </div>
    ) 
}

const Tasks = (props) =>{
    return(
        <div onClick={props.onClick} className={props.className} >
        <div className='task-item' >
             <p >{props.item}</p>
        </div>
        </div>
    )
}


export default class Display extends Component {
    constructor(props){
        super(props)

        this.onCompletedTask = this.onCompletedTask.bind(this);
        this.deleteList = this.deleteList.bind(this);

        this.state = {
            list: [],
            tasks:[],
            completed:{},
            active:{},
            selectedlistId: ''
        }
    }

    componentWillUpdate(nextProps){
        axios.get(`http://localhost:8080/lists/${this.props.match.params.listId}`)
        .then(response =>{
            this.setState({
                tasks:response.data,
                selectedlistId: this.props.match.params.listId
            })
        })
    }

    componentDidMount(){


        axios.get('http://localhost:8080/lists')
        .then(response=>{
            this.setState({
                list:response.data,
               
            })
        })
        .catch(error =>{
            console.log(error)
        });

        
    }

    onActiveList(item){
        this.setState((prevState) =>({
            active:{
                ...prevState.completed,
                [item._id]:!prevState.completed[item._id]
            },
            
        }))

    }


    onCompletedTask(item){
        this.setState(prevState =>({
            completed: {
                ...prevState.completed,
                [item._id]: !prevState.completed[item._id]
            },
        }))
    }

    

    listCollection(){
        return(
         this.state.list.map((item,index)=>{
             return(<List 
                onClick={() =>this.onActiveList(item)} 
                item = {item.title} 
                className={this.state.active[item._id] ? 'is-active':''} 
                listId={item._id} 
                key = {index} />)
                
            })
        )
    }

    taskCollection(){
        return(
            this.state.tasks.map((item, index) =>{
                return(<Tasks 
                    onClick = {()=>this.onCompletedTask(item)} 
                    className={this.state.completed[item._id] ? 'complete': ''} 
                    item={item.task}  
                    key={index}/>)
            })
        )
    }


    deleteList(id){
        axios.delete(`http://localhost:8080/${id}` )
        .then(response =>
        {console.log(response)
        window.location= '/lists'
    })
    }


    render() {
        return (
            <div id='main' >
                <Container>
                    <Row>
                    <div className="sidebar">
                        <h1 style={{fontSize:"25pt"}}>Lists</h1>
                        <Button onClick={()=>this.deleteList(this.state.selectedlistId)}>DELETE</Button>
                        <div className="list-menu">
                         {this.listCollection()}
                        </div>
                        <form action='/new-list' method='GET'>
                            <div style={{textAlign:'center'}}>
                            <button className='list-button' style={{fontSize:'12pt', borderRadius:'5px'}}>
                                + New List
                            </button>
                            </div>
                        </form>
                    </div>
                    <div className='tasks'>
                        <h1 style={{fontSize:'25pt'}}>Tasks</h1>
                        {this.taskCollection()}
                        <form action={`/lists/${this.props.match.params.listId}/new-task`} method='GET'>
                        <button className='task-button'>
                           +
                            </button>
                        </form>
                    </div>
                    </Row>
                </Container>

                
            </div>
        )
    }
}
