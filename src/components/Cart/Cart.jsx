import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { useDispatch, useSelector } from "react-redux";
import { remove } from "../../store/cartSlice"

const Cart = () => {

    const dispatch = useDispatch();
    const cartProducts = useSelector(state => state.cart);
    
    const removeFromCart = (id) => {
        dispatch(remove(id));
    }

    const listCartProducts = () => {
        return cartProducts.map((product) => {
            return (
                <div className="col-md-12" style={{marginTop: '10px'}}>
                    <Card key={product.id} className="h-100">
                        <div className="text-center">
                            <Card.Img variant="top" src={product.image} style={{ height: '130px', width:'100px' }} />
                        </div>
                        <Card.Body>
                            <div className="text-center">
                            <Card.Title>{product.title}</Card.Title>
                            <Card.Text> €{product.price} </Card.Text>
                            </div>
                        </Card.Body>
                        <Card.Footer>
                            <div className="text-center">
                            <Button variant="danger" onClick={() => {removeFromCart(product.id)} }><img src="https://www.svgrepo.com/download/78963/rubbish-bin.svg" height="20px" width="20px"></img> Remove</Button>
                            </div>
                        </Card.Footer>
                    </Card> 
                </div>
            );
        });
      }

    return (
        <>
            <h1>Products in the Cart</h1> 
            <div className="row">
                {listCartProducts()}
            </div>
        </>
    );
}

export default Cart;