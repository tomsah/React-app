import React from 'react';
import Header from './Header';
import Order from './Order';
import Inventory from './Inventory';
import sampleFishes from "../sample-fishes";
import Fish from './Fish';
import base from '../base';


class App extends React.Component {
  constructor() {
    super();

    //bind addFish function to App.js
    this.addFish = this.addFish.bind(this);
    this.loadSamples = this.loadSamples.bind(this);
    this.addToOrder = this.addToOrder.bind(this);
    this.updateFish = this.updateFish.bind(this);
    this.removeFish = this.removeFish.bind(this);
    this.removeFromOrder = this.removeFromOrder.bind(this);

    //getinitialstate
    this.state ={
      fishes: {},
      order: {}
    };
  }

  componentWillMount() {
    //this runs right before the <App> is rendered
    this.ref = base.syncState(`${this.props.params.storeId}/fishes`,
    {
      context: this,
      state: 'fishes'
    });

    //check if there is any order in localstorage
    const localStorageRef = localStorage.getItem(`order-${this.props.params.storeId}`);

    if(localStorageRef) {
      //update our App component's order state
      this.setState({
        order : JSON.parse(localStorageRef)
      })
    }
  }

  componentWillUnmount() {
    base.removeBinding(this.ref);
  }

  //save our order state in localstorgage
  componentWillUpdate(nextProps, nextState) {
    localStorage.setItem(`order-${this.props.params.storeId}`,
        JSON.stringify(nextState.order));
  }

  addFish(fish) {
     //update our state
    const fishes = {...this.state.fishes};

     //add our fish object fish from AddFishForm
     const timestamp = Date.now();

     fishes[`fish-${timestamp}`] = fish;

     //set state
     this.setState({
      fishes: fishes
    });
  }

  updateFish(key, updatedFish) {
    // take a copy of all the fish,
    //always take a copy of all the object before updating state
    const fishes = {...this.state.fishes};
    //update the one fish that is changed with the new object
    fishes[key] = updatedFish;
    //set  state
    this.setState({ fishes });
  }

  removeFish(key) {
    //take a copy of the object
    const fishes = {...this.state.fishes};
    //get the object chanage
    fishes[key] = null;
    //update the object
   this.setState({ fishes });
  }

  loadSamples() {
    this.setState({
      fishes: sampleFishes
    });
  }

  addToOrder(key) {
    //take a copy of our state
    const order = {...this.state.order}
    //update our state
    order[key] = order[key] + 1  || 1;
    //update our state
    this.setState({ order: order });
  }

  removeFromOrder(key) {
    const order ={...this.state.order}
    delete order[key];
    this.setState({ order })
  }

  render () {
    return (
        <div className="catch-of-the-day">
          <div className="menu">
            <Header tagline="Fresh Seafood Market" />
            <ul className="list-of-fishes">
              {
                Object
                  .keys(this.state.fishes)
                  .map(key => <Fish key={key} index={key} details={this.state.fishes[key]} addToOrder={this.addToOrder} />)
              }
            </ul>
          </div>
            <Order
            fishes={this.state.fishes}
            order={this.state.order}
            params = {this.props.params}
            removeFromOrder = {this.removeFromOrder}
            />
            <Inventory
              addFish={this.addFish}
              loadSamples={this.loadSamples}
              fishes = {this.state.fishes}
              updateFish = {this.updateFish}
              removeFish = {this.removeFish}
              storeId = {this.props.params.storeId}
            />
        </div>
    )
  }
}

App.propTypes = {
  params: React.PropTypes.object.isRequired
}

export default App;