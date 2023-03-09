// export const API_BASE = "http://127.0.0.1:8000/"
export const API_BASE = "http://localhost/api/"


export const API_ENPOINTS = {
    ALL: "cocktails/all/", 
    MOST_POPULAR: "cocktails/all/top/",
    CREATE_ACCOUNT: "user-create/",
    POST_COCKTAIL: "cocktails/all/",
    LIKE_COCKTAIL: 'cocktails/like/',
    DISLIKE_COCKTAIL: 'cocktails/dislike/',
    USER_FAVOURITE: 'cocktails/favourite/',
    LOGIN: "accounts/login/",
    LOGOUT: "accounts/logout/",
    USER_ME: "user-me/",
    VALIDATE_USERNAME: "validate-username/"
}

export const OUTER_API_BASE = "https://www.thecocktaildb.com/api/json/v1/1/"


export const OUTER_API_ENPOINTS = {
    RANDOM: 'random.php',
    LOOKUP_ID: 'lookup.php?i='
}