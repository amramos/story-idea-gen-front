import { useState, useEffect } from "react";
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Alert from "react-bootstrap/Alert";
import { useDispatch, useSelector } from "react-redux";
import { add } from "../../store/cartSlice"
import { getProducts } from "../../store/productSlice";
import Spinner from 'react-bootstrap/Spinner';
import enums from "../../enums"

const Products = () => {
    const { data: products, loadingStatus } = useSelector(state => state.products);

    const dispatch = useDispatch();

    const addToCart = (product) => {
        dispatch(add(product));
    }

    useEffect(() => {
        // api
        dispatch(getProducts());
    }, []);

    const handleLoadingState = () => {
        if (loadingStatus === enums.loadingStatus.LOADING) {
            return <div className="text-center"><Spinner  animation="border" variant="primary"/></div>
        }
        
        if (loadingStatus === enums.loadingStatus.ERROR) {
            return  <Alert variant="danger">
                        Something went wrong. Please try again later.
                    </Alert>
        }

        return;
    }

    function listProducts() {
        return products.map((product) => {
            return (
                <div className="col-md-3" style={{marginTop: '10px'}}>
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
                            <Button variant="primary" onClick={() => {addToCart(product)} }>Add to cart</Button>
                            </div>
                        </Card.Footer>
                    </Card> 
                </div>
            );
        });
      }

    return (
        <> 
            <h1>Products dashboard</h1> 
            <div className="row">
                {handleLoadingState()}
                {listProducts()}
            </div>
        </>
    );
}

export default Products;