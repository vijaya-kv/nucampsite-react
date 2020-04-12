import React, { Component } from "react";
import { Switch, Route, Redirect, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { actions } from 'react-redux-form';
import Header from "./HeaderComponent";
import Home from "./HomeComponent";
import Directory from "./DirectoryComponent";
import Contact from './ContactComponent';
import About from './AboutComponent';
import Footer from "./FooterComponent";
import CampsiteInfo from "./CampsiteInfoComponent";
import { postComment, fetchCampsites, fetchComments, fetchPromotions, fetchPartners , postFeedback } from '../redux/ActionCreators';
import { TransitionGroup, CSSTransition } from 'react-transition-group';

const mapStateToProps = state => {
  return {
    campsites: state.campsites,
    comments: state.comments,
    partners: state.partners,
    promotions: state.promotions
  };
};

const mapDispatchToProps = {
  postComment: (campsiteId, rating, author, text) => (postComment(campsiteId, rating, author, text)),
  fetchCampsites: () => (fetchCampsites()),
  resetFeedbackForm: () => (actions.reset('feedbackForm')),
  fetchComments: () => (fetchComments()),
  fetchPromotions: () => (fetchPromotions()),
  fetchPartners: () => (fetchPartners()),
  postFeedback: (firstName, lastName, phoneNum, email, agree, contactType, feedback) => 
                (postFeedback(firstName, lastName, phoneNum, email, agree, contactType, feedback))
};

class Main extends Component {

  componentDidMount() {
    this.props.fetchCampsites();
    this.props.fetchComments();
    this.props.fetchPromotions();
    this.props.fetchPartners();
  }

  render() {
      const HomePage = () => {
          return (
              <Home 
                  campsite={this.props.campsites.campsites.filter(campsite => campsite.featured)[0]}
                  campsitesLoading={this.props.campsites.isLoading}
                  campsitesErrMsg={this.props.campsites.errMsg}
                  promotion={this.props.promotions.promotions.filter(promotion => promotion.featured)[0]}
                  promotionsLoading={this.props.promotions.isLoading}
                  promotionsErrMsg={this.props.promotions.errMsg}
                  partner={this.props.partners.partners.filter(partner => partner.featured)[0]} 
                  partnersLoading={this.props.partners.isLoading} 
                  partnersErrMsg={this.props.partners.errMsg} 
              />
          );
      }

    const CampsiteWithId = ({match}) => {
        return (
            <CampsiteInfo 
                campsite={this.props.campsites.campsites.filter(campsite => campsite.id === +match.params.campsiteId)[0]}
                comments={this.props.comments.comments.filter(comment => comment.campsiteId === +match.params.campsiteId)}
                isLoading={this.props.campsites.isLoading}
                errMsg={this.props.campsites.errMsg}
                postComment={this.props.postComment} 
                commentsErrMsg ={this.props.comments.errMsg}
            />
        )   
    };
    return (
      <div>
        <Header/>
          <TransitionGroup>
            <CSSTransition key={this.props.location.key} classNames="page" timeout={300}>
              <Switch> 
                <Route path="/home" component={ HomePage } />
                <Route exact path="/directory" render={() => <Directory campsites={this.props.campsites} />} />
                <Route exact path="/directory/:campsiteId" component={CampsiteWithId} />
                <Route path="/contactus" render={() => <Contact resetFeedbackForm={this.props.resetFeedbackForm} postFeedback={this.props.postFeedback}/>} />
                <Route path="/aboutus" render={() => <About partners={this.props.partners} />} />
                <Redirect to="/home" />
              </Switch>
            </CSSTransition>
          </TransitionGroup>
        <Footer/>
      </div>
    );
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));
