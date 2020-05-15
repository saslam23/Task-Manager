import React, { Component } from 'react'
import { Modal, Button } from 'react-bootstrap';
import axios from 'axios';
export default class NewList extends Component {
    constructor(props) {
        super(props)

        this.newListValue = this.newListValue.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            title: ''
        }
    }

    newListValue(e) {
        this.setState({
            title: e.target.value
        })
    }

    onSubmit(e) {
        e.preventDefault()

        const newList = {
            title: this.state.title
        }

        axios.post('http://localhost:8080/lists', newList)
            .then(response => {
                console.log(response.data._id)
                const listId = response.data._id

                window.location = `/lists/${listId}`
            })
            .catch(err => { console.log(err) })
    }

    render() {



        return (
            <div style={{ marginTop: '10rem' }}>
                <Modal.Dialog>
                    <Modal.Header>
                        <Modal.Title>Create New List</Modal.Title>
                    </Modal.Header>
                    <form onSubmit={this.onSubmit} >
                        <Modal.Body>
                            <input placeholder='Enter a new list...' onChange={this.newListValue} value={this.state.title} />
                        </Modal.Body>

                        <Modal.Footer>
                            <div className="d-flex">
                                <Button href='/lists' type='submit' variant='secondary' className="modal-button">Cancel</Button>
                                <Button type='submit' style={{ background: '#2d4bb8' }} className="modal-button">Create</Button>
                            </div>
                        </Modal.Footer>
                    </form>
                </Modal.Dialog>
            </div>
        )
    }
}
