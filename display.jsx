import React from 'react';
import ReactDOM from 'react-dom';
import Board from './board';

class Display extends React.Component{

  render(){

    return(
      <div className='dividerrow'>
        <Board location='NORTH STATION' direction='boardcol'/>
        <Board location='SOUTH STATION' direction='boardcol'/>
      </div>
    );

  }

}


// class Airport extends React.Component{
//
//   render(){
//
//     return(
//       <div className='dividercolumn'>
//         <Board location='NORTH STATION' direction='boardrow'/>
//         <Board location='SOUTH STATION' direction='boardrow'/>
//       </div>
//     );
//
//   }
//
// }


class NorthStation extends React.Component{

  render(){

    return(
      <div className='dividercolumn'>
        <Board location='NORTH STATION' direction='boardrow'/>
      </div>
    );

  }

}

class SouthStation extends React.Component{

  render(){

    return(
      <div className='dividercolumn'>
        <Board location='SOUTH STATION' direction='boardrow'/>
      </div>
    );

  }

}



export {Display, NorthStation, SouthStation};
