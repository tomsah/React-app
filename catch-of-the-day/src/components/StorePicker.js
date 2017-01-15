import React from 'react';
import { getFunName} from '../helpers';

class StorePicker extends React.Component {
  //bind your custom event to the es6 class
  //this is the constructor method a different way
  //to do check the form onSubmit attribute
  /*
      constructor () {
        super();
        this.gotToStore = this.gotToStore.bind(this);
      }
  */


  gotToStore(event) {
    event.preventDefault();
    console.log("you have submit the form");
    const storeID = this.storeInput.value;
        console.log( `going to : ${storeID}`);
    this.context.router.transitionTo(`/store/${storeID}`);
  }

  render() {
    return (
      <form className="store-selector" onSubmit={(e) => {this.gotToStore(e)}} >
        <h2>Please enter a stroe </h2>
        <input type="text" required
               placeholder="Store name"
               defaultValue={getFunName()}
               ref={(input) => {this.storeInput = input}}
        />
        <button type="submit">visit the store -> </button>
      </form>
      )
  }
}

StorePicker.contextTypes = {
  router: React.PropTypes.object
}

export default StorePicker;