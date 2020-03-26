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

const { Title, Paragraph } = Typography;

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

  const [simulationConfig, setSimulationConfig] = useState<SimulationConfig>({
    stationaryPercentAtStart: 60,
    infectedDotsAtStart: 10,
    timeToCure: 14,
    numberOfDots: 100,
    medicalCapacityPercent: 25
  });

  const start = React.useCallback(() => {
    if (simulation) {
      simulation.stop();
    }
    const newSimulation = createSimulation(
      { ...simulationEnvironment },
      { ...simulationConfig }
    );
    setLoadedSimulationConfig(simulationConfig);
    setSimulation(newSimulation);

    newSimulation.start();
  }, [simulation, simulationConfig, simulationEnvironment]);

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
    // start();
  }, [simulation]);

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
                <Title>Social Distancing Simulator</Title>
                <Paragraph type="secondary">
                  Ant Design, a design language for background applications, is
                  refined by Ant UED Team. Ant Design, a design language for
                  background applications, is refined by Ant UED Team. Ant
                  Design, a design language for background applications, is
                  refined by Ant UED Team. Ant Design, a design language for
                  background applications, is refined by Ant UED Team.
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
            <Col className="wrap-controls">{controls}</Col>
            <Col className="wrap-canvas" style={{ minWidth: 600 }}>
              <Row justify="center">
                <Button
                  type="primary"
                  danger={loadedSimulationConfig !== simulationConfig}
                  style={{
                    width: simulationEnvironment.canvasWidth / 2
                  }}
                  onClick={start}
                >
                  {!simulation
                    ? "Start simulation"
                    : loadedSimulationConfig === simulationConfig
                    ? "Restart simulation"
                    : "Apply new settings and restart simulation"}
                </Button>
              </Row>
              <Row justify="center">
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
    </div>
  );
}

export default App;
