import React, { useState } from 'react';
import Pages from './pages';
import logo from './images/reddit_logo.svg';
import search from './images/search_icon.svg';
import styles from './index.module.css';
import { Provider } from 'react-redux';
import store from 'resources/store';

//const dispatch = useDispatch();

// const initialState = {
//   phrase: '',
// };

// const changePhrase = (phrase) => ({
//   type: 'ACTION_CHANGE_PHRASE',
//   payload: phrase,
// });

// const phraseReducer = (state = initialState, action) => {
//   switch (action.type) {
//     case 'ACTION_CHANGE_PHRASE': {
//       return { ...state, phrase: action.payload };
//     }
//     default:
//       return state;
//   }
// };

// const store = createStore(phraseReducer);

function App() {
  const [phrase, setPhrase] = useState(null);

  const onClickEnter = (event) => {
    if (event.keyCode === 13) {
      console.log(event.target.value);
      setPhrase(event.target.value);
    }
  };

  return (
    <Provider store={store}>
    <main>
      <header className={styles.header}>
        <div className={styles.header_top}>
          <img src={logo}></img>
          <div className={styles.searchField}>
            <img className={styles.searchSvg} src={search} />
            <input className={styles.input} placeholder='Search' onKeyDown={onClickEnter}/>
          </div>
        </div>
        <div className={styles.header_bot}></div>
      </header>
      <section>
        <Pages phrase={phrase} />
      </section>
    </main>
    </Provider>
  );
}

export default App;
