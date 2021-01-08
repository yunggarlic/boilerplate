import axios from 'axios';

//action type
const GET_USER = 'GET_USER';
const SET_FETCHING_STATUS = 'SET_FETCHING_STATUS';

//action creators
//GET ME

const getMe = (user) => ({
  type: GET_USER,
  user,
});

const setFetchingStatus = (isFetching) => ({
  type: SET_FETCHING_STATUS,
  isFetching,
});

export const fetchMe = () => {
  return async (dispatch) => {
    dispatch(setFetchingStatus(true));
    try {
      const { data } = await axios.get('/auth/me');
      dispatch(getMe(data || {}));
    } catch (error) {
      console.error(error);
    } finally {
      dispatch(setFetchingStatus(false));
    }
  };
};

//SIGN UP
export const signup = (credentials) => async (dispatch) => {
  let data;
  try {
    res = await axios.post('/auth/signup', credentials);
  } catch (error) {
    return dispatch(getMe({ error: error }));
  }
  try {
    dispatch(getMe(res.data));
  } catch (error) {
    console.error(error);
  }
};

//LOG IN
export const login = (credentials) => async (dispatch) => {
  try {
    const { data } = await axios.put('/auth/login', credentials);
    dispatch(getMe(data));
  } catch (error) {
    console.error(error);
  }
};

//LOG OUT
export const logout = () => {
  return async (dispatch) => {
    try {
      await axios.delete('/auth/logout');
      dispatch(getMe({}));
    } catch (error) {
      console.error(error);
    }
  };
};

//REDUCER

const initialState = {
  isFetching: true,
};

export default function usersReducer(state = initialState, action) {
  switch (action.type) {
    case GET_USER:
      return { ...action.user };
    case SET_FETCHING_STATUS:
      return {
        ...state,
        isFetching: action.isFetching,
      };
    default:
      return state;
  }
}
