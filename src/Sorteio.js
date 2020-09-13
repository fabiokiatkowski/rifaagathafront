import Axios from 'axios';
import React, { useState } from 'react'
import { Button, Container } from 'react-bootstrap';
import Loader from 'react-loader-spinner';
import Styles from './Sorteio.module.scss';

function Sorteio() {
  const [infos, setInfos] = useState(null);
  const loadData = async () => {
    setInfos(null);
    const { data } = await Axios.get('https://meuchaagatha.herokuapp.com/users');
    let winner = null;
    while (!winner) {
      const randomNumber = Math.floor(100000 + Math.random() * 900000);
      winner = data.find(d => d.luckyNumber === randomNumber && d.confirmed);
    }
    setInfos(winner);
  }
  return (
    <Container fluid className={["d-flex", "flex-column", "align-items-center", "justify-content-center", Styles.App]}>
      <Loader type="Hearts" color="#ff9e9e" height={500} width={500} secondaryColor="Grey" visible={!infos} />
      {
        infos && <h1>{infos.name} - {infos.luckyNumber}</h1>
      }
      <Button variant="success" onClick={loadData} size="lg">Sorteio</Button>
    </Container>
  )
}

export default Sorteio
