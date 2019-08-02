import React from 'react';

class CartItem extends React.Component {
    state = {
        qty: 1
    };

    increaseQty = () => {
        this.setState({
            qty: this.state.qty + 1
        });
    };

    decreaseQty = () => {
        if (this.state.qty > 0) {
            this.setState({
                qty: this.state.qty - 1
            });
        }
    };

    render() {
        let { name, price } = this.props;
        return (
            <div className="cart-item">
                <div className="cart-item-name">Name: {name}</div>
                <div className="cart-item-price">Price: {price}Rs</div>
                <div className="cart-item-qty">Quantity: {this.state.qty}</div>
                <button onClick={this.increaseQty}>▲</button>
                <button onClick={this.decreaseQty}>▼</button>
                <hr/>
            </div>
        );
    }
}

export default CartItem;
