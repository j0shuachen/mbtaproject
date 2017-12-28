import React from 'react';
// const data = require('./lib/Departures.csv');
const axios = require('axios');

class Board extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      arrivals: [],
      departures: [],
      tick: 0,
      clock: new Date(),
      data: ''
    };
    this.parser = this.parser.bind(this);
    this.sorter = this.sorter.bind(this);
    this.clockTime = this.clockTime.bind(this);
    this.boardHeader = this.boardHeader.bind(this);
    this.axiosCall = this.axiosCall.bind(this);
  }

  ticker(){
    this.setState({tick: this.state.tick + 1});
    // console.log(this.state.tick);
  }

  boardHeader(){
    var time =  this.state.clock;
    var month = time.getMonth() + 1;
    var date = time.getDate();
    var day = time.getDay();
    var year = time.getFullYear();
    var clock = this.clockTime(new Date());
    var hours = clock[0];
    var minutes = clock[1];
    var ampm = clock[2];
    var seconds = clock[3];
    // console.log(seconds);

    return(
      <div className='boardheader'>
        <div className='row'>
          {this.day(day)}
          <div className='stationname'>{this.props.location}</div>
          <div>Current Time</div>
        </div>
        <div className='row'>
          <div>{month + '-' + date + '-' + year}</div>
          <div>{hours + ':' + minutes + ' ' + ampm}</div>
        </div>
      </div>
    );
  }

  clockTime(x){
    var clock = new Date(x);
    var hour = clock.getHours();
    var minutes = clock.getMinutes();
    var seconds = clock.getSeconds();
    // console.log(clock.getHours(),clock.getMinutes())
    if(minutes < 10){
      minutes = `0${minutes}`;
    }
    if(hour > 12){
      hour = hour - 12;
      var ampm = 'pm';
    }else if (hour === 0) {
      hour = 12;
      ampm ='am';
    }else{
      ampm = 'am';
    }
    return(
      [hour, minutes, ampm, seconds]
    );
  }

  day(x){
    var day;
    if (x === 0){
      day = 'Sunday';

    }else if (x === 1) {
      day = 'Monday';

    }else if (x === 2) {
      day = 'Tuesday';

    }else if (x === 3) {
      day = 'Wednesday';

    }else if (x === 4) {
      day = 'Thursday';

    }else if (x === 5) {
      day = 'Friday';

    }else if (x === 6) {
      day = 'Saturday';
    }
    return(
      <div className='day'>{day}</div>
    );
  }

  parser(){
    var arrivals = [];
    var departures = [];
    Array.from(this.state.data).forEach(trip => {
      if(this.props.location.toLowerCase() !== trip.Origin.toLowerCase()){
        arrivals.push(trip);
      }else{
        departures.push(trip);
      }
    });

    this.setState({arrivals: this.sorter(arrivals), departures: this.sorter(departures)});

  }

  sorter(unsorted){
    var sorted = unsorted.sort((a,b) => {
      return(parseInt(a.ScheduledTime) - parseInt(b.ScheduledTime));
    });
    return( sorted );
  }

  createList(list){
    const ar = [];
  // console.log(list);
    list.forEach((g, idx) => {
      var x = (parseInt(g.ScheduledTime) * 1000);
      var time = this.clockTime(x);
      var hours = time[0];
      var minutes = time[1];
      var ampm = time[2];

      ar.push(
        <div className='tripinfo' key={idx}>
          <div className='smallcolumn'>MBTA</div>
          <div id='center' className='timecolumn'>{hours + ':' + minutes + ' ' + ampm}</div>
          <div id='center' className='smallcolumn'>{g.Trip}</div>
          <div id='location' className='largecolumn'>{g.Destination}</div>
          <div id='center' className='smallcolumn'>{g.Track === '' ? 'TBD' : g.Track}</div>
          <div className='medcolumn'>{g.Status}</div>
        </div>
      );
    });

    return ar;
  }

  columnheader(){

    return(
      <div className='tripinfo'>
        <div id='header' className='smallcolumn'>Carrier</div>
        <div id='header' className='timecolumn'>Time</div>
        <div id='header' className='smallcolumn'>Train#</div>
        <div id='header'  className='largecolumn'>Destination</div>
        <div id='center' className='smallcolumn'>Track</div>
        <div id='header' className='medcolumn'>Status</div>
      </div>
    );

  }


  axiosCall(){
    axios.get('/api/board').then((resp)=>{
    // console.log('hitting');
    this.setState({data: resp.data}, () => this.parser());

    });
  }

  componentDidMount(){
    this.axiosCall();

    window.setInterval(function () {
      this.ticker();
    }.bind(this), 1000);

    window.setInterval(function(){
      this.axiosCall();
    }.bind(this),1000);
  }

  render(){
    // console.log(this.state);
    return(
      <div className='board'>
        {this.boardHeader()}

        <div className={this.props.direction}>

          <div className='boardcol'>
            <div className='minititle'>Departures</div>
            {this.columnheader()}
            {this.createList(this.state.departures)}
          </div>

          <div className='boardcol'>
            <div className='minititle'>Arrivals</div>
            {this.columnheader()}
            {this.createList(this.state.arrivals)}
          </div>

        </div>
      </div>
    );
  }

}

export default Board;
