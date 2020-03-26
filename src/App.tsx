import React, { useState, useEffect } from "react";
import { createSimulation } from "./lib/simulation";
import {
  SimulationConfig,
  SimulationEnvironment,
  SimulationState,
  Simulation
} from "./lib/types";
import produce from "immer";
import {
  InputNumber,
  Row,
  Col,
  Slider,
  Button,
  Divider,
  Tooltip,
  Typography
} from "antd";
import { QuestionCircleOutlined } from "@ant-design/icons";

const initialAppConfig: SimulationConfig = {
  stationaryPercentAtStart: 95,
  infectedDotsAtStart: 3,
  timeToCure: 14,
  numberOfDots: 200,
  medicalCapacityPercent: 25
};

const scenarios: SimulationConfig[] = [
  {
    stationaryPercentAtStart: 95,
    infectedDotsAtStart: 3,
    timeToCure: 14,
    numberOfDots: 200,
    medicalCapacityPercent: 25
  },
  {
    stationaryPercentAtStart: 5,
    infectedDotsAtStart: 3,
    timeToCure: 14,
    numberOfDots: 200,
    medicalCapacityPercent: 25
  }
];

const { Title, Paragraph, Text } = Typography;

const ValueSelector = ({
  simulationConfig,
  setSimulationConfig,
  field,
  max,
  min,
  suffix
}: {
  max: number;
  min: number;
  simulationConfig: SimulationConfig;
  setSimulationConfig: (s: SimulationConfig) => void;
  field: keyof SimulationConfig;
  suffix?: string;
}) => {
  return (
    <Row gutter={16}>
      <Col span={16}>
        <Slider
          value={simulationConfig[field]}
          min={min}
          max={max}
          tipFormatter={e => `${e}${suffix || ""}`}
          style={{ width: "100%" }}
          onChange={e => {
            setSimulationConfig(
              produce(simulationConfig, c => {
                c[field] = (e as number) || 1;
              })
            );
          }}
        />
      </Col>
      <Col span={8}>
        <InputNumber
          value={simulationConfig[field]}
          min={min}
          max={max}
          style={{ width: "100%" }}
          formatter={e => `${e}${suffix || ""}`}
          onChange={e => {
            setSimulationConfig(
              produce(simulationConfig, c => {
                c[field] = e || 1;
              })
            );
          }}
        />
      </Col>
    </Row>
  );
};

