import { useEffect, useState } from 'react';
import { Container, Banner, CategoryMenu, ProductsContainer, CategoryButton } from './styles';
import { api } from '../../services/api';
import { formatPrice } from '../../utils/formatPrice';
import { CardProduct } from '../../components/CardProduct';

export function Menu() {
    const [categories, setCategories] = useState([]);
    const [products, setProducts] = useState([]);

    useEffect(() => {
            async function loadCategories() {
                const { data } = await api.get('/categories');

                const newCategories = [{ id: 0, name: 'Todas' }, ...data];
    
                setCategories(newCategories);
            }
    
        

            async function loadProducts() {
                    const { data } = await api.get('/products');
        
                const newProducts = data.map((product) => ({
                        currencyValue: formatPrice(product.price),
                        ...product,
                    })); // realiza os filtros dos produtos verdadeiros
        
                    setProducts(newProducts);
            }
        
            loadCategories();
            loadProducts();
            
        }, []);

    return (
        <Container>

            <Banner>
                <h1>O MELHOR
                    <br />
                    HAMBURGER
                    <br />
                    ESTÁ AQUI!
                    <span>Esse cardápio está irresistivel!</span>
                </h1>
            </Banner>

            <CategoryMenu>
                {categories.map((category) =>
                    <CategoryButton key={category.id}>{category.name}</CategoryButton>
                )}
            </CategoryMenu>

            <ProductsContainer>
                {products.map((product) => (
                    <CardProduct products={product} key={product.id} />
                ))}
            </ProductsContainer>    
            

        </Container>
    );
}