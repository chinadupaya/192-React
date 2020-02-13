/* ---LICENSE---
Author: Annysia Dupaya
This is a course requirement for CS 192
Software Engineering II under the
supervision of Asst. Prof. Ma. Rowena C.
Solamo of the Department of Computer
Science, College of Engineering, University
of the Philippines, Diliman for the AY 2019-
2020 

---HISTORY---
2/13/20: Annysia Dupaya - Created component

---ABOUT---
File creation date: 2/13/20
Development Group: Group 1 - RUPE
Client Group: Ma. Rowena C. Solamo
This React.js component is for adding a review to an eatery. 
This software's overall purpose is to provide a clean frontend for our system, RUPE.
*/
import React from 'react';
import '../stylesheets/Admin.css';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
const Admin=(props)=>{
    let count=0;
    var eateries = props.eateries.map((eatery)=>{
        function handleEateryUnflag(){
            fetch('http://localhost:5000/eatery/'+eatery.id+'/unflag',{
            method: 'PUT',
            headers: {
                'Content-type': 'application/json'
            }
            })
        }
        if(!eatery.flag){
            return null;
        }
        count+=1;
        return(<Box key={eatery.id} className="eateryBox"  border={1}>
            <div className="eateryInfo subBox">
                <Typography component="h5" variant="h5"><strong>{eatery.name}</strong></Typography>
                {eatery.why_flag}
            </div>
            <div className="eateryActions subBox">
                <Button variant="contained" onClick={handleEateryUnflag}color="primary">Unflag Eatery</Button> <Button variant="contained" color="secondary">Delete Eatery</Button>
            </div>
            </Box>
        )
    })
    let eatery_length = count
    return (
        <div className="Admin">
            <div className = "adminHeader">
                Welcome to the RUPE admin page!
            </div>
            <section>
                
            </section>
            <div className="eaterySection">
            <Typography component="h4" variant="h4">
                You have {eatery_length} flagged eateries 
            </Typography>
            <div className="eateriesContainer">
                {eateries}
            </div>
            </div>
        </div>
    )
}
export default Admin; 