import React, {useEffect} from "react";
import {useDispatch} from "react-redux";

import {fetchCategories} from "../store/actions/categories";
import {CategoriesState} from "../store/reducers/categories";

type CategoriesProps = {
    categories: CategoriesState,
    onSelect(category: string): void,
}

const Categories: React.FC<CategoriesProps> = ({categories, onSelect}) => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchCategories());
    }, [dispatch]);


    return <ul>
        {
            categories.map((category: string) => {
                return <li key={category}>
                    <button onClick={() => onSelect(category)}>{category}</button>
                </li>
            })
        }
    </ul>
};

export default Categories;
