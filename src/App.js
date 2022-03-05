import React, { Component } from 'react';
import './App.css';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.css';

class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      isLoading: false,
      formData: {
        Age: '',
        Na_to_K: '',
        Sex: 1,
        BP: 1,
        Cholesterol: 1
      },
      prediction: ""
    };
  }

  handleChange = (event) => {
    const value = event.target.value;
    const name = event.target.name;
    var formData = this.state.formData;
    formData[name] = value;
    this.setState({
      formData
    });
  }

  handlePredictClick = (event) => {
    const formData = this.state.formData;
    this.setState({ isLoading: true });
    fetch('https://drug-prediction.herokuapp.com//prediction', 
      {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify(formData)
      })
      .then(response => response.json())
      .then(response => {
        this.setState({
          result: response.result,
          isLoading: false
        });
      });
  }

  handleCancelClick = (event) => {
    this.setState({ result: "" });
  }

  render() {
    const isLoading = this.state.isLoading;
    const formData = this.state.formData;
    const result = this.state.result;

    return (
      <Container>
        <div>
          <h1 className="title">Drug Predictive Model app</h1>
        </div>
        <div className="content">
          <Form>
            <Form.Row>
              <Form.Group as={Col}>
                <Form.Label>Patient Age</Form.Label>
                <Form.Control 
                  type="text" 
                  placeholder="Input age of patient" 
                  name="Age"
                  value={formData.Age}
                  onChange={this.handleChange} />
              </Form.Group>
              <Form.Group as={Col}>
                <Form.Label>Blood levels of Na, K</Form.Label>
                <Form.Control 
                  type="text" 
                  placeholder="Input Na and K level of patient" 
                  name="Na_to_K"
                  value={formData.Na_to_K}
                  onChange={this.handleChange} />
              </Form.Group>
            </Form.Row>
            <Form.Row>
              <Form.Group as={Col}>
                <Form.Label>Gender of patient</Form.Label>
                <Form.Control 
                  as="select"
                  value={formData.Sex}
                  
                  name="Sex"
                  onChange={this.handleChange}>
                  <option>0</option>
                  <option>1</option>
          
                </Form.Control>
              </Form.Group>
              <Form.Group as={Col}>
                <Form.Label>Blood pressure</Form.Label>
                <Form.Control 
                  as="select"
                  value={formData.BP}
                  name="BP"
                  onChange={this.handleChange}>
                  <option>0</option>
                  <option>1</option>
                  <option>2</option>
                </Form.Control>
              </Form.Group>
              <Form.Group as={Col}>
                <Form.Label>Cholesterol level</Form.Label>
                <Form.Control 
                  as="select"
                  value={formData.Cholesterol}
                  name="Cholesterol"
                  onChange={this.handleChange}>
                  <option>0</option>
                  <option>1</option>
                </Form.Control>
              </Form.Group>
            </Form.Row>
            <Row>
              <Col>
                <Button
                  block
                  variant="success"
                  disabled={isLoading}
                  onClick={!isLoading ? this.handlePredictClick :null}>
                  { isLoading ? 'Making prediction' : 'Prediction' }
                </Button>
              </Col>
              <Col>
                <Button
                  block
                  variant="danger"
                  disabled={isLoading}
                  onClick={this.handleCancelClick}>
                  Reset prediction
                </Button>
              </Col>
            </Row>
          </Form>
          {result === "" ? null :
            (<Row>
              <Col className="result-container">
                <h5 id="result">{result}</h5>
              </Col>
            </Row>)
          }
        </div>
      </Container>
    );
  }
}

export default App;
