import ContentPage from 'components/ContentPage';
import React from 'react';
import { Row, Col, Card, Accordion, Button } from 'react-bootstrap';
import CameraStatusPill from 'components/v3/camera_system/CameraStatusPill/CameraStatusPill';
import WirelessModuleStatusPill from 'components/v3/wireless_modules/WirelessModuleStatusPill';
/**
 * V3 System Status page component
 *
 * @returns {React.Component} Component
 */



const CameraStatusCol = () => {
    return (
        <Col md xl="12" className="my-2">
            <span>
                <b>Primary</b> <CameraStatusPill device="primary" />
            </span>
            {/* IP address */}
            <p style={{ fontSize: "0.75rem", color: "gray" }}>192.168.3.9</p>

            {/* Battery Voltage */}
            <Row className="mx-2">
                <Col xs="auto">
                    Battery Voltage
                </Col>
                <Col xs style={{ textAlign: "right" }}>
                    3.9V
                </Col>
            </Row>

            {/* Video Feed Status */}
            <Row className="mx-2">
                <Col xs="auto">
                    Video Feed
                </Col>
                <Col xs style={{ textAlign: "right" }}>
                    OFF
                </Col>
            </Row>
        </Col>
    );
};



export default function SensorStatusView() {
    return (
        <ContentPage title="System Status">
            <Row>
                {/* Camera Status */}
                <Col xl className="mb-2">
                    <Card>
                        <Card.Body>
                            <Card.Title>Camera System</Card.Title>
                            <Row>
                                {/* Primary Camera Status */}
                                <CameraStatusCol />
                                <CameraStatusCol />

                                {/* Secondary Camera Status */}
                                <Col md xl="12" className="my-2">
                                    <span>
                                        <b>Secondary</b> <CameraStatusPill device="secondary" />
                                    </span>
                                    {/* IP address */}
                                    <p style={{ fontSize: "0.75rem", color: "gray" }}>192.168.3.9</p>

                                    {/* Battery Voltage */}
                                    <Row className="mx-2">
                                        <Col xs="auto">
                                            Battery Voltage
                                        </Col>
                                        <Col xs style={{ textAlign: "right" }}>
                                            3.9V
                                        </Col>
                                    </Row>

                                    {/* Video Feed Status */}
                                    <Row className="mx-2">
                                        <Col xs="auto">
                                            Video Feed
                                        </Col>
                                        <Col xs style={{ textAlign: "right" }}>
                                            OFF
                                        </Col>
                                    </Row>
                                </Col>
                            </Row>
                        </Card.Body>
                    </Card>
                </Col>

                {/* Wireless Module Status */}
                <Col xl className="mb-2">
                    <Card>
                        <Card.Body>
                            <Card.Title>Wireless Modules</Card.Title>
                            <Row>
                                {/* Front WM Status */}
                                <Col md xl="12" className="my-2">
                                    <span>
                                        <b>Front WM</b> <WirelessModuleStatusPill />
                                    </span>
                                    {/* IP address */}
                                    <p style={{ fontSize: "0.75rem", color: "gray" }}>/v3/wireless_module/3/data</p>

                                    {/* Battery Voltage */}
                                    <Row className="mx-2">
                                        <Col xs="auto">
                                            Battery Voltage
                                        </Col>
                                        <Col xs style={{ textAlign: "right" }}>
                                            3.9V
                                        </Col>
                                    </Row>

                                    {/* Video Feed Status */}
                                    <Row className="mx-2">
                                        <Col xs="auto">
                                            Video Feed
                                        </Col>
                                        <Col xs style={{ textAlign: "right" }}>
                                            OFF
                                        </Col>
                                    </Row>

                                    <Accordion className="mt-2">
                                        <Card>
                                            <Accordion.Toggle as={Button} variant="outline-success" eventKey="0" onClick={() => console.log("yo")}>
                                                Toggle Sensor Data
                                            </Accordion.Toggle>
                                            <Accordion.Collapse eventKey="0">
                                                <Card.Body>
                                                    {/* Battery Voltage */}
                                                    <Row className="mx-2">
                                                        <Col xs="auto">
                                                            Battery Voltage
                                                        </Col>
                                                        <Col xs style={{ textAlign: "right" }}>
                                                            3.9V
                                                    </Col>
                                                    </Row>

                                                    {/* Video Feed Status */}
                                                    <Row className="mx-2">
                                                        <Col xs="auto">
                                                            Video Feed
                                        </Col>
                                                        <Col xs style={{ textAlign: "right" }}>
                                                            OFF
                                        </Col>
                                                    </Row>
                                                </Card.Body>
                                            </Accordion.Collapse>
                                        </Card>
                                    </Accordion>
                                </Col>

                                {/* Middle WM Status */}
                                <Col md xl="12" className="my-2">
                                    <span>
                                        <b>Front WM</b> <WirelessModuleStatusPill />
                                    </span>
                                    {/* IP address */}
                                    <p style={{ fontSize: "0.75rem", color: "gray" }}>/v3/wireless_module/3/data</p>
                                </Col>

                                {/* Back WM Status */}
                                <Col md xl="12" className="my-2">
                                    <span>
                                        <b>Front WM</b> <WirelessModuleStatusPill />
                                    </span>
                                    {/* IP address */}
                                    <p style={{ fontSize: "0.75rem", color: "gray" }}>/v3/wireless_module/3/data</p>
                                    <Accordion>
                                        <Card>
                                            <Accordion.Toggle as={Button} variant="link" eventKey="2">
                                                Toggle Sensor Data
                                            </Accordion.Toggle>
                                            <Accordion.Collapse eventKey="2">
                                                <Card.Body>Hello! Im the body</Card.Body>
                                            </Accordion.Collapse>
                                        </Card>
                                    </Accordion>
                                </Col>
                            </Row>

                        </Card.Body>

                    </Card>
                </Col>

            </Row >

        </ContentPage >
    );
}
