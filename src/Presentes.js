import React, { useEffect, useState } from 'react'
import Axios from 'axios';
import { Table, FormCheck } from 'react-bootstrap';

const Presente = () => {
  const [infos, setInfos] = useState([]);
  const loadData = async () => {
    const { data } = await Axios.get('https://meuchaagatha.herokuapp.com/users');
    setInfos(data);
  }
  useEffect(() => {
    loadData();
  }, []);
  const handleConfirmado = async (info) => {
    const { data } = await Axios.put(`https://meuchaagatha.herokuapp.com/users/${info._id}`, { ...info, confirmed: !info.confirmed });
    setInfos(data);
  }
  return (
    <div>
      <h1>Lista de Presentes Comprados</h1>
      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>#</th>
            <th>Nome</th>
            <th>Nr. Pedido</th>
            <th>Item</th>
            <th>Entrega</th>
            <th>Nr. Sorte</th>
            <th>Confirmado</th>
          </tr>
        </thead>
        <tbody>
          {
            infos.map(info => {
              return (
                <tr key={info._id}>
                  <td>{info._id}</td>
                  <td>{info.name}</td>
                  <td>{info.order}</td>
                  <td>{info.item}</td>
                  <td>{info.deliveryMode}</td>
                  <td>{info.luckyNumber}</td>
                  <td><FormCheck checked={info.confirmed} onChange={() => handleConfirmado(info)}/></td>
                </tr>
              )
            })
          }
        </tbody>
      </Table>
    </div>
  )
}

export default Presente;