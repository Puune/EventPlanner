import React, { useState, useEffect } from 'react';
import occasionService from '../services/occasion';

import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';


const Title = ({title, setTitle}) => {
  return(
    <Form.Group controlId="formOccasionTitle">
      <Form.Label>Title</Form.Label>
      <Form.Control 
        type="text" 
        value={title}
        onChange={({target}) => setTitle(target.value)} />
    </Form.Group>
  )
}

const Subtitle = ({subtitle, setSubtitle}) => {
  return(
    <Form.Group controlId="formOccasionSubtitle">
      <Form.Label>Subtitle</Form.Label>
      <Form.Control 
        type="text"
        value={subtitle}
        onChange={({target}) => setSubtitle(target.value)} />
    </Form.Group>
  )
}

const Description = ({description, setDescription}) => {
  return(
    <Form.Group controlId="formOccasionDescription">
      <Form.Label>Description</Form.Label>
      <Form.Control
      as="textarea" 
      type="text"
      value={description}
      onChange={({target}) => setDescription(target.value)} />
    </Form.Group>
  )
}

const Privacy = ({privacy, setPrivacy}) => {
  return(
  	<Form.Group style={{alignItems: 'center'}}>
      <Col >
        <Form.Label>Event privacy</Form.Label>
      </Col>
      <Col>
        <Form.Check
          type="radio"
          label="public"
          onChange={() => setPrivacy(false)}
          checked={!privacy}
          name="formOccasionRadios"
          id="occasionPublic" 
          />
        <Form.Check
          type="radio"
          label="private"
          onChange={() => setPrivacy(true)}
          checked={privacy}
          name="formOccasionRadios"
          id="occasionPrivate"
        />
      </Col>
    </Form.Group>
  )
}

const Day = ({day, setDay}) => {
  return(
    <Form.Group style={{width: '85px'}}>
      <Form.Label>Day</Form.Label>
      <Form.Control 
        type="number"
        value={day}
        onChange={({target}) => setDay(target.value)}
      />
    </Form.Group>
  )
}

const Month = ({month, setMonth}) => {
  return(
    <Form.Group style={{width: '85px'}}>
      <Form.Label>Month</Form.Label>
      <Form.Control 
        type="number"
        value={month}
        onChange={({target}) => setMonth(target.value)}
      />
    </Form.Group>
  )
}

const Year = ({year, setYear}) => {
  return(
    <Form.Group style={{width: '85px'}}>
      <Form.Label>Year</Form.Label>
      <Form.Control 
        type="number"
        value={year}
        onChange={({target}) => setYear(target.value)}
      />
    </Form.Group>
  )
}

const Time = ({time, setTime}) => {
  return(
    <Form.Group>
      <Form.Label>Time</Form.Label>
      <Form.Control 
        type="time"
        value={time}
        onChange={({target}) => setTime(target.value)}
      />
  </Form.Group>    
  )
}

const Location = ({location, setLocation}) => {
  return(
    <Form.Label>
      <Form.Label>Location</Form.Label>
      <Form.Control 
        type="text"
        value={location}
        onChange={({target}) => setLocation(target.value)}
      />
    </Form.Label>
  )
}


const OccasionForm = ({user, setOwnOccasions, ownOccasions}) => {

  const [title, setTitle] = useState('');
  const [subtitle, setSubtitle] = useState('');
  const [description, setDescription] = useState('');
  const [privacy, setPrivacy] = useState(false);

  const [day, setDay] = useState(19);
  const [month, setMonth] = useState(3);
  const [year, setYear] = useState(2019);
  const [time, setTime] = useState('12:30');

  const [location, setLocation] = useState('');

  const [expanded, setExpanded] = useState('');
  const expansion = (exp) => { return { display: exp ? '' : 'none' }}

  const [visible, setVisible] = useState(false);
  const visibility = (vis) => { return { display: vis ? '' : 'none' }}

  useEffect(() => {
    if(user){
      setVisible(true);
    }
  }, [user])


  const handleSubmit = async (event) => {
    if(user){
      try{
        event.preventDefault();

        const date = new Date()
        date.setFullYear(year);
        date.setMonth(month);
        date.setDate(day);
        date.setHours(Number(time.slice(0,2)));
        date.setMinutes(Number(time.slice(3,5)));
        date.setSeconds(0);
        
        const body = {
          title: title,
          subtitle: subtitle,
          description: description,
          isPrivate: privacy,
          date: date,
          location
        }

        const returnObj = await occasionService.submit({user, body});
        if(returnObj){
          console.log(ownOccasions, returnObj);
          
          await setOwnOccasions(ownOccasions.concat(returnObj))
        }

        setTitle(''); setSubtitle(''); setDescription(''); setLocation('');
        setExpanded(false);

      } catch(exception) {
        console.log(exception);
      }
    }
  }

  const getButtonContent = () => {
    return expanded === true
      ? 'Hide'
      : 'Create Event'
  }

  return (
    <div style={visibility(visible)}>
      <Button
        onClick={() => setExpanded(!expanded)}
        block
      >
        {getButtonContent()}
      </Button>
      <br/>
      <Form onSubmit={handleSubmit} style={expansion(expanded)}>
        <Row>
          <Col>
            <Title title={title} setTitle={setTitle}/>
          </Col>
          <Col>
            <Subtitle subtitle={subtitle} setSubtitle={setSubtitle}/>
          </Col>
        </Row>
        <Row noGutters>
          <Col>
            <Description description={description} setDescription={setDescription} />
           </Col>
        </Row>
        <Row>
          <Col md={{span: 4}}>
            <Row noGutters>
              <Day day={day} setDay={setDay}/>
              <Month month={month} setMonth={setMonth}/>
              <Year year={year} setYear={setYear}/>
            </Row>
            <Row noGutters>
              <Time time={time} setTime={setTime}/>
            </Row>
          </Col>
          <Col md={{span: 2}}>
            <Privacy privacy={privacy} setPrivacy={setPrivacy}/>
          </Col>
          <Col>
            <Location location={location} setLocation={setLocation}/>
          </Col>
        </Row>
        <Form.Group>
          <Button 
            sm={{offset: 2}}
            type="submit"
            >Submit</Button>
        </Form.Group>
      </Form>
    </div>
  )
}

export default OccasionForm;