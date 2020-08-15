import { FETCH_POSTS } from './post.action';

const initialState = {
  posts: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_POSTS: {
      return {
        ...state,
        posts: action.payload.data.children,
      };
    }
    default: {
      return state;
    }
  }
};
