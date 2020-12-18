import React from 'react';
import { Redirect } from 'react-router-dom';

const ECommerceAppConfig = {
	settings: {
		layout: {}
	},
	routes: [
		{
			path: '/apps/e-commerce/products/:productId/:productHandle?',
			component: React.lazy(() => import('./product/Product'))
		},
		{
			path: '/apps/e-commerce/products',
			component: React.lazy(() => import('./products/Products'))
		},
		{
			path: '/apps/e-commerce/orders/:orderId',
			component: React.lazy(() => import('./order/Order'))
		},
		{
			path: '/apps/report/:orderId',
			component: React.lazy(() => import('./report/Order'))
		},
		{
			path: '/supplier',
			component: React.lazy(() => import('./orders/Orders'))
		},
		{
			path: '/import',
			component: React.lazy(() => import('./import/Orders'))
		},
		{
			path: '/customer',
			component: React.lazy(() => import('./customer/Orders'))
		},
		{
			path: '/employee',
			component: React.lazy(() => import('./employee/Orders'))
		},
		{
			path: '/ordering',
			component: React.lazy(() => import('./ordering/Orders'))
		},
		{
			path: '/bolt',
			component: React.lazy(() => import('./bolt/Orders'))
		},
		{
			path: '/fabric',
			component: React.lazy(() => import('./fabric/Orders'))
		},
		{
			path: '/apps/e-commerce',
			component: () => <Redirect to="/apps/e-commerce/products" />
		}
	]
};

export default ECommerceAppConfig;
