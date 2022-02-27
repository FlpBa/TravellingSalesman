import './App.css';
import { useEffect, useState } from 'react';
import { Graph } from './Graph';
import { Container, Divider, Grid, Header, Icon, Input, Form, Button, Checkbox, Loader, Segment, Dimmer, Message } from 'semantic-ui-react';
import { Stats } from './Stats';

function App() {
  const [points, setPoints] = useState({})
  const [numberOfNodes, setNumberOfNodes] = useState(10)
  const [kMax, setKMax] = useState(10)
  const [route, setRoute] = useState(undefined)
  const [result, setResult] = useState(undefined)
  const [loading, setLoading] = useState(true)
  const [actualKMax, setActualKMax] = useState(10)
  const [swapOp, setSwapOp] = useState(true)
  const [jumpOp, setJumpOp] = useState(true)
  const [error, setError] = useState(undefined)

  useEffect(() => {
    generateGraph()
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  const generateGraph = async () => {
    setLoading(true)
    setRoute(undefined)
    setResult(undefined)
    fetch(`/points?k=${numberOfNodes}`).then(res => res.json()).then(data => {
      setPoints(data.points)
      setLoading(false)
    })
  }

    const findRoute = async () => {
      setError(false)
      setLoading(true)
      let ops = []
      if (swapOp) ops.push("swap")
      if (jumpOp) ops.push("jump")
      if (ops.length === 0) 
      {
        setError("You need to choose at least one mutation type.")
        setLoading(false)
        return
      }
      fetch(`/tsp`, {method: 'POST', body: JSON.stringify({
        k_max: kMax,
        points: points,
        operations: ops
      }), headers: {
        'Content-Type': 'application/json'
        // 'Content-Type': 'application/x-www-form-urlencoded',
      }}).then(res => res.json()).then(data => {
        setRoute(data.response[data.response.length - 1].route)
        setResult(data.response)
        setActualKMax(kMax)
        setLoading(false)
      })
    }
  
  return (
    <Container>
      <style>
        {`
        html, body {
          background-color: #252839 !important;
        }
      }
      `}
      </style>
      <Header as="h2" icon inverted textAlign="center">
        <Icon name="map" />
        Travelling Salesman
        <Header.Subheader>
          Finding shortest path with simulated annealing
        </Header.Subheader>
      </Header>
      <Divider />
      <Grid style={{ marginTop: "10px" }}>
        {loading && (
          <div
            style={{
              width: "600px",
              height: "600px",
              backgroundColor: "#aaa",
              position: "absolute",
            }}
          >
            <Dimmer active style={{ backgroundColor: "rgb(45, 48, 68, 20)" }}>
              <Loader />
            </Dimmer>
          </div>
        )}
        <Graph points={points} route={route} />
        <Grid.Column style={{ marginLeft: "600px" }} width={12}>
          <Header as="h5" inverted textAlign="left">
            Generate new graph
          </Header>
          <Form inverted>
            <Form.Input
              fluid
              id="form-subcomponent-shorthand-input-first-name"
              label="Number of nodes"
              placeholder="Number of nodes"
              onChange={(e) => setNumberOfNodes(e.target.value)}
              value={numberOfNodes}
            />

            <Button onClick={() => generateGraph()}>Generate new graph</Button>
          </Form>
          <Divider />
          <Header as="h5" inverted textAlign="left">
            Find the route
          </Header>
          <Form inverted>
            <Form.Field>
              <label>Number of steps</label>
              <input
                placeholder="Number of steps"
                onChange={(e) => setKMax(e.target.value)}
                value={kMax}
              />
            </Form.Field>
            <Form.Group inline error={error}>
              <label>Mutations</label>
              <Checkbox
                label={"Swap"}
                checked={swapOp}
                onChange={() => setSwapOp(!swapOp)}
              />
              <Checkbox
                label="Jump"
                checked={jumpOp}
                onChange={() => setJumpOp(!jumpOp)}
                style={{ marginLeft: "10px" }}
              />
            </Form.Group>
            {error && <Message color="red">{error}</Message>}
            <Button
              type="submit"
              onClick={() => findRoute()}
              disabled={loading}
            >
              Find the route
            </Button>
          </Form>
          <Divider />
          {result && (
            <>
              <Header as="h5" inverted textAlign="left">
                Cost per step
              </Header>
              <Segment basic>
                {loading && (
                  <Dimmer active style={{ backgroundColor: "#252839" }}>
                    <Loader />
                  </Dimmer>
                )}
                <Stats results={result} numberOfSteps={actualKMax} />
              </Segment>
            </>
          )}
        </Grid.Column>
        <Divider />
      </Grid>
    </Container>
  );
}

export default App;
