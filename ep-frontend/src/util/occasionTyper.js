
function getClassName(occasion){  

  let typeStyle = "";
  if(occasion.type === 'owned'){
    typeStyle = "occ-type-owned"
    occasion.info = 'Owner of this event'
  } else if(occasion.type === 'invited') {
    typeStyle = "occ-type-invited"
    occasion.info = 'Invited to this event'
  } else if(occasion.type === 'participant'){
    typeStyle = "occ-type-participant"
    occasion.info = 'Participating this event'
  } else if(occasion.type === 'public'){
    typeStyle = "occ-type-public"
    occasion.info = 'Public event'
  } 
  //Occasion is temporarely hidden to wait re-render
  else if(occasion.type === 'delete'){
    typeStyle = "occ-hide-until-rerender"
  }
  return typeStyle;
}  

module.exports =  { getClassName }