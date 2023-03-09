import React from 'react'
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Table from 'react-bootstrap/Table';

import Modal from 'react-bootstrap/Modal';
import { useState } from 'react';
import ActivityFormUpdate from './ActivityFormUpdate';

function ActivityFormRead() {
  const [show, setShow] = useState(false);
  const [current, setcurrent] = useState("");

  const handleClose = () => setShow(false);
  const handleShow = () =>{
    setShow(true);
  } 
    


  const [activity, setactivity] = useState([
   

  ]);


  
// console.log(activity)
React.useEffect(() => {

  
  async function getData() {
    const res = await fetch('http://localhost:8000/api/activity/member/exercise_activity',{
    method: "GET",

    headers:{
      "Content-Type": "application/json",
      'Tokenization': localStorage.getItem('Token')
    },
  });


  const data = await res.json();
  // console.log(res)
  setactivity(data)

  }
  
  getData()


}, [])




  return (

        <Table striped bordered hover variant="dark">
        <thead>
          <tr>
            <th>ID</th>
            <th>Exercise Activity Name</th>
            <th>Exercise Activity Description</th>
            <th>Exercise Activity Type</th>
            <th>Exercise Activity Duration</th>
            <th>Exercise Activity Date</th>
            <th>Exercise Activity Image</th>
        <th></th>
           </tr>
      
        </thead>
        <tbody>
            {
              
              activity.map(item => (
              <tr>
                
                <td>{item._id.toString()}</td>
                <td>{item.exe_ac_name}</td>
                <td>{item.exe_ac_desc}</td>
                <td>{item.exe_ac_type}</td>
                <td>{item.exe_ac_dur}</td>
                <td>{item.exe_ac_date}</td>
                <td>{item.exe_ac_img}</td>
                <td> 
                <Button variant="primary" onClick={()=>{setcurrent(item._id); handleShow();}}>
        Launch demo modal
      </Button>
      
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>Woohoo, you're reading this text in a modal!</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          
          <Button variant="secondary" onClick={async ()=>{
            try{
              console.log(current)
              const result = await fetch("http://localhost:8000/api/activity/member/exercise_activity/delete/"+current,{
                method:"DELETE",
                headers:{
                  'Tokenization': localStorage.getItem('Token')
                }
              })
              let data = await result.json()
              console.log(data)
              
              const res = await fetch('http://localhost:8000/api/activity/member/exercise_activity',{
                method: "GET",
            
                headers:{
                  "Content-Type": "application/json",
                  'Tokenization': localStorage.getItem('Token')
                },
              });
            
            
              data = await res.json();
              // console.log(res)

              setactivity(data)
              
              handleClose()
              

            }
            catch(err){
              console.log(err)
            }

          }}>
          Delete 
          </Button>

          <Button variant="secondary" onClick={setactivity}>
            Show 
          </Button>
          
            <Button onClick={() => setactivity(data)}>Update</Button>
        </Modal.Footer>
      </Modal>    








                {/* <Button className='actvty-btn' value="ActivityFormEdit" variant="primary" type="submit">
             Update Activity
           </Button> */}
                </td>

              </tr>
              ))
            }
         
         
         
    
        </tbody>
      </Table>
         

  )
}
      


export default ActivityFormRead;
