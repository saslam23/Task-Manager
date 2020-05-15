import React from 'react';
import { Button } from 'react-bootstrap';

const Tasks = (props) => {
    return (
        <div onClick={props.onClick} className={props.className} >
            <div className='task-item' >
                <div className="task-text">
                    {props.item}
                </div>
                <Button className='delete-task' variant='danger' onClick={props.button}>
                    <img style={{ widht: '30px', height: '30px', paddingBottom: '5px' }} src={process.env.PUBLIC_URL + '/assets/trash-icon.png'} alt='trash' />
                </Button>
            </div>
        </div>
    )
}

export default Tasks;