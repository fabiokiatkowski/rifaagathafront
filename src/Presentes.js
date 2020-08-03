import React, { useEffect, useState } from 'react'
import Axios from 'axios';
import { Table, FormCheck } from 'react-bootstrap';

const Presente = () => {
  const [infos, setInfos] = useState([]);
  const loadData = async () => {
    const { data } = await Axios.get('http://localhost:3031/users');
    console.log(data);
    setInfos(data);
  }
  useEffect(() => {
    loadData();
  }, [])
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
              <th>Local</th>
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
                    <td>{info.store}</td>
                    <td>{info.luckyNumber}</td>
                    <td><FormCheck checked={info.confirmed}/></td>
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