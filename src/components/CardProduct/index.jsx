import PropTypes from 'prop-types';

import { useCart } from '../../hooks/cartContext';
import { CartButton } from '../CartButton';
import { CardImage, Container } from './styles';

export function CardProduct({ products }) {
    const { putProductInCart } = useCart();
    
    return (
        <Container>
            <CardImage src={products.url} alt={products.name} />
            <div>
                <p>{products.name}</p>
                <strong>{products.currencyValue}</strong>
            </div>
           <CartButton onClick={ () => putProductInCart(products)}></CartButton>
        </Container>
    );
}

CardProduct.propTypes = {
    products: PropTypes.object,
};
