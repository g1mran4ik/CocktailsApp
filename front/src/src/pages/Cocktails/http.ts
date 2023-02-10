import { API_ENPOINTS, OUTER_API_ENPOINTS } from "../../constants/endpoints";
import { get, getOuter, post } from "../../http";
import { DjangoAPICocktail, DjangoAPICocktailPOST, NormalizeAPICocktail } from "./interface";

const { RANDOM, LOOKUP_ID } = OUTER_API_ENPOINTS

export const getRandomCocktails = () =>
    getOuter(RANDOM).then((response) => response.data);

    
    
const { ALL, MOST_POPULAR, POST_COCKTAIL, LIKE_COCKTAIL, DISLIKE_COCKTAIL, USER_FAVOURITE } = API_ENPOINTS
    
export const getCocktailById = (id: string) =>
    get(`${ALL}${id}`).then((response) => response.data);

export const getAllCocktails = () =>
    get(ALL).then((response) => response.data);

export const getTop8Cocktails = () =>
    get(MOST_POPULAR).then((response) => response.data);

export const postLikeData = (data: DjangoAPICocktailPOST) =>
    post(POST_COCKTAIL, data).then((response) => response.data);

export const postLike = (data: {cocktail_id: number}) => 
    post(LIKE_COCKTAIL, data).then((response) => response.data)

export const postDislike = (data: {cocktail_id: number}) => 
    post(DISLIKE_COCKTAIL, data).then((response) => response.data)

export const getUserCocktails = () =>
    get(USER_FAVOURITE).then((response) => response.data)
