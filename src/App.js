import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import _ from 'lodash';
import Styles from './App.module.scss';
import { ReactComponent as LogoHeader } from './images/segonha2.svg';
import { Button, Dropdown, DropdownButton, Container, Form, Col } from 'react-bootstrap';

import { items, orderTypes, onlineStores } from './data/data2';
import { ToastContainer, toast } from 'react-toastify';

function App() {
  const [selectedItem, setSelectedItem] = useState(null);
  const [orderType, setOrderType] = useState(null);
  const [store, setStore] = useState(null);
  const [name, setName] = useState('');
  const [order, setOrder] = useState('');
  const [comprados, setComprados] = useState([]);
  const loadItems = async () => {
    const { data } = await Axios.get('http://localhost:3031/users');
    const itemsComprados = _.groupBy(data, 'item');
    setComprados(itemsComprados || []);
  }
  useEffect(() => {
    loadItems();
  }, []);
  const handleEnviar = () => {
    const payload = {
      name,
      order,
      item: selectedItem,
      deliveryMode: orderType,
      store,
    }
    Axios.post('http://localhost:3031/users', payload);
    loadItems();
    setSelectedItem(null);
    setOrderType(null);
    setStore(null);
    setName('');
    setOrder('');
    toast("Obrigada pelo presentinho", {
      position: "top-center",
      autoClose: 5000,
    })
  }
  return (
    <Container fluid className={["d-flex", "flex-column", "align-items-center", "justify-content-start", Styles.App]}>
      <ToastContainer />
      <div className="d-flex justify-content-center" style={{ width: '50%' }}>
        <LogoHeader />
      </div>
      <div className="text-center">
        <h1>Rifa da nossa pequena Ágatha</h1>
      </div>
      <div className={Styles.info}>
        <p>
          Olá gente, tudo bem com vocês?
        </p>
        <p>
          Gostaria muito de ter vocês todos comigo no meu chá mas devido
          a tudo o que esta acontecendo ai fora, e para segurança de todos, mamãe e papai resolveram
          inovar
        </p>
        <p>
          Juntos eles bolaram minha rifa, vamos participar?
        </p>
      </div>
      <br></br>
      <h3>Como funciona?</h3>
      <h4>Cada item vale um número da sorte.</h4>
      <div className={Styles.info}>
        <ul>
          <li>Você escolhe o meu presentinho em <b>Selecionar o presentinho da Ágatha</b></li>
          <li>Depois você esolhe como você vai entregar.</li>
          <li>Se for online, mamãe escolheu algumas lojas para facilitar.</li>
        </ul>
        <p>
          Se for entregar em Joinville, podem deixar na casa da minha vovó Tere e em Jaraguá é aqui na minha casa mesmo
        </p>
        <p>
          Se for online você pode escolher uma das opções e mandar o número do pedido, mamãe irá buscar para mim. Mas
          se quiser mandar entregar na minha casa o endereço esta ai embaixo.
        </p>
        <ul style={{ listStyle: 'none' }}>
          <li>
            <b>Cidade:</b> Jaraguá do Sul
          </li>
          <li>
            <b>Rua:</b> Sebastião Pereira, 21 - apt 306
          </li>
          <li>
            <b>CEP:</b> 89355-074
          </li>
          <li>
            <b>Ponto de Referência:</b> Rua do PAMA. Em frente ao container rosa.
          </li>
        </ul>
      </div>
      <br></br>
      <Container fluid className="d-flex flex-column align-items-center" style={{ marginBottom: '2vh' }}>
        <DropdownButton title="Selecionar o presentinho da Ágatha" onSelect={e => setSelectedItem(e)}>
          {
            items.map(t => <Dropdown.Item key={t.name} eventKey={t.name} disabled={comprados[t.name] && comprados[t.name].length >= t.qtd}>{t.name}</Dropdown.Item>)
          } 
        </DropdownButton>
        {
          selectedItem && <span>{selectedItem}</span>
        }
        {
          selectedItem && (
            <DropdownButton title="Selecionar forma de entrega" onSelect={e => setOrderType(e)}>
              {
                orderTypes.map(t => <Dropdown.Item key={t} eventKey={t}>{t}</Dropdown.Item>)
              } 
            </DropdownButton>
          )
        }
        {
          orderType && <span>{orderType}</span>
        }
        {
          orderType === "Comprar online" && (
            <DropdownButton title="Selecionar a loja da compra" onSelect={e => setStore(e)}>
              {
                onlineStores.map(t => <Dropdown.Item key={t} eventKey={t}>{t}</Dropdown.Item>)
              } 
            </DropdownButton>
          )
        }
        {
          orderType === "Comprar online" && store && <span>{store} - clique aqui para ir para o site</span>
        }
      </Container>
      {
        selectedItem && (orderType && (orderType !== "Comprar online" || (orderType === "Comprar online" && store))) && (
          <Container fluid className="d-flex flex-column align-items-center">
            <Form>
              <Form.Row className="justify-content-center">
                <Col xs="auto">
                  <Form.Label htmlFor="inlineFormInput" srOnly>
                    Nome
                  </Form.Label>
                  <Form.Control
                    className="mb-2"
                    id="inlineFormInput"
                    placeholder="Nome"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </Col>
                {
                  (orderType === "Comprar online" && store) &&
                  <Col xs="auto">
                    <Form.Label htmlFor="inlineFormInputGroup" srOnly>
                      Número do Pedido
                    </Form.Label>
                    <Form.Control
                      className="mb-2"
                      id="inlineFormInput"
                      placeholder="Número do pedido"
                      value={order}
                      onChange={(e) => setOrder(e.target.value)}
                    />
                  </Col>
                }
                <Col xs="auto">
                  <Button type="button" className="mb-2" onClick={handleEnviar}>
                    Enviar
                  </Button>
                </Col>
              </Form.Row>
            </Form>
          </Container>
        )
      }
    </Container>
  );
}

export default App;
