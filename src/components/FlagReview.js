/* 
---LICENSE---
Author: Annysia Dupaya
This is a course requirement for CS 192
Software Engineering II under the
supervision of Asst. Prof. Ma. Rowena C.
Solamo of the Department of Computer
Science, College of Engineering, University
of the Philippines, Diliman for the AY 2019-
2020 

---HISTORY---
2/6/20: ANnysia Dupaya - Created component
*/
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import Typography from '@material-ui/core/Typography';
import FlagIcon from '@material-ui/icons/Flag';
import TextField from '@material-ui/core/TextField';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import {Link} from 'react-router-dom';



const useStyles = makeStyles(theme => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));


export default function FlagReview(props) {
  const classes = useStyles();

  let formFields = {};
  const [value, setValue] = React.useState('rude');

  const handleChange = event => {
    setValue(event.target.value);
  };
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
        <Typography component={Link} onClick={handleOpen} color="inherit">
            <FlagIcon/>Flag this review
        </Typography>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          
          <div className={classes.paper}>
            <form noValidate autoComplete="off"
                onSubmit={(e)=> {props.handleReviewFlag(value + ": " + formFields.why_flag_text.value);
                e.target.reset();}}>
              <Typography component="h4"variant="h4">
                What's wrong with this review?
              </Typography>
              <div className="field">
                <RadioGroup aria-label="flag issues" name="flageatery" value={value} onChange={handleChange}>
                  <FormControlLabel value="rude" control={<Radio />} label="It is rude, offensive, or spam" />
                  <FormControlLabel value="off-topic" control={<Radio />} label="It is not constructive / off-topic" />
                  <FormControlLabel value="subjective" control={<Radio />} label="Primarily subjective" />
                  <FormControlLabel value="other" control={<Radio />} label="Other" />
                </RadioGroup>
              </div>       
              <div className="field">
              <TextField id="outlined-basic" 
                    multiline={true}
                    label="Additional comments" variant="outlined" 
                    inputRef={input => formFields.why_flag_text = input}
                    style={{width:"100%"}}/>
              </div> 
              <button className="ui primary button"type="submit">Submit Report</button>  
            </form>
          </div>
        </Fade>
      </Modal>
    </div>
  );
}