import React, { Component } from 'react';
//import logo from './logo.svg';
import './../css/bootstrap.min.css';
import './../css/App.css';
import ProductList from './ProductList'

class App extends Component {
  render() {
    return (
      <div className="container">
        <ProductList />  
      </div>
    );
  }
}

export default App;
