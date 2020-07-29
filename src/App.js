import React from 'react';
import Styles from './App.module.scss';
import CardPresente from './CardPresente';

function App() {
  const length = 300;
  const values = Array.from({length}, (_, index) => index + 1);
  return (
    <div className={Styles.App}>
      <div className={Styles.Container}>
        {
          values.map(i => <CardPresente index={i} />)
        }
      </div>
    </div>
  );
}

export default App;
