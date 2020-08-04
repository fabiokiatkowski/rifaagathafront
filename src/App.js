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
    const { data } = await Axios.get('https://meuchaagatha.herokuapp.com/users');
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
    Axios.post('https://meuchaagatha.herokuapp.com/users', payload);
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
        <h1>Chá premiado da Ágatha</h1>
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
          Juntos eles bolaram meu chá premiado, vamos participar?
        </p>
      </div>
      <h3 className={Styles.info}>Como funciona?</h3>
      <h5 className={Styles.info}>Cada item vale um número da sorte.</h5>
      <div className={Styles.info}>
        <ul>
          <li>Você escolhe um item na listinha que a mamãe preparaou em <b>Selecionar o presentinho da Ágatha</b></li>
          <li>
            Depois você escolhe a forma que você quer comprar, pois temos três sugestões.
            <ul>
              <li>Comprar nas farmácias Catarineses ou Droga Raia e pedir para retirar na loja da Rua Epitácio Pessoa (Jaraguá do Sul)</li>
              <li>Comprar pela lista de bêbe que a mamãe montou com todo carinho na Amazom. (O link estará logo abaixo após selecionar meu presentinho)</li>
              <li>
                Comprar aonde você desejar, desde que seja o item que você escolheu, e entregar nos seguinte endereços (lembrando que sempre devemos nos proteger):
                <ul>
                  <li>Em Joinville, podem deixar na casa da minha vovó Tere.</li>
                  <li>Em Jaraguá é aqui na minha casa mesmo.</li>
                </ul>
              </li>
            </ul>
          </li>
          <li>No final é muito importante você enviar o seu nome, assim o papai saberá que tenho novos presentinhos.</li>
          <li>Após o papai receber o meu presentinho, ele irá gerar o número da sorte e avisar por Whatsapp e então você estará concorrendo.</li>
        </ul>
      </div>
      <h3 className={Styles.info}>Quais são os prêmios?</h3>
      <div className={Styles.info}>
        <ul>
          <li>R$ 150,00</li>
          <li>R$ 100,00</li>
          <li>Cesta de chocolate</li>
        </ul>
      </div>
      <h3 className={Styles.info}>Data do sorteio</h3>
      <div className={Styles.info}>
        15/09/2020
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
      <br></br>
      <h3 className={Styles.info}>Informações Importantes</h3>
      <div className={Styles.info}>
        <h4>Quanto mais números mais chances de ganhar.</h4>
        Meu endereço:
        <ul>
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
    </Container>
  );
}

export default App;
