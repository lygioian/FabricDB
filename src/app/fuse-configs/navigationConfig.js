import { authRoles } from 'app/auth';
import i18next from 'i18next';
import DocumentationNavigation from '../main/documentation/DocumentationNavigation';

import ar from './navigation-i18n/ar';
import en from './navigation-i18n/en';
import tr from './navigation-i18n/tr';

i18next.addResourceBundle('en', 'navigation', en);
i18next.addResourceBundle('tr', 'navigation', tr);
i18next.addResourceBundle('ar', 'navigation', ar);

const navigationConfig = [
	
	{
		id: 'marterial',
		title: 'User Database',
		translate: 'Material Database',
		type: 'group',
		icon: 'apps',
		exact: true,
		children: [
		
		
			{
				id: 'ordering',
				title: 'Import List',
				translate: 'Order List',
				type: 'item',
				icon: 'today',
				url: '/ordering'
			},
			{
				id: 'bolt',
				title: 'Import List',
				translate: 'Bolt List',
				type: 'item',
				icon: 'today',
				url: '/bolt'
			},
			{
				id: 'fabric',
				title: 'Import List',
				translate: 'Fabric List',
				type: 'item',
				icon: 'today',
				url: '/fabric'
			},
		]

	},
	{
		id: 'danhsachtaisan',
		title: 'User Database',
		translate: 'User Database',
		type: 'group',
		icon: 'apps',
		exact: true,
		children: [
			
			{
				id: 'customer',
				title: 'Import List',
				translate: 'Customer List',
				type: 'item',
				icon: 'today',
				url: '/customer'
			},
			{
				id: 'employee',
				title: 'Import List',
				translate: 'Employee List',
				type: 'item',
				icon: 'today',
				url: '/employee'
			},
		]

	},
	{
		id: 'test',
		title: 'User Database',
		translate: 'Supplier Database',
		type: 'group',
		icon: 'apps',
		exact: true,
		children: [
			
			{
				id: 'property_list',
				title: 'Supplier List',
				translate: 'Supplier Table',
				type: 'item',
				icon: 'today',
				url: '/supplier'
			},
			{
				id: 'import',
				title: 'Import List',
				translate: 'Import Table',
				type: 'item',
				icon: 'today',
				url: '/import'
			},
		]

	},
];

export default navigationConfig;
