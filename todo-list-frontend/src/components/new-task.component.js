import React, { Component } from 'react'
import { Modal, Button } from 'react-bootstrap';
import axios from 'axios';

export default class NewTask extends Component {
    constructor(props) {
        super(props)

        this.newTaskValue = this.newTaskValue.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            task: '',
            completed: false
        }
    }

    newTaskValue(e) {
        this.setState({
            task: e.target.value
        })
    }

    onSubmit(e) {
        e.preventDefault()



        const newTask = {
            task: this.state.task,
        }

        axios.post(`http://localhost:8080/lists/${this.props.match.params.listId}/tasks`, newTask)
            .then(response => {
                console.log(response)
                const listId = response.data._listId
                window.location = `/lists/${listId}`

            })
            .catch(err => { console.log(err) })


    }


    render() {
        return (
            <div style={{ marginTop: '10rem' }}>
                <Modal.Dialog>
                    <Modal.Header>
                        <Modal.Title>Create New Task</Modal.Title>
                    </Modal.Header>
                    <form onSubmit={this.onSubmit}>
                        <Modal.Body>
                            <input onChange={this.newTaskValue} value={this.state.task} placeholder='Enter a new task...' />
                        </Modal.Body>

                        <Modal.Footer>
                            <div className="d-flex">
                                <Button href='/lists' variant='secondary' className="modal-button">Cancel</Button>
                                <Button type="submit" style={{ background: '#2d4bb8' }} className="modal-button">Create</Button>
                            </div>
                        </Modal.Footer>
                    </form>
                </Modal.Dialog>
            </div>
        )
    }
}
