import React, { useState } from 'react';

const OccasionForm = () => {

  const [title, setTitle] = useState('');
  const [subtitle, setSubtitle] = useState('');
  const [description, setDescription] = useState('');
  const [privacy, setPrivacy] = useState(false);

  const handleSubmit = (event) => {
    try{
      event.preventDefault();

      

    } catch(exception) {
      console.log(exception);
    }
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          Title:
          <input
            type="text"
            value={title}
            name="Title"
            onChange={({target}) => setTitle(target.value)}
          />
        </div>
        <div>
          Subtitle:
          <input
            type="text"
            value={subtitle}
            name="Subtitle"
            onChange={({target}) => setSubtitle(target.value)}
          />
        </div>
        <div>
          Description
          <input
            multiline="true"
            onChange={({target}) => setDescription(target.value)}
            value={description}
          />
        </div>
        <div>
          Set privacy of event
          <input
            type="radio"
            name="privacy"
            value="Private"
            checked={privacy}
            onChange={() => setPrivacy(!privacy)}
          />
          <input
            type="radio"
            name="privacy"
            value="Public"
            checked={privacy}
            onChange={() => setPrivacy(!privacy)}
          />
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  )
}

export default OccasionForm;