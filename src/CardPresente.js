import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown';

const CardPresente = ({ index }) => {
    const [clicked, setClicked] = useState(false);
    return (
        <Card style={{ width: '18rem', margin: '5px' }} key={index}>
            <Card.Body style={{ backgroundColor: 'lightpink' }}>
                <Card.Title style={{ textAlign: 'center' }}>Rifa da Ágatha</Card.Title>
                { !clicked && <Card.Subtitle className="mb-2 text-muted" style={{ textAlign: 'center' }}><b>Número da sorte</b></Card.Subtitle> }
                <Card.Text style={{  display: 'flex', justifyContent: 'center' }}>
                    {
                        !clicked ? (
                            <div>
                                <div style={{ display: 'flex', justifyContent: 'space-evenly' }}>
                                    {index}
                                </div>
                            </div>
                        ) : (
                            <div>
                                LISTA DE ITENS
                            </div>
                        )
                    }
                </Card.Text>
            </Card.Body>
            <Card.Footer style={{ backgroundColor: 'lightpink', display: 'flex', justifyContent: 'center' }}>
                {
                    clicked ? (
                        <Dropdown as={ButtonGroup}>
                            <Button
                                style={{ backgroundColor: 'deeppink', borderColor: 'transparent' }}
                                onClick={() => setClicked(!clicked)}
                            >
                                    Escolha a loja ao lado
                                </Button>
                            <Dropdown.Toggle split style={{ backgroundColor: 'deeppink', borderColor: 'transparent' }} id="dropdown-split-basic" />
                            <Dropdown.Menu>
                                <Dropdown.Item eventKey="1">Havan</Dropdown.Item>
                                <Dropdown.Item eventKey="2">Catarinense</Dropdown.Item>
                                <Dropdown.Item eventKey="3">Alô Bebê</Dropdown.Item>
                                <Dropdown.Divider />
                                <Dropdown.Item eventKey="4">Entregar (Joinville)</Dropdown.Item>
                                <Dropdown.Item eventKey="5">Entregar (Jaraguá)</Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                    ) : (
                        <Button
                            variant="primary"
                            style={{ backgroundColor: 'deeppink', borderColor: 'transparent' }}
                            onClick={() => setClicked(!clicked)}
                        >
                            Clique aqui
                        </Button>
                    )
                }
            </Card.Footer>
        </Card>
    )
}

export default CardPresente
