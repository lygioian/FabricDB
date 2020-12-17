import FuseAnimate from '@fuse/core/FuseAnimate';
import Icon from '@material-ui/core/Icon';
import Input from '@material-ui/core/Input';
import Paper from '@material-ui/core/Paper';
import { ThemeProvider } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectMainTheme } from 'app/store/fuse/settingsSlice';
import { setOrdersSearchText } from '../store/ordersSlice';
import { openNewContactDialog } from '../store/contactsSlice';
import Button from '@material-ui/core/Button';
import { CSVLink } from 'react-csv';

function OrdersHeader(props) {
	const dispatch = useDispatch();
	const searchText = useSelector(({ eCommerceApp }) => eCommerceApp.orders.searchText);
	const mainTheme = useSelector(selectMainTheme);

	return (
		<div className="flex flex-1 w-full items-center justify-between">
			<div className="flex items-center">
				<FuseAnimate animation="transition.expandIn" delay={300}>
					<Icon className="text-32">shopping_basket</Icon>
				</FuseAnimate>

				<FuseAnimate animation="transition.slideLeftIn" delay={300}>
					<Typography className="hidden sm:flex mx-0 sm:mx-12" variant="h6">
						List supplier
					</Typography>
				</FuseAnimate>
				<div className="p-24">
					<Button
						variant="contained"
						color="default"
						className="w-full"
						onClick={ev => dispatch(openNewContactDialog())}
					>
						New Supplier
					</Button>
				</div>
				{/* <div className="">
					<Button
						variant="contained"
						color="default"
						className="w-full"
						onClick={ev => dispatch(openNewContactDialog())}
					>
						<CSVLink data={data} filename={'supplier'}>
							Export Excel
						</CSVLink>
					</Button>
				</div> */}
			</div>

			<div className="flex flex-1 items-center justify-center px-12">
				<ThemeProvider theme={mainTheme}>
					<FuseAnimate animation="transition.slideDownIn" delay={300}>
						<Paper className="flex items-center w-full max-w-512 px-8 py-4 rounded-8" elevation={1}>
							<Icon color="action">search</Icon>

							<Input
								placeholder="Search"
								className="flex flex-1 mx-8"
								disableUnderline
								fullWidth
								value={searchText}
								inputProps={{
									'aria-label': 'Search'
								}}
								onChange={ev => dispatch(setOrdersSearchText(ev))}
							/>
						</Paper>
					</FuseAnimate>
				</ThemeProvider>
			</div>
		</div>
	);
}

export default OrdersHeader;
