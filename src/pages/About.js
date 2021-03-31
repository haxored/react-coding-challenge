import React from 'react';
import logo from '../img/logo/logo.png';
import { Image } from 'react-bootstrap';

class About extends React.Component {
  render() {
    return (
      <div className="p-3">
          <div className="top-text"><p className="font-weight-bold">About</p></div>
          <div className='about'>
              <Image src={logo} className="about-logo" alt="MagellanDigital Logo" fluid />
          </div>
          <div className="bottom-text"><p><span className="font-weight-bold text-center">Coding Challenge DATE:</span>&nbsp;March 30, 2021</p></div>
      </div>
    );
  }
}

export default About;