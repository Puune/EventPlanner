/**
 * This module has the class-component that displays an occasion
 * @module OccasionClass
 */

import React from 'react';

import '../App.css'

import occasionTyper from '../util/occasionTyper';
import OccasionActionsElement from './OccasionActionsElement';
import { Media, Button, Row, Col, Badge } from 'react-bootstrap';

/**
 * This class contains all elements that a single event on the app displays
 * @class
 * @param { user } user
 * @param { occasion } occasion
 */
class Occasion extends React.Component {
  constructor(props) {
    super(props);    
    this.state = {
      occasion: props.occasion,
      user: props.user,
      expanded: false
    };
  }

  /**
   * This is a callback to a function, that allow overwriting the occasion-state
   * @function setOccasionState
   * @param { occasion } occasion
   */
  setOccasionState = (occasion) => {
    this.setState({occasion: occasion});
  }

  /**
   * This function handles task that need to be performed pre-render
   * @function UNSAFE_componentWillMount
   */
  UNSAFE_componentWillMount() {
    //console.log('will mount: ',this.state.occasion);
    var temp = Object.assign(this.state.occasion);
    temp.classname = occasionTyper.getClassName(this.state.occasion);
    temp.info = occasionTyper.getOccasionInfoText(this.state.occasion);
    occasionTyper.convertJSONToDate(temp);
    this.setOccasionState(temp)
  }

  /**
   * This function ios called after render
   * @function componentDidMount
   */
  componentDidMount() {
    //console.log('did mount:', this.state.occasion);
  }

  /**
   * This is a helper function to extract participants array length
   * @function extractLength
   */
  extractLength = () => {
    try{
      return this.state.occasion.participants.length;
    } catch (exception){
      return 0;
    }
  }

  /**
   * This callback allows toggling element visibility.
   * @function expansion
   * @param { Boolean } exp
   */
  expansion = (exp) => { return { display: exp ? '' : 'none' }}

  render() {
    const occasion = this.state.occasion;
    const user = this.state.user;
    const expanded = this.state.expanded;
    return (
      <Media as="li" 
        key={occasion.id} 
        className={`${occasion.classname} occ force-linebreak`}
        >
        <Media.Body>
        <Button 
          onClick={() => this.setState({expanded: !expanded})}
          className="float-right"
          >
            Expand
        </Button>
          <div style={this.expansion(!expanded)}>
            <Row noGutters style={{alignItems: 'center'}}>
              <Col as="h3" sm={5}>{occasion.title}</Col> 
              <Col as="h5"><Badge>{occasion.info}</Badge></Col>
            </Row>
            <Row>
              <Col as="h5">{occasion.subtitle}</Col>
            </Row>
          </div>
  
  
          <div style={this.expansion(expanded)}>
            <Row>
              <Col as="h3" md={{span: 6}}>{occasion.title}</Col> 
            </Row> 
            <Row noGutters>
              <Col as ="h5" md={3}>{occasion.subtitle}</Col>
              <Col as="h5"><Badge>{occasion.info}</Badge></Col>
            </Row>
            <br/>
            <Row
              noGutters 
              className={'force-linebreak'}
            >
              <Col 
                md={7}
                sm={{span: true}}
              >
                {occasion.description}
              </Col>
              <Col
                className='left-buffer'
              >
                <Row noGutters md='auto'>
                  <h4>
                    {occasion.date.getDate()}.
                    {occasion.date.getMonth()+1 /*Month go form 0-11*/}.
                    {occasion.date.getFullYear()}
                  </h4>
                </Row>
                <Row noGutters>
                  <h5>
                      {occasion.date.getHours()}:
                      {occasion.date.getMinutes()}
                    </h5>
                </Row>
                <br/>
                <Row noGutters>
                  <h5>
                    {`At ${occasion.location}`}
                  </h5>
                </Row>
                <br/>
                <Row noGutters>
                  {`Participating: ${this.extractLength()}`}
                </Row>
              </Col>
            </Row>
            <br/>
            <OccasionActionsElement 
              occasion={occasion} user={user}
              userState={this.props.userState}
              setOccasionState={this.setOccasionState}
            />
          </div>
        </Media.Body>
      </Media>
    )
  }
}

export default Occasion;