import { createSlice, createAsyncThunk, createEntityAdapter } from '@reduxjs/toolkit';
import axios from 'axios';

export const getOrders = createAsyncThunk('eCommerceApp/orders/getOrders', async () => {
	try {
		const response = await axios.get(`${process.env.REACT_APP_API_URI}/supplier`, {
			headers: { 'Content-Type': 'application/json' }
		});
		console.log(response);
		const data = await response.data;
		console.log('Response Data', data[0]);
		return { data };
	} catch (err) {
		console.log(err.response);
	}
});

const ordersAdapter = createEntityAdapter({});

export const { selectAll: selectOrders, selectById: selectOrderById } = ordersAdapter.getSelectors(
	state => state.eCommerceApp.orders
);

const ordersSlice = createSlice({
	name: 'eCommerceApp/orders',
	initialState: ordersAdapter.getInitialState({
		searchText: ''
	}),
	reducers: {
		setOrdersSearchText: {
			reducer: (state, action) => {
				state.searchText = action.payload;
			},
			prepare: event => ({ payload: event.target.value || '' })
		},
		openNewContactDialog: (state, action) => {
			state.contactDialog = {
				type: 'new',
				props: {
					open: true
				},
				data: null
			};
		},
		closeNewContactDialog: (state, action) => {
			state.contactDialog = {
				type: 'new',
				props: {
					open: false
				},
				data: null
			};
		}
	},
	extraReducers: {
		[getOrders.fulfilled]: ordersAdapter.setAll
	}
});

export const { setOrdersSearchText, openNewContactDialog, closeNewContactDialog } = ordersSlice.actions;

export default ordersSlice.reducer;
