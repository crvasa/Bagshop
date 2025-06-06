const BASE_URL ='http://localhost:5000';

export const BAGS_URL = BASE_URL + '/api/bags';
export const BAGS_TAGS_URL = BAGS_URL + '/tags';
export const BAGS_BY_SEARCH_URL = BAGS_URL + '/search/';
export const BAGS_BY_TAG_URL = BAGS_URL + '/tag/';
export const BAGS_BY_ID_URL = BAGS_URL + '/';

export const USER_LOGIN_URL = BASE_URL + '/api/users/login';
export const USER_REGISTER_URL = BASE_URL + '/api/users/register';


export const ORDER_URL = BASE_URL + '/api/orders';
export const ORDER_CREATE_URL = ORDER_URL + '/create';
