import React, {useState, useEffect} from 'react';
import OccasionActionsElement from './OccasionActionsElement';

import occasionTyper from '../util/occasionTyper';

import Media from 'react-bootstrap/Media';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Badge from 'react-bootstrap/Badge';
import Button from 'react-bootstrap/Button';


const Occasion = ({occasion, user}) => {

  occasion.date = new Date(occasion.date)  

  const [expanded, setExpanded] = useState(false);
  const expansion = (exp) => { return { display: exp ? '' : 'none' }}

  const [classname, setClassname] = useState('');
  const updateClassname = (occasion) => setClassname(occasionTyper.getClassName(occasion));

  useEffect(() => {
    updateClassname(occasion)
  },[occasion])

  return (
    <Media as="li" key={occasion.id} className={`${classname} occ`}>
      <Media.Body>
      <Button 
        onClick={() => setExpanded(!expanded)}
        className="float-right"
        >
          Expand
      </Button>
        <div style={expansion(!expanded)}>
          <Row noGutters style={{alignItems: 'center'}}>
            <Col as="h3" sm={5}>{occasion.title}</Col> 
            <Col as="h5"><Badge>{occasion.info}</Badge></Col>
          </Row>
          <Row>
            <Col as="h5">{occasion.subtitle}</Col>
          </Row>
        </div>


        <div style={expansion(expanded)}>
          <Row>
            <Col as="h3" md={{span: 6}}>{occasion.title}</Col> 
          </Row> 
          <Row noGutters>
            <Col as ="h5" md={3}>{occasion.subtitle}</Col>
            <Col as="h5"><Badge>{occasion.info}</Badge></Col>
          </Row>
          <br/>
          <Row>
            <Col md={7}>{occasion.description}</Col>
            <Col>
              <Row noGutters md='auto'>
                <h4>
                  {occasion.date.getDate()}.
                  {occasion.date.getMonth()}.
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
                {`Participating: ${occasion.participants.length}`}
              </Row>
            </Col>
          </Row>
          <br/>
          <OccasionActionsElement 
            occasion={occasion} user={user}
            updateClassname={updateClassname}
          />
        </div>
      </Media.Body>
    </Media>
  )
}

export default Occasion;