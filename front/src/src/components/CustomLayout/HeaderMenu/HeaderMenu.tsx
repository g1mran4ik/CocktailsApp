import { DownOutlined } from '@ant-design/icons';
import { Dropdown, Menu, Space } from 'antd';
import { Link, useLocation } from 'react-router-dom';
import { NamedPageObjs, PageObj, routesToArray } from '../../../constants/router';

interface RouteConstructor {
	(loggenIn: boolean): (NamedPageObjs)
}

interface HeaderMenuProps {
	loggedIn: boolean;
	routeConstructor: RouteConstructor;
}

function DropdownLinks(innerRoutes: PageObj[], parentPath: string, label: string) {
	const items = innerRoutes.map(
		({ label, path, icon }) => {
			const fullPath = path
				? `${parentPath}/${path}`
				: parentPath;
			return {
				key: label,
				label: <Link to={fullPath}>{label}</Link>,
				icon: icon,
			};
		}
	);
	return {
		key: parentPath,
		label: (
			<Dropdown menu={{ items }}>
				<Space>
					{label}
					<DownOutlined />
				</Space>
			</Dropdown>
		)
	};
}

export default function HeaderMenu({ loggedIn, routeConstructor }: HeaderMenuProps) {
	const { pathname } = useLocation()

	const items = routesToArray(routeConstructor(loggedIn)).map(
		({ label, path: parentPath, innerRoutes }) => {
			const innerRoutesOnDropdown = innerRoutes ? routesToArray(innerRoutes).filter(({ onDropdown }) => onDropdown) : []

			return innerRoutes && innerRoutesOnDropdown.length > 1 ?
				DropdownLinks(innerRoutesOnDropdown, parentPath, label) :
				{
					key: parentPath,
					label: <Link to={parentPath}>{label}</Link>,
				}
		}
	)

	return <Menu
		theme="dark"
		mode="horizontal"
		style={{ width: "60%" }}
		selectedKeys={[`/${pathname.split('/')[1]}`]}
		defaultSelectedKeys={["/main"]}
		items={items}
	/>
} 