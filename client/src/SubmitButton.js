// import logo from './logo.svg';
import React from 'react';
import UserStore from './stores/UserStores';
import './App.css';

class SubmitButton extends React.Component 
{
  render()
  {
    return (
      <div className="submitButton">
        <button
            className = 'btn'
            disabled = {this.props.disabled}
            onClick = { () => this.props.onClick() }
        >
            {this.props.text}
        </button>
      
      </div>
    );
  }
}

export default SubmitButton;
