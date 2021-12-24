import React from 'react';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import Product from './Product';
import axios from 'axios';
import { useLocation } from 'react-router';

const Container = styled.div`
    display : flex;
    padding : 20px;
    flex-wrap : wrap;
   
`;

const Products = ({ category, filters, sort }) => {
    const location = useLocation();
    const searchVal = location.pathname.split("/")[2];
    const [products, setProducts] = useState([]);
    const [filterProducts, setFilterProducts] = useState([]);


    useEffect(() => {
        const getProducts = async () => {
            try {
                const response = await axios.get(
                    category ? `https://fast-atoll-26785.herokuapp.com/findAllProducts?category=${category}`
                        : "https://fast-atoll-26785.herokuapp.com/findAllProducts"
                )
                setProducts(response.data);
            }
            catch (err) { }
        }
        getProducts()
    }, [category]);

    useEffect(() => {
        category &&
            setFilterProducts(
                products.filter((item) =>
                    Object.entries(filters).every(([key, value]) =>
                        item[key].includes(value)
                    )
                )
            );
    }, [filters, category, products])

    useEffect(() => {
        if (sort === "new") {
            setFilterProducts((prev) =>
                [...prev].sort((a, b) => a._id - b._id)
            );
        }
        else if (sort === "asce") {
            setFilterProducts((prev) =>
                [...prev].sort((a, b) => a.price - b.price))
        } else {
            setFilterProducts((prev) =>
                [...prev].sort((a, b) => b.price - a.price))
        }

    }, [sort])


    return (
        <Container>
            {category
                ? filterProducts.map((item) => (
                    <Product item={item} key={item.id} />
                ))
                : products.slice(0, 8).map((item) => (
                    <Product item={item} key={item.id} />
                ))}

        </Container>
    )
}

export default Products
