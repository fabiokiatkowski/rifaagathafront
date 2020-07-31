import React, { useState } from 'react';
import Styles from './App.module.scss';
import ListGroup from 'react-bootstrap/ListGroup';
import CardPresente from './CardPresente';
import { Card, Button, Dropdown, DropdownButton, InputGroup, FormControl } from 'react-bootstrap';

import { items, orderTypes, onlineStores } from './data/data2';

function App() {
  const [selectedItem, setSelectedItem] = useState(null);
  const [orderType, setOrderType] = useState(null);
  const [store, setStore] = useState(null);
  return (
    <div className={Styles.App}>
      <div className={Styles.Container}>
        <h1>Rifa da nossa pequena Ágatha</h1>
        <div className={Styles.info}></div>
        <br></br>
        <br></br>
        <br></br>
        <div className={Styles.info}></div>
        <div className={Styles.info2}>
          <div>

            {/* {
              items.map(t => (
                <Card>
                  <Card.Body>
                    {t}
                  </Card.Body>
                  <Card.Footer style={{ display: 'flex', flex: 1, justifyContent: 'center' }}>
                    <Button>Selecionar</Button>
                  </Card.Footer>
                </Card>
              ))
            } */}
            <DropdownButton title="Clique para selecionar o presentinho da Ágatha" onSelect={e => setSelectedItem(e)}>
              {
                items.map(t => <Dropdown.Item eventKey={t}>{t}</Dropdown.Item>)
              } 
              {/* <Dropdown.Item>Fraldas P Pampers®</Dropdown.Item>
              <Dropdown.Item>Fraldas M Pampers®</Dropdown.Item>
              <Dropdown.Item>Fraldas G Pampers®</Dropdown.Item>
              <Dropdown.Item>Creme Bepantol® e Lenços Umidecido</Dropdown.Item>
              <Dropdown.Item>Shampoo e Hidrante para recém nascidos</Dropdown.Item>
              <Dropdown.Item>Sabonete Líquido e Lenço Umidecido</Dropdown.Item>
              <Dropdown.Item>Cotonets® para bêbes, Algodão e Alcool 70%</Dropdown.Item>
              <Dropdown.Item>Shampoo e Lenço Umidecido</Dropdown.Item> */}
            </DropdownButton>
            {
              selectedItem && <span>{selectedItem}</span>
            }
            {
              selectedItem && (
                <DropdownButton title="Clique para selecionar a forma compra e entrega" onSelect={e => setOrderType(e)}>
                  {
                    orderTypes.map(t => <Dropdown.Item eventKey={t}>{t}</Dropdown.Item>)
                  } 
                </DropdownButton>
                // <ListGroup>
                //   <ListGroup.Item>Entregar em Jaraguá</ListGroup.Item>
                //   <ListGroup.Item>Entregar em Joinville</ListGroup.Item>
                //   <ListGroup.Item>Comprar online</ListGroup.Item>
                // </ListGroup>
              )
            }
            {
              orderType && <span>{orderType}</span>
            }
            {
              orderType === "Comprar online" && (
                <DropdownButton title="Clique para selecionar a loja da compra" onSelect={e => setStore(e)}>
                  {
                    onlineStores.map(t => <Dropdown.Item eventKey={t}>{t}</Dropdown.Item>)
                  } 
                </DropdownButton>
              )
            }
            {
              orderType === "Comprar online" && store && <span>{store} - clique aqui para ir para o site</span>
            }
          </div>
          {
            selectedItem && (orderType && (orderType !== "Comprar online" || (orderType === "Comprar online" && store))) && (
              <div>
                <InputGroup className="mb-3">
                  <FormControl
                    placeholder="Digite seu nome"
                    aria-label="Digite seu nome"
                    aria-describedby="basic-addon2"
                  />
                  {
                    (orderType === "Comprar online" && store) &&
                    <FormControl
                      placeholder="Informe o número do pedido"
                      aria-label="Informe o número do pedido"
                      aria-describedby="basic-addon2"
                    />
                  }
                  <InputGroup.Append>
                    <Button variant="success">Confirmar</Button>
                  </InputGroup.Append>
                </InputGroup>
              </div>
            )
          }
        </div>
      </div>
    </div>
  );
}

export default App;
