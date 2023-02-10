import { Drink, OuterAPICocktail } from '../pages/Cocktails/interface';

const serializeLists = (drink: Drink, listName: string, nullable?: boolean) =>
	Object.entries(drink).reduce(
		(agg, [key, value]) =>
			(nullable || value) && key.includes(listName) ? [...agg, value] : agg,
		[] as string[]
	);

export const _transformRandomDrink = ({ drinks: [drink] }: OuterAPICocktail) => {
	let ingredients = serializeLists(drink, 'strIngredient')
	let measures = serializeLists(drink, 'strMeasure', true).slice(0, ingredients.length)
	return {
		api_id: drink.idDrink,
		name: drink.strDrink,
		image: drink.strDrinkThumb,
		category: drink.strCategory,
		alcoholic: drink.strAlcoholic,
		instruction: drink.strInstructions,
		ingredients,
		measures,
	}
};
