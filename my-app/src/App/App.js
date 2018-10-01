import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import HttpService from '../services/http-service';

import Product from '../product/product';
import WishList from '../wishlist/wishlist';

const http = new HttpService();

class App extends Component {

  constructor(props){
    super(props);

    //data returned from server is stored in state array of products
    this.state = {products: []};
    
    //bind functions to this 
    this.loadData = this.loadData.bind(this);
    this.productList = this.productList.bind(this);

    this.loadData();
  }


  //function to retrieve list of products in constructor, before component is rendered
  loadData = () => {
    var self = this;
    //get product, check to see if data is returned or not
    //when promise is fulfilled, returned with data, then call this function
    http.getProducts().then(data => {
        console.log("checking promise");
        console.log(data);

        //set state, assign products to data array returned from server
        self.setState({products:data});
    }, err =>{
      //err occurs for rejection, handled here
    });
  }


  //create react component for each product in product array
  productList = () => {
    //map function, create Product component for each entry in array
    //each entry needs a unique key
    //list contains divs containing Product components
    const list = this.state.products.map((product) =>
        <div className = "col-sm-4 product" key = {product._id}>
          <Product product = {product}/>
        </div>
    );

    return (list);

  }


  render() { 
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo"/> 
          <h1 className="App-title"> Hello Alex </h1>
        </header>
        
        <div className = "App-main container-fluid">
          <div className = "row">

            <div className = "col-sm-8">
              <div className = "row">
                {this.productList()}
              </div>
            </div>

            <div className = "col-sm-4">
              <WishList/>
            </div>
          </div>
      
        </div>
    
      </div>
    );
  }

}

export default App;
