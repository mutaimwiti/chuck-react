import {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";

import {State} from "../store/reducers";
import {fetchCategories} from "../store/actions/categories";
import {CategoriesState} from "../store/reducers/categories";

const Categories = () => {
    const dispatch = useDispatch();
    const categories = useSelector<State, CategoriesState>((state) => state.categories);

    useEffect(() => {
        dispatch(fetchCategories());
    }, [dispatch]);

    return <ul>
        {
            categories.map((category: string) => {
                return <li key={category}>{category}</li>
            })
        }
    </ul>
};

export default Categories;
