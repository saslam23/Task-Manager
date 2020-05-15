import React from 'react';
import { Container } from 'react-bootstrap';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import Display from './display.component';
import NewList from './new-list.component';
import NewTask from './new-task.component';


function App() {

  return (
    <div className="App">
      <Container style={{textAlign:"center"}}>
        
   <h1 style={{color:"white"}}>Task Manager</h1>
   <Router>
     <Route path='/lists' exact component={Display}/>
     <Route path='/lists/:listId' exact component={Display}/>
     <Route path='/new-list' component={NewList}/>
     <Route path='/lists/:listId/new-task' component={NewTask}/>
   </Router>

   </Container>
    </div>
  );
}

export default App;