function App() {
  const [simulation, setSimulation] = useState<Simulation>();
  const [simulationState, setSimulationState] = useState<SimulationState>();

  const [simulationEnvironment] = useState<SimulationEnvironment>({
    dotSize: 8,
    dotVelocity: 1.4,
    canvasWidth: 1200,
    canvasHeight: 800,
    chartHeight: 300,
    chartBarWidth: 0.5
  });

  const [loadedSimulationConfig, setLoadedSimulationConfig] = useState<
    SimulationConfig
  >();

  const [simulationConfig, setSimulationConfig] = useState<SimulationConfig>(
    initialAppConfig
  );

  const start = React.useCallback(
    (config?: SimulationConfig) => {
      if (simulation) {
        simulation.stop();
      }
      const newSimulation = createSimulation(
        { ...simulationEnvironment },
        { ...(config || simulationConfig) }
      );
      if (config) {
        setSimulationConfig(config);
      }
      setLoadedSimulationConfig(config || simulationConfig);
      setSimulation(newSimulation);

      newSimulation.start();
    },
    [simulation, simulationConfig, simulationEnvironment]
  );

  const updateState = React.useCallback(() => {
    if (simulation) {
      const newState = simulation.getState();
      setSimulationState(newState);
    }
  }, [simulation]);

  useEffect(() => {
    const interval = setInterval(() => {
      updateState();
    }, 1000);

    return () => clearInterval(interval);
  }, [updateState]);

  useEffect(() => {
    start();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const controls = (
    <>
      <div>
        <div>
          Population count{" "}
          <Tooltip overlay="Set how many people will live in your population.">
            <QuestionCircleOutlined />
          </Tooltip>
        </div>
        <ValueSelector
          min={10}
          max={500}
          field="numberOfDots"
          simulationConfig={simulationConfig}
          setSimulationConfig={setSimulationConfig}
        />
      </div>
      <Divider />
      <div>
        <div>
          Percent of stationary (isolating) people{" "}
          <Tooltip
            overlay={`This percentage of people will not move in your population. They can be "visited" by other persons, but will remain stationary.`}
          >
            <QuestionCircleOutlined />
          </Tooltip>
        </div>
        <ValueSelector
          min={0}
          max={100}
          field="stationaryPercentAtStart"
          simulationConfig={simulationConfig}
          setSimulationConfig={setSimulationConfig}
          suffix="%"
        />
      </div>
      <Divider />

      <div>
        <div>
          Time to cure in seconds{" "}
          <Tooltip
            overlay={`After set amount of time, every infected person will become "cured" - this means that it will not transmit the infection and cannot be infected anymore.`}
          >
            <QuestionCircleOutlined />
          </Tooltip>
        </div>
        <ValueSelector
          min={1}
          max={30}
          field="timeToCure"
          simulationConfig={simulationConfig}
          setSimulationConfig={setSimulationConfig}
          suffix=" s"
        />
      </div>
      <Divider />

      <div>
        <div>
          Initially infected population{" "}
          <Tooltip
            overlay={`This number of people will have be infected from the beginning.`}
          >
            <QuestionCircleOutlined />
          </Tooltip>
        </div>
        <ValueSelector
          min={1}
          max={simulationConfig.numberOfDots}
          field="infectedDotsAtStart"
          simulationConfig={simulationConfig}
          setSimulationConfig={setSimulationConfig}
          suffix={` / ${simulationConfig.numberOfDots}`}
        />
      </div>
    </>
  );

  return (
    <div>
      <Row justify="center" align="middle">
        <Col span={20}>
          <Row justify="center">
            <Col span={16}>
              <Row justify="center">
                <Title>Infection & social distancing simulator</Title>
                <Paragraph type="secondary">
                  COVID-19 pandemic is no joke. Every day, people are dieing in
                  many countries across the world.{" "}
                  <strong>
                    One of most countermeasures applied in almost every place is
                    some form of social distancing, which results in reduced
                    human interactions and prevention of virus spread.{" "}
                  </strong>
                  Social distancing takes many forms: voluntary staying at home
                  or forced curfews. Still, it is the best form of infection
                  prevention.
                </Paragraph>
                <Paragraph>
                  This application below allows you to simulate a virtual
                  society, where certain portion of inhbitants is stationary
                  (isolated), while the rest is moving. Play with it a little
                  and see for yourself,{" "}
                  <strong>how important is staying in place</strong> - and how
                  it affects virus spread.
                </Paragraph>
              </Row>
            </Col>
          </Row>
          <Row
            justify="center"
            gutter={24}
            align="middle"
            style={{ height: 60 }}
          >
            {simulationState && (
              <>
                <Col className="indicator i-healthy">
                  Healthy: {simulationState.numHealthy}
                </Col>
                <Col className="indicator i-infected">
                  Infected: {simulationState.numInfected}
                </Col>
                <Col className="indicator i-cured">
                  Cured: {simulationState?.numCured}
                </Col>
              </>
            )}
          </Row>
          <Row
            justify="center"
            gutter={16}
            align="middle"
            style={{ height: 60 }}
          >
            {simulationState && (
              <>
                <Col className="small-indicator i-peak-infected">
                  Peak infected: {simulationState.peakInfected} (
                  {simulationState?.peakInfectedPercent.toFixed(2)} %)
                </Col>
              </>
            )}
          </Row>
        </Col>
      </Row>
      <Row justify="center">
        <Col span={20}>
          <Row gutter={16}>
            <Col className="wrap-controls">
              {controls}
              <Divider type="horizontal" orientation="left">
                Predefined scenarios
              </Divider>
              {/* <Title level={3}>:</Title> */}
              <Row gutter={[8, 16]}>
                <Col span={12}>
                  <Paragraph>
                    Moderate population,{" "}
                    <Text className="intent-success">many isolated people</Text>
                    , low initial infection.{" "}
                  </Paragraph>
                  <Paragraph>
                    <strong>
                      Result: <Text className="intent-success">low strain</Text>{" "}
                      on medical capacity.
                    </strong>
                  </Paragraph>
                  <Button type="primary" onClick={() => start(scenarios[0])}>
                    Run scenario
                  </Button>
                </Col>
                <Col span={12}>
                  <Paragraph>
                    Moderate population,{" "}
                    <Text className="intent-danger">
                      low number of isolated people
                    </Text>
                    , low initial infection.{" "}
                  </Paragraph>
                  <Paragraph>
                    <strong>
                      Result: <Text className="intent-danger">high strain</Text>{" "}
                      on medical capacity.
                    </strong>
                  </Paragraph>
                  <Button type="primary" onClick={() => start(scenarios[1])}>
                    Run scenario
                  </Button>
                </Col>
              </Row>
            </Col>
            <Col className="wrap-canvas" style={{ minWidth: 600 }}>
              <Row justify="center">
                <Button
                  type="primary"
                  danger={loadedSimulationConfig !== simulationConfig}
                  style={{
                    width: simulationEnvironment.canvasWidth / 2
                  }}
                  onClick={() => start()}
                >
                  {!simulation
                    ? "Start simulation"
                    : loadedSimulationConfig === simulationConfig
                    ? "Restart simulation using current settings"
                    : "Apply new settings and restart simulation"}
                </Button>
              </Row>
              <Row justify="center" className="canvas-holder">
                <div className="canvas-line-tooltip">
                  <Tooltip overlay="This line marks hypothetical limit of the hospitals’ ability to cure people">
                    <QuestionCircleOutlined style={{ fontSize: "12px" }} />
                  </Tooltip>
                </div>
                <canvas
                  id="canvas"
                  style={{
                    width: simulationEnvironment.canvasWidth / 2,
                    height:
                      (simulationEnvironment.canvasHeight +
                        simulationEnvironment.chartHeight) /
                      2
                  }}
                />
              </Row>
            </Col>
          </Row>
        </Col>
      </Row>
      <br />
      <br />
      <Row justify="center" align="middle">
        <Col span={20}>
          <Row justify="center">
            <Col span={16}>
              <Row justify="center">
                <Paragraph>
                  &copy;2020 Hubert Zub. Licensed under MIT License.{" "}
                  <a href="https://github.com/hzub/infection-simulator/">
                    Repository
                  </a>
                </Paragraph>
              </Row>
            </Col>
          </Row>
        </Col>
      </Row>
    </div>
  );
}

export default App;
