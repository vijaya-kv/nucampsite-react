import React, { Component } from "react";
import { Card, CardImg, CardText, CardBody, CardTitle,
          Breadcrumb, BreadcrumbItem, Button, 
          Modal, ModalHeader, ModalBody, Label } from "reactstrap";
import { Link } from "react-router-dom";
import { Control, LocalForm, Errors } from 'react-redux-form';
import { Loading } from './LoadingComponent';
import { baseUrl } from '../shared/baseUrl';
import { FadeTransform, Fade, Stagger } from 'react-animation-components';

const required = val => val && val.length;
const maxLength = len => val => !val || (val.length <= len);
const minLength = len => val => val && (val.length >= len);

class CommentForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      rating : '1',
      author : '',
      text: '',
      isModalOpen : false,
      touched : {
        author: false
      }
    };
    this.toggleModal = this.toggleModal.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  toggleModal() {
    this.setState({
        isModalOpen: !this.state.isModalOpen
    });
  }

  handleSubmit(values) {
    this.props.postComment (this.props.campsiteId, values.rating, values.author, values.text);
  }


  render() {
    return (
      <React.Fragment>

      <Button outline onClick={this.toggleModal}>
        <i className="fa fa-pencil fa-lg" /> Submit Comment</Button>

              <Modal isOpen={this.state.isModalOpen} toggleModal={this.toggleModal}>
                    <ModalHeader toggle={this.toggleModal}>Submit Comment</ModalHeader>
                    <ModalBody>
                        <LocalForm onSubmit={ values => this.handleSubmit(values)}>
                          
                          <div className="form-group">
                            <Label htmlFor="rating">Rating</Label>
                            <Control.select name="rating" model=".rating" className="form-control">
                              <option>1</option>
                              <option>2</option>
                              <option>3</option>
                              <option>4</option>
                              <option>5</option>
                            </Control.select>
                          </div>

                          <div className="form-group">
                            <Label htmlFor="author">Your Name</Label>
                            <Control.text model=".author" id="author" name="author"
                              placeholder="Your Name"
                              className="form-control" 
                              validators={{
                                required,
                                minLength : minLength(2),
                                maxLength: maxLength(15)
                              }}
                            />
                            <Errors 
                              className="text-danger"
                              model=".author"
                              show="touched"
                              component="div"
                              messages={{
                                required :'Required',
                                minLength : 'Must be at least 2 characters',
                                maxLength : 'Must be at least 15 characters or less'
                              }}
                            />
                          </div>

                          <div className="form-group">
                            <Label htmlFor="text">Comment</Label>
                              <Control.textarea id="text" name="text" model=".text"
                                rows="6"
                                className="form-control"
                              />
                          </div>

                            <Button type="submit" value="submit" color="primary">Submit</Button>
                        </LocalForm>
                    </ModalBody>
                </Modal>
      </React.Fragment>
    )
  }
}

function RenderCampsite({ campsite }) {
  return (
    
      <div className="col-md-5 m-1">
        <FadeTransform
          in
          transformProps={{
              exitTransform: 'scale(0.5) translateY(-50%)'
        }}>
          <Card>
            <CardImg top src={baseUrl + campsite.image} alt={campsite.name} />
            <CardBody>
              <CardTitle>{campsite.name}</CardTitle>
              <CardText>{campsite.description}</CardText>
            </CardBody>
          </Card>
        </FadeTransform>
      </div>
   
  );
}

function RenderComments({ comments, postComment, campsiteId}) {
  if (comments && comments != null) {
    return (
      <div className="col-md-5 m-1">
        <h4>Comments</h4>
        <Stagger in >
          {comments.map(comment =>  {
               return (
                 <Fade in key={comment.id}>
                  <div >
                    <p>{comment.text}</p>
                    <p>-- {comment.author},{" "} {new Intl.DateTimeFormat("en-US", { year: "numeric", month: "short", day: "2-digit"}).format(new Date(Date.parse(comment.date)))}</p>
                  </div>
                </Fade>
              );
          })}
        </Stagger> 
        <CommentForm 
            campsiteId = {campsiteId}
            postComment = {postComment}
        />
      </div>
    );
  }
  return <div />;
}

function CampsiteInfo(props) {

  if (props.isLoading) {
    return(
      <div className="container">
        <div className="row">
          <Loading />;
        </div>
      </div>
    ) 
  }

  if(props.errMsg) {
    return(
      <div className="container">
        <div className="row">
          <div className="col">
            <h4>{props.errMsg}</h4>
          </div>
        </div>
      </div>
    );
  }

  if (props.campsite && props.campsite != null) {
    return (
      <div className="container">
        <div className="row">
          <div className="col">
            <Breadcrumb>
              <BreadcrumbItem>
                <Link to="/directory">Directory</Link>
              </BreadcrumbItem>
              <BreadcrumbItem active>{props.campsite.name}</BreadcrumbItem>
            </Breadcrumb>
            <h2>{props.campsite.name}</h2>
            <hr />
          </div>
        </div>
        <div className="row">
          <RenderCampsite campsite={props.campsite} />
          <RenderComments 
              comments={props.comments} 
              postComment={props.postComment}
              campsiteId={props.campsite.id}
          />
        </div>
      </div>
    );
  }
  return <div />;
}

export default CampsiteInfo;
