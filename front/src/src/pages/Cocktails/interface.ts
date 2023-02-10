export interface NormalizeAPICocktail {
	id: string;
	name: string;
	image: string;
	category: string;
	alcoholic: string;
	instruction: string;
	ingredients: string[];
	measures: string[];
}

export interface Drink {
	[key: string]: any;
}

export interface OuterAPICocktail {
	drinks: Drink[]
}

export interface APICocktail {
	api_id: string;
	id: string;
	name: string;
	image: string;
	liked: number;
	disliked: number;
}

export interface UserAPICocktail {
	id: string;
	name: string;
	image: string;
}

export interface DjangoAPICocktailBASE {
	api_id: string;
	name: string;
	image: string;
	category: string;
	alcoholic: string;
	instruction: string;
	measures: string[];
}

export interface DjangoAPICocktailPOST extends DjangoAPICocktailBASE{
	ingredients: string[];
}

export interface Ingredient {
	id?: number;
	name: string;
}

export interface CocktailIngredient {
	id?: number;
	name: string;
	measure: string;
	ingredient: Ingredient
}

export interface DjangoAPICocktail extends DjangoAPICocktailBASE{
	id: string;
	ingredients: CocktailIngredient[];
}
