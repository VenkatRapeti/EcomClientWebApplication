import styled from "styled-components";
import Navbar from "../components/Navbar";
import Announcement from "../components/Announcement";
import Products from "../components/Products";
import Newsletter from "../components/Newsletter";
import Footer from "../components/Footer";
import { mobile } from "../responsive";
import { useLocation } from "react-router";
import { useState } from "react";

const Container = styled.div``;

const Title = styled.h1`
    margin : 20px;
`;

const FilterContainer = styled.div`
    display : flex;
    justify-content : space-between;
`;

const Filter = styled.div`
    margin : 20px;
    ${mobile({ margin: "0px 20px", display: "flex", flexDirection: "column;" })}
`;

const FilterText = styled.span`
    font-size : 20px;
    font-weight : 600;
    margin-right : 20px;
    ${mobile({ marginRight: "0px" })}
`;

const Select = styled.select`
    padding : 10px;
    margin-right : 20px;
    ${mobile({ margin: "10px 0px" })}
`;

const Option = styled.option``;

const ProductList = () => {
    const Location = useLocation();
    const category = Location.pathname.split("/")[2];
    const [filters, setFilters] = useState({});
    const [sort, setSort] = useState("new");


    const handleFilters = (event) => {
        const value = event.target.value;
        setFilters({
            ...filters,
            [event.target.name]: value
        });
    }


    return (
        <Container>
            <Navbar />
            <Announcement />
            <Title>{category}</Title>
            <FilterContainer>
                <Filter>
                    <FilterText>Filter Products:</FilterText>
                    <Select name="color" onChange={handleFilters}>
                        <Option disabled selected>Color</Option>
                        <Option>RED</Option>
                        <Option>BLUE</Option>
                        <Option>GREEN</Option>
                        <Option>YELLOW</Option>
                        <Option>WHITE</Option>
                        <Option>BLACK</Option>
                    </Select>
                    <Select name="size" onChange={handleFilters}>
                        <Option disabled selected>Size</Option>
                        <Option>XS</Option>
                        <Option>S</Option>
                        <Option>M</Option>
                        <Option>L</Option>
                        <Option>XL</Option>
                    </Select>
                </Filter>
                <Filter>
                    <FilterText>Sort Products:</FilterText>
                    <Select onChange={(event) => setSort(event.target.value)}>
                        <Option value="new">Newest</Option>
                        <Option value="asce">Price Low to High</Option>
                        <Option value="desc">Price High to Low</Option>
                    </Select>
                </Filter>
            </FilterContainer>
            <Products category={category} filters={filters} sort={sort} />
            <Newsletter />
            <Footer />
        </Container>
    )
}

export default ProductList;
