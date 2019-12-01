import React from 'react';

const Occasion = ({occasion}) => {

  function getClassName(){
    let typeStyle = "";
    if(occasion.type === 'owned'){
      typeStyle = "occ-type-owned"
    } else if(occasion.type === 'invited') {
      typeStyle = "occ-type-invited"
    } else {
      typeStyle = "occ-type-public"
    }

    return typeStyle;
  }


  return (
    <div className={`${getClassName()}`}>
      <h2>{occasion.title}</h2> 
      <h4>{occasion.subtitle} - {occasion.type}</h4> <br/>

      <p>{occasion.description}</p>
      <br/>
    </div>
  )
}

export default Occasion;