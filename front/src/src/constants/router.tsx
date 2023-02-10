import { ExperimentTwoTone, StarTwoTone } from "@ant-design/icons";
import About from "../pages/About/About";
import Account from "../pages/Account/Account";
import AllCocktails from "../pages/Cocktails/All/AllCocktails";
import Cocktails from "../pages/Cocktails/Cocktails";
import FavouriteCocktails from "../pages/Cocktails/Favourite/FavouriteCocktails";
import SingleCock from "../pages/Cocktails/Single/SingleCocktail";
import Main from "../pages/Main/Main";

export interface NamedPageObjs { [key: string]: PageObj }
export interface PageObj {
	label: string;
	path: string;
	element: JSX.Element;
	icon?: JSX.Element;
	onDropdown?: boolean;
	innerRoutes?: NamedPageObjs;
}


export const PAGES = (loggedIn?: boolean) => ({
	MAIN: {
		label: "Main",
		path: "/main",
		element: <Main />,
	},
	COCKTAILS: {
		label: "Cocktails",
		path: "/cocktails",
		element: <Cocktails />,
		innerRoutes: {
			ALL: {
				label: "All cocktails",
				path: "",
				element: <AllCocktails />,
				icon: <ExperimentTwoTone />,
				onDropdown: true,
			},
			SINGLE: {
				label: "CocktailById",
				path: ":id",
				element: <SingleCock />,
				onDropdown: false,
			}, ...(loggedIn ? {
				FAVOURITE: {
					label: "User favourite cocktails",
					path: "userFavourite",
					element: <FavouriteCocktails />,
					icon: <StarTwoTone />,
					onDropdown: true,
				}
			} : {}),
		},
	},
	...(loggedIn ? {
		ACCOUNT: {
			label: "Account",
			path: "/account",
			element: <Account />,
		}
	} : {}),
	ABOUT: {
		label: "About",
		path: "/about",
		element: <About />,
	},
})

export const routesToArray = (obj: NamedPageObjs) =>
	Object.values(obj);
