import React from 'react';
import CartItem from './CartItem';
import { Route, Link } from 'react-router-dom';

class App extends React.Component {

    state = {
        product: null,
        cart: []
    };

    componentDidMount() {
        this.fetchData();
    }

    fetchData = async () => {
        const response = await fetch('https://app.krishnabhavanfoods.in/api/product/getproducts/');
        const result = await response.json();
        console.log(result);

        let myArr = [];

        for (let i = 0; i < result.length; i++) {
            myArr.push(result[i]);
        }

        this.setState({
            products: myArr
        });
    };

    displayData = () => {
        let {products} = this.state;
        let arr = products.map((product, idx) => {
            let name = product.name;
            let img = `https://app.krishnabhavanfoods.in/${product.image_name}`;
            let price = product.price[0].price;
            let weight = product.weight;
            return (
                <div key={idx} className="item">
                    <div className="item-head">{name}</div>
                    <img src={img} width="120px" height="150px" alt="product" />
                    <span>Price: {price}rs</span>
                    <span>Weight: {weight}gm</span>
                    <button onClick={() => this.addToCart(product)}>Add to Cart</button>
                </div>
            );
        });
        return arr;
    };

    addToCart = (product) => {
        let arr = this.state.cart.concat(product);
        this.setState({
            cart: arr
        });
    };

    renderCartItems = () => {
        if (this.state.cart.length > 0) {
            let arr = this.state.cart.map((elem, idx) => {
                console.log('foo');
                return (
                    <CartItem key={idx} name={elem.name} price={elem.price[0].price} />
                );
            });
            return arr;
        }
    };

    render() {
        let { cart } = this.state;
        return (
            <div className="app">
                <Route path="/cart" render={() => (
                    <div className="cart-list">
                        {(cart.length <= 0)? <span>No items in cart</span> : this.renderCartItems()}
                    </div>
                )}/>
                <Route exact path="/" render={() => (
                    <div className="name-list">
                        <Link to="/cart">Cart</Link>
                        <div className="name-list-head">Product List</div>
                        <div className="name-list-body">
                            {(this.state.products) && this.displayData()}
                        </div>
                    </div>
                )}/>
            </div>
        );
    }
}

export default App;
