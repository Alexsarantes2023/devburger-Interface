import { useEffect, useState } from 'react';
import { Container, Banner, CategoryMenu, ProductsContainer, CategoryButton, Links} from './styles';
import { api } from '../../services/api';
import { formatPrice } from '../../utils/formatPrice';
import { CardProduct } from '../../components';
import { useLocation, useNavigate } from 'react-router-dom';

export function Menu() {
    
    const [categories, setCategories] = useState([]);
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);

    const navigate = useNavigate();

    const { search } = useLocation();

    const queryParams = new URLSearchParams(search);

    const [activeCategory, setActiveCategory] = useState(() => {
        const categoryId = +queryParams.get('categoria');

        if (categoryId) {
            return categoryId
        }
        return 0;
    });

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
            })); // Realiza os filtros dos produtos verdadeiros

            setProducts(newProducts);
        }

        loadCategories();
        loadProducts();
    }, []);

    useEffect(() => {
        if (activeCategory === 0) {
            setFilteredProducts(products);
        } else {
            const newFilteredProducts = products.filter(
                (product) => product.category_id === activeCategory,
            );
            setFilteredProducts(newFilteredProducts);
        }

    }, [products, activeCategory]);
    

    return (
        <Container>
            <Banner>
                <h1>O MELHOR
                    <br />
                    HAMBURGER
                    <br />
                    ESTÁ AQUI!
                    <span>Esse cardápio está irresistível!</span>
                </h1>
            </Banner>

            <CategoryMenu>
                {categories.map((category) => (
                    <CategoryButton
                        key={category.id}
                        $isActiveCategory={category.id === activeCategory}
                        onClick={() => {

                            navigate({
                                pathname: '/cardapio',
                                search: `?categoria=${category.id}`,
                            }, {
                                replace: true,
                            },
                            );
                            setActiveCategory(category.id);
                        }}
                    >
                        {category.name}
                    </CategoryButton>
                ))}
            </CategoryMenu>

            <ProductsContainer>
                {filteredProducts.map((product) => (
                    <CardProduct products={product} key={product.id} />
                ))}
                <p className='retornar'>Retornar a Home? <Links to="/">Clique aqui.</Links></p>
            </ProductsContainer>
            
        </Container>
        
    );
}





// export function Menu() {
//     const [categories, setCategories] = useState([]);
//     const [products, setProducts] = useState([]);

//     const navigate = useNavigate();

//     useEffect(() => {
//             async function loadCategories() {
//                 const { data } = await api.get('/categories');

//                 const newCategories = [{ id: 0, name: 'Todas' }, ...data];
    
//                 setCategories(newCategories);
//             }
    
        

//             async function loadProducts() {
//                     const { data } = await api.get('/products');
        
//                 const newProducts = data.map((product) => ({
//                         currencyValue: formatPrice(product.price),
//                         ...product,
//                     })); // realiza os filtros dos produtos verdadeiros
        
//                     setProducts(newProducts);
//             }
        
//             loadCategories();
//             loadProducts();
            
//         }, []);

//     return (
//         <Container>

//             <Banner>
//                 <h1>O MELHOR
//                     <br />
//                     HAMBURGER
//                     <br />
//                     ESTÁ AQUI!
//                     <span>Esse cardápio está irresistivel!</span>
//                 </h1>
//             </Banner>



//                
            

//         </Container>
//     );
// }