import { combineReducers } from '@reduxjs/toolkit';
import order from './orderSlice';
import orders from './ordersSlice';
import product from './productSlice';
import products from './productsSlice';
import contacts from './contactsSlice';

const reducer = combineReducers({
	products,
	product,
	orders,
	order,
	contacts
});

export default reducer;
