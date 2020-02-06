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
1/20/20: Annysia Dupaya - Created component
1/25/20: Annysia Dupaya - Integrated with API
2/6/20: Annysia Dupaya - Added Flag Eatery
*/
import React, { Component } from 'react';
import Typography from '@material-ui/core/Typography';
import PhoneAndroidIcon from '@material-ui/icons/PhoneAndroid';
import PlaceIcon from '@material-ui/icons/Place';
import AllReviews from './AllReviews';
import AddReview from './AddReview';
import FlagEatery from './FlagEatery';
import Box from '@material-ui/core/Box';
import '../stylesheets/Eatery.css';
import StarIcon from '@material-ui/icons/Star';

export default class Eatery extends Component {
    constructor(props){
        super(props);
        this.state={
            eatery:[],
            reviews:[]
        };
        this.handleReviewSubmit = this.handleReviewSubmit.bind(this);
        this.addNewReview = this.addNewReview.bind(this);
        this.handleEateryFlag = this.handleEateryFlag.bind(this);
    }
    handleReviewSubmit(review_text, rating){
        let body = {review_text:review_text, rating:rating};
        console.log(review_text);
        fetch('http://localhost:5000/eatery/'+this.props.match.params.id+'/review/add',{
            method: 'POST',
            mode: 'cors',
            body: JSON.stringify(body)
        }).then((response)=>{return response.json()})
        .then((review)=>{
            this.addNewReview(review)
        })
    }
    addNewReview(review){
        this.setState({
            reviews: this.state.reviews.concat(review)
        })
    }
    handleEateryFlag(why_flag){
        let body = {why_flag:why_flag};
        fetch('http://localhost:5000/eatery/'+this.props.match.params.id+'/flag',{
            method: 'PUT',
            headers: {
                'Content-type': 'application/json'
            },
            body:JSON.stringify(body)
        }).then((response)=>{return response.json()});
        this.props.history.push('/eatery');
    }
    componentDidMount(){
        fetch('http://localhost:5000/eatery/'+this.props.match.params.id)
        .then((response) => {return response.json()})
        .then((data) => {this.setState({ eatery: data }) });
        fetch('http://localhost:5000/eatery/'+this.props.match.params.id+'/review')
        .then((response)=> {return response.json()})
        .then((data) => {this.setState({reviews: data})});
    }
    render() {
        let eatery = this.state.eatery;
        return(
            <div>
                <div className='container'>
                    <Box className='subBox'>
                        <Typography
                            variant="h2" 
                            color="inherit">
                            {eatery.name} <StarIcon fontSize='large'/> {eatery.rating}
                        </Typography>
                        <Typography variant="subtitle1" color="textSecondary">
                            <PhoneAndroidIcon/>{eatery.contact}
                        </Typography>
                        <p><PlaceIcon/>{eatery.address}</p>
                        <FlagEatery handleEateryFlag={this.handleEateryFlag}/>
                    </Box>
                    <Box className='subBox right'>
                        <Typography
                            variant="h4" 
                            color="inherit">
                        Add a Review
                        </Typography>
                        <AddReview handleReviewSubmit={this.handleReviewSubmit}/>
                    </Box>
                </div>
                <AllReviews reviews={this.state.reviews}/>
            </div>
        )
    }
  }
