import React from 'react';
import { NavLink } from 'react-router-dom';

const List = (props) => {
    return (
        <div>
            <NavLink style={{ textDecoration: 'none', color: '#344ea9' }} activeStyle={{ color: 'purple' }} to={`/lists/${props.listId}`} >
                <div onClick={props.onClick} className={props.className}>
                    <p className="list-item">{props.item}</p>
                </div>
            </NavLink>
        </div>
    )
}

export default List;