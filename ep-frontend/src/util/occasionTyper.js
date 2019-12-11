/**
 * This module contains occasionformatting tools
 * @module occasionTyper 
 */

 /**
  * This function returns a css className, that corresponds to the occasion's type.
  * @function getClassName
  * @param { occasion } occasion 
  */
function getClassName(occasion){      
  let typeStyle = "";
  if(occasion.type === 'owned'){
    typeStyle = "occ-type-owned"
  } else if(occasion.type === 'invited') {
    typeStyle = "occ-type-invited"
  } else if(occasion.type === 'participant'){
    typeStyle = "occ-type-participant"
  } else if(occasion.type === 'public'){
    typeStyle = "occ-type-public"
  } 
  //Occasion is temporarely hidden to wait re-render
  else if(occasion.type === 'delete'){
    typeStyle = "occ-hide-until-rerender"
  }
  return typeStyle;
}  


/**
 * This function return short info text, that corresponds the occasion's type.
 * @function getOccasionInfoText
 * @param { occasion } occasion 
 */
const getOccasionInfoText = (occasion) => {
  const type = occasion.type;
  let info = '';
  if(type === 'owned'){
    info = 'Owner of this event'
  } else if(type === 'invited'){
    info = 'Invited to this event'
  } else if(type === 'participant'){
    info = 'Participating this event'
  } else if(type === 'public'){
    info = 'Public event'
  } else {
    info = 'Err: Event-type not tailored'
  }
  return info;
}

/**
 * This function takes occasions json date property and converts it to a proper Date obj.
 * @function convertJSONToDate
 * @param { occasion } occasion 
 */
const convertJSONToDate = (occasion) => {
  try{    
    occasion.date = new Date(occasion.date)
    return;
  } catch(exception){
    console.log(exception);
  }
}

module.exports =  { getClassName, getOccasionInfoText, convertJSONToDate }