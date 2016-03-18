import expect from 'expect';

import categoriesReducer from '../app/reducers/categoriesReducer';
import {
    startFetchingCategories,
    fetchCategoriesSuccess,
    fetchCategoriesFail,
    fetchCategories
} from '../app/actions/categoriesActions';
