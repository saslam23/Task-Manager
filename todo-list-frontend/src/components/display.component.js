import React, { Component } from 'react'
import { Container, Row, Button, DropdownButton, Dropdown } from 'react-bootstrap';
import axios from 'axios';
import List from './list.component';
import Tasks from './task.component';

export default class Display extends Component {
    constructor(props) {
        super(props)

        this.onCompletedTask = this.onCompletedTask.bind(this);
        this.deleteList = this.deleteList.bind(this);
        this.deleteTask = this.deleteTask.bind(this);

        this.state = {
            list: [],
            tasks: [],
            completed: {},
            active: {},
            selectedlistId: ''
        }
    }

    componentWillUpdate(nextProps) {
        axios.get(`http://localhost:8080/lists/${this.props.match.params.listId}`)
            .then(response => {
                this.setState({
                    tasks: response.data,
                    selectedlistId: this.props.match.params.listId
                })
            })
    }

    componentDidMount() {


        axios.get('http://localhost:8080/lists')
            .then(response => {
                this.setState({
                    list: response.data,

                })
            })
            .catch(error => {
                console.log(error)
            });


    }

    // Adding a class to the list item that has been selected
    onActiveList(item) {
        this.setState((prevState) => ({
            active: {
                ...prevState.completed,
                [item._id]: !prevState.completed[item._id]
            },

        }))

    }

    // Creating a line through for a task that has been completed
    onCompletedTask(item) {
        this.setState(prevState => ({
            completed: {
                ...prevState.completed,
                [item._id]: !prevState.completed[item._id]
            },
        }))
    }


    // Returning the list array along with the onActive handler to add class to selected list item
    listCollection() {
        return (
            this.state.list.map((item, index) => {
                return (<List
                    onClick={() => this.onActiveList(item)}
                    item={item.title}
                    className={this.state.active[item._id] ? 'is-active' : ''}
                    listId={item._id}
                    key={index} />)

            })
        )
    }


    // Returning task array along with the onCompletedTask handler to add line through class to completed tasks
    taskCollection() {
        return (
            this.state.tasks.map((item, index) => {
                return (<Tasks
                    onClick={() => this.onCompletedTask(item)}
                    className={this.state.completed[item._id] ? 'complete' : ''}
                    item={item.task}
                    button={() => this.deleteTask(this.state.selectedlistId, item._id)}
                    key={index} />)


            })
        )
    }

    // Delete Selected List
    deleteList(id) {
        axios.delete(`http://localhost:8080/${id}`)
            .then(response => {
                console.log(response)
                window.location = '/lists'
            })
    }

    // Delete Selected Task and filter for the without the deleted taskId
    deleteTask(listId, taskId) {
        axios.delete(`http://localhost:8080/lists/${listId}/tasks/${taskId}`)
            .then(response => {
                console.log(response)
                window.location = `/lists/${this.props.match.params.listId}`
            })

        this.setState({
            tasks: this.state.ttasks.filter(el => el._id !== taskId)
        })
    }

    render() {
        return (
            <div id='main' >
                <Container>
                    <Row>
                        <div className="sidebar">
                            <h1 style={{ fontSize: "25pt" }}>Lists</h1>
                            <div className="list-menu">
                                {this.listCollection()}
                            </div>
                            <form action='/new-list' method='GET'>
                                <div style={{ textAlign: 'center' }}>
                                    <button className='list-button' style={{ fontSize: '12pt', borderRadius: '5px' }}>
                                        + New List
                            </button>
                                    <DropdownButton
                                        size='sm'
                                        variant='danger'
                                        title='Delete List'
                                        style={{ marginBottom: '20px' }}
                                    >
                                        <Dropdown.Item eventKey='1'>
                                            <Button style={{ width: '55px', height: '30px', fontSize: '10pt', display: 'flex' }} variant='danger' onClick={() => this.deleteList(this.state.selectedlistId)}>
                                                <img style={{ width: '20px', height: '20px' }} src={process.env.PUBLIC_URL + '/assets/trash-icon.png'} alt='trash' />
                                            </Button>
                                        </Dropdown.Item>
                                    </DropdownButton>
                                </div>
                            </form>
                        </div>
                        <div className='tasks'>
                            <h1 style={{ fontSize: '25pt', marginBottom: '20px' }}>Tasks
                            </h1>

                            {this.taskCollection()}
                            <form action={`/lists/${this.props.match.params.listId}/new-task`} method='GET'>
                                <button className='task-button'>
                                    +
                            </button>
                            </form>
                        </div>
                    </Row>
                </Container >


            </div >
        )
    }
}
