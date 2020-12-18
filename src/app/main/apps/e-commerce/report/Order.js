import FuseAnimate from '@fuse/core/FuseAnimate';
import FusePageCarded from '@fuse/core/FusePageCarded';
import Avatar from '@material-ui/core/Avatar';
import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import Icon from '@material-ui/core/Icon';
import { useTheme } from '@material-ui/core/styles';
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';
import Tooltip from '@material-ui/core/Tooltip';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import withReducer from 'app/store/withReducer';
import GoogleMap from 'google-map-react';
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { useDeepCompareEffect } from '@fuse/hooks';
import reducer from '../store';
import { getOrder } from '../store/orderSlice';
import OrderInvoice from './OrderInvoice';
import OrdersStatus from './OrdersStatus';
import axios from 'axios';
import Button from '@material-ui/core/Button';
import { CSVLink } from 'react-csv';
function Marker(props) {
	return (
		<Tooltip title={props.text} placement="top">
			<Icon className="text-red">place</Icon>
		</Tooltip>
	);
}

function Order(props) {
	const dispatch = useDispatch();
	// const order = useSelector(({ eCommerceApp }) => eCommerceApp.order);
	const theme = useTheme();
	const [data, setData] = useState([]);
	const [order, setOrder] = useState({
		id: '1',
		reference: '70d4d7d0',
		subtotal: '39.97',
		tax: '77.44',
		discount: '-10.17',
		total: '73.31',
		date: '2015/04/25 02:07:59',
		customer: {
			id: 1,
			firstName: 'Dollie',
			lastName: 'Bullock',
			avatar: 'assets/images/avatars/Abbott.jpg',
			company: 'Saois',
			jobTitle: 'Digital Archivist',
			email: 'abbott@withinpixels.com',
			phone: '+1-202-555-0175',
			invoiceAddress: {
				address: '704 6th Ave, New York, NY 10010, USA',
				lat: 40.7424739,
				lng: -73.99283919999999
			},
			shippingAddress: {
				address: '377 E South Omaha Bridge Rd, Council Bluffs, IA 51501, USA',
				lat: 41.2183223,
				lng: -95.8420876
			}
		},
		products: [
			{
				id: 1,
				name: 'A Walk Amongst Friends - Canvas Print',
				price: '10.24',
				quantity: 1,
				total: '10.24',
				image: 'assets/images/ecommerce/a-walk-amongst-friends.jpg'
			},
			{
				id: 2,
				name: 'Lago di Braies - Canvas Print',
				price: '24.62',
				quantity: 1,
				total: '24.62',
				image: 'assets/images/ecommerce/lago-di-braies.jpg'
			},
			{
				id: 3,
				name: 'Never Stop Changing - Canvas Print',
				price: '49.29',
				quantity: 1,
				total: '49.29',
				image: 'assets/images/ecommerce/never-stop-changing.jpg'
			}
		],
		status: [
			{
				id: 13,
				name: 'On pre-order (not paid)',
				color: 'purple-300',
				date: '2016/04/03 10:06:18'
			},
			{
				id: 1,
				name: 'Awaiting check payment',
				color: 'blue-500',
				date: '2015/03/17 18:28:37'
			}
		],
		payment: {
			transactionId: '2a894b9e',
			amount: '73.31',
			method: 'Credit Card',
			date: '2016/02/23 15:50:23'
		},
		shippingDetails: [
			{
				tracking: '',
				carrier: 'TNT',
				weight: '10.44',
				fee: '7.00',
				date: '2015/04/10 07:03:52'
			}
		]
	});
	const routeParams = useParams();
	const [tabValue, setTabValue] = useState(0);
	const [map, setMap] = useState('shipping');

	useDeepCompareEffect(() => {
		console.log('Deep', routeParams);
		async function fetchAPI() {
			let data = {
				customerCode: routeParams.orderId
			};
			const response = await axios.post(`${process.env.REACT_APP_API_URI}/makeReport`, data, {
				headers: { 'Content-Type': 'application/json' }
			});
			console.log(response);
			setData(response.data.data);
		}

		fetchAPI();
	}, [dispatch, routeParams]);
	console.log('REA', data);
	function handleChangeTab(event, value) {
		setTabValue(value);
	}

	return (
		<FusePageCarded
			classes={{
				content: 'flex',
				header: 'min-h-72 h-72 sm:h-136 sm:min-h-136'
			}}
			header={
				order && (
					<div className="flex flex-1 w-full items-center justify-between">
						<div className="flex flex-1 flex-col items-center sm:items-start">
							<FuseAnimate animation="transition.slideRightIn" delay={300}>
								<Typography
									className="normal-case flex items-center sm:mb-12"
									component={Link}
									role="button"
									to="/customer"
									color="inherit"
								>
									<Icon className="text-20">
										{theme.direction === 'ltr' ? 'arrow_back' : 'arrow_forward'}
									</Icon>
									<span className="mx-4">Customer</span>
								</Typography>
							</FuseAnimate>

							<div className="flex flex-col min-w-0 items-center sm:items-start">
								<FuseAnimate animation="transition.slideLeftIn" delay={300}>
									<Typography className="text-16 sm:text-20 truncate">
										{`Supplier Id: ${routeParams.orderId}`}
									</Typography>
								</FuseAnimate>

								<FuseAnimate animation="transition.slideLeftIn" delay={300}>
									<Typography variant="caption">
										{`From Ho Chi Minh City University Of Technology`}
									</Typography>
								</FuseAnimate>
							</div>
						</div>
					</div>
				)
			}
			contentToolbar={
				<Tabs
					value={tabValue}
					onChange={handleChangeTab}
					indicatorColor="primary"
					textColor="primary"
					variant="scrollable"
					scrollButtons="auto"
					classes={{ root: 'w-full h-64' }}
				>
					<Tab className="h-64 normal-case" label="Fabric Details" />
				</Tabs>
			}
			content={
				order && (
					<div className="p-16 sm:p-24 max-w-2xl w-full">
						{/* Order Details */}
						{tabValue === 0 && (
							<div>
								<div className="pb-48">
									<div className="pb-16 flex items-center">
										<Icon color="action">account_circle</Icon>
										<Typography className="h2 mx-16" color="textSecondary">
											Order Report
										</Typography>
									</div>

									<div className="mb-24">
										<div className="table-responsive mb-48">
											<table className="simple">
												<thead>
													<tr>
														<th>Customer Name</th>
														<th>Fabric Name</th>
														<th>Name</th>
														<th>Total_Price</th>
														<th>Date</th>
														<th>Time</th>
													</tr>
												</thead>
												<tbody>
													{data.map(order => {
														return (
															<tr>
																<td>
																	<div className="flex items-center">
																		<Typography className="truncate mx-8">
																			{`${order.customer_fname} ${order.customer_lname}`}
																		</Typography>
																	</div>
																</td>
																<td>
																	<div className="flex items-center">
																		<Typography className="truncate mx-8">
																			{`${order.employee_fname} ${order.employee_lname}`}
																		</Typography>
																	</div>
																</td>
																<td>
																	<div className="flex items-center">
																		<Typography className="truncate mx-8">
																			{`${order.fname}`}
																		</Typography>
																	</div>
																</td>
																<td>
																	<Typography className="truncate">
																		{order.total_price}
																	</Typography>
																</td>
																<td>
																	<Typography className="truncate">
																		{new Date(order.p_date).toLocaleDateString()}
																	</Typography>
																</td>
																<td>
																	<Typography className="truncate">
																		{order.p_time}
																	</Typography>
																</td>
															</tr>
														);
													})}
												</tbody>
											</table>
										</div>
									</div>
								</div>
							</div>
						)}
						<CSVLink data={data} filename={'report.csv'}>
							<Button
								variant="contained"
								color="primary"
								className="w-full"
								// onClick={ev => dispatch(openNewContactDialog())}
							>
								Export Excel
							</Button>
						</CSVLink>
					</div>
				)
			}
			innerScroll
		/>
	);
}

export default withReducer('eCommerceApp', reducer)(Order);
