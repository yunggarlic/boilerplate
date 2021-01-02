import axios from 'axios';

//action type
const ADD_USER = 'ADD_USER';

//action creator

//GET

//POST
const addUser = (user) => {
  return {
    type: ADD_USER,
    user: user,
  };
};

export const postUser = (user) => {
  return async (dispatch) => {
    const { data } = await axios.post('/api/users', user);
    dispatch(addUser(data));
  };
};

//REDUCER
const usersReducer = (state = [], action) => {
  switch (action.type) {
    case ADD_USER:
      return [...action.user];
  }
};

export default usersReducer;
