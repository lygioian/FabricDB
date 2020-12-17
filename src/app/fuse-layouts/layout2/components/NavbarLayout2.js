import FuseScrollbars from '@fuse/core/FuseScrollbars';
import Navigation from 'app/fuse-layouts/shared-components/Navigation';
import React from 'react';

function NavbarLayout2() {
	return (
		<div className="flex flex-auto justify-between items-center w-full h-full container p-0 lg:px-24">
	

			<FuseScrollbars className="flex h-full items-center">
				<Navigation className="w-full" layout="horizontal" />
			</FuseScrollbars>
		</div>
	);
}

export default React.memo(NavbarLayout2);
