import FuseScrollbars from '@fuse/core/FuseScrollbars';
import FuseUtils from '@fuse/utils';
import _ from '@lodash';
import Checkbox from '@material-ui/core/Checkbox';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { withRouter } from 'react-router-dom';
import OrdersStatus from '../order/OrdersStatus';
import { selectOrders, getOrders } from '../store/ordersSlice';
import OrdersTableHead from './OrdersTableHead';
import axios from 'axios';

function OrdersTable(props) {
	const dispatch = useDispatch();
	const orders = useSelector(selectOrders);
	const searchText = useSelector(({ eCommerceApp }) => eCommerceApp.orders.searchText);
	
	const [selected, setSelected] = useState([]);
	const [data, setData] = useState([]);
	const [page, setPage] = useState(0);
	const [rowsPerPage, setRowsPerPage] = useState(10);
	const [order, setOrder] = useState({
		direction: 'asc',
		id: null
	});

	console.log("Data: ", data)
	useEffect(()=>{
		  async function fetchAPI() {
			const response = await axios.get(`${process.env.REACT_APP_API_URI}/order`, {
				headers: {'Content-Type': 'application/json'}});
			setData(response.data);
		  }
	
		  fetchAPI();
		},[]);

	function handleRequestSort(event, property) {
		const id = property;
		let direction = 'desc';

		if (order.id === property && order.direction === 'desc') {
			direction = 'asc';
		}

		setOrder({
			direction,
			id
		});
	}

	function handleSelectAllClick(event) {
		if (event.target.checked) {
			setSelected(data.map(n => n.id));
			return;
		}
		setSelected([]);
	}

	function handleClick(item) {
		props.history.push(`/apps/e-commerce/orders/${item.scode}`);
	}

	function handleCheck(event, id) {
		const selectedIndex = selected.indexOf(id);
		let newSelected = [];

		if (selectedIndex === -1) {
			newSelected = newSelected.concat(selected, id);
		} else if (selectedIndex === 0) {
			newSelected = newSelected.concat(selected.slice(1));
		} else if (selectedIndex === selected.length - 1) {
			newSelected = newSelected.concat(selected.slice(0, -1));
		} else if (selectedIndex > 0) {
			newSelected = newSelected.concat(selected.slice(0, selectedIndex), selected.slice(selectedIndex + 1));
		}

		setSelected(newSelected);
	}

	function handleChangePage(event, value) {
		setPage(value);
	}

	function handleChangeRowsPerPage(event) {
		setRowsPerPage(event.target.value);
	}
	// return (<></>)
	return (
		<div className="w-full flex flex-col">
			<FuseScrollbars className="flex-grow overflow-x-auto">
				<Table stickyHeader className="min-w-xl" aria-labelledby="tableTitle">
					<OrdersTableHead
						numSelected={selected.length}
						order={order}
						onSelectAllClick={handleSelectAllClick}
						onRequestSort={handleRequestSort}
						rowCount={data.length}
					/>

					<TableBody>
						{_.orderBy(
							data,
							[
								o => {
									switch (order.id) {
										case 'id': {
											return parseInt(o.id, 10);
										}
										case 'customer': {
											return o.sname;
										}
										case 'payment': {
											return o.sname;
										}
										case 'status': {
											return o.sname;
										}
										default: {
											return o.sname;
										}
									}
								}
							],
							[order.direction]
						)
							.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
							.map(n => {
								console.log(n)
								const isSelected = selected.indexOf(n.id) !== -1;
								return (
									<TableRow
										className="h-64 cursor-pointer"
										hover
										role="checkbox"
										aria-checked={isSelected}
										tabIndex={-1}
										key={n.id}
										selected={isSelected}
										onClick={event => handleClick(n)}
									>
										{/* <TableCell className="w-40 md:w-64 text-center" padding="none">
											<Checkbox
												checked={isSelected}
												onClick={event => event.stopPropagation()}
												onChange={event => handleCheck(event, n.id)}
											/>
										</TableCell> */}

										<TableCell className="p-4 md:p-16" component="th" scope="row">
											{n.customer_firstName + ' ' + n.customer_lastName}
										</TableCell>
										<TableCell className="p-4 md:p-16" component="th" scope="row" align="left">
											{n.employee_firstName + ' ' + n.employee_lastName}
										</TableCell>
										<TableCell className="p-4 md:p-16" component="th" scope="row">
											{n.fabric_name}
										</TableCell>

										<TableCell className="p-4 md:p-16" component="th" scope="row">
											{n.fabric_color}
										</TableCell>
										<TableCell className="p-4 md:p-16" component="th" scope="row">
											{n.bolt_length}
										</TableCell>
										<TableCell className="p-4 md:p-16" component="th" scope="row">
											{n.total_price}
										</TableCell>
										<TableCell className="p-4 md:p-16" component="th" scope="row">
											{n.p_date}
										</TableCell>

										{/* <TableCell className="p-4 md:p-16" component="th" scope="row">
											<OrdersStatus name={n.sname} />
										</TableCell>

										<TableCell className="p-4 md:p-16" component="th" scope="row">
										{n.sname}
										</TableCell> */}
									</TableRow>
								);
							})}
					</TableBody>
				</Table>
			</FuseScrollbars>

			<TablePagination
				className="flex-shrink-0 border-t-1"
				component="div"
				count={data.length}
				rowsPerPage={rowsPerPage}
				page={page}
				backIconButtonProps={{
					'aria-label': 'Previous Page'
				}}
				nextIconButtonProps={{
					'aria-label': 'Next Page'
				}}
				onChangePage={handleChangePage}
				onChangeRowsPerPage={handleChangeRowsPerPage}
			/>
		</div>
	);
}

export default withRouter(OrdersTable);
