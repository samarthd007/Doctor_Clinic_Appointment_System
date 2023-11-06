import axios from 'axios'
import Layout from '../components/Layout'
import { Image, Card, Statistic, Row, Col } from 'antd'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const Home = () => {
    const doctorsCount = 173
    const clinicsCount = 45

    const { Content } = Layout

    const images = require('..//asset//Physician.jpg')

    return (
        <Layout>
            <div className="not-exceed">
                <div className="image-container">
                    <Image
                        src={images} // Replace with your image URL
                        alt="Your Image"
                        preview={false} // Disable the preview on click
                        className="fit-image"
                    />
                </div>
                <Card
                    className="page-title"
                    title="Enrollment Information"
                    bordered={false}
                >
                    <Row gutter={16}>
                        <Col span={12}>
                            <Statistic
                                title="Doctors Enrolled"
                                value={doctorsCount}
                                valueStyle={{ color: '#1890ff' }}
                                prefix={
                                    <FontAwesomeIcon icon="far fa-user-md" />
                                }
                            />
                        </Col>
                        <Col span={12}>
                            <Statistic
                                title="Clinics Enrolled"
                                value={clinicsCount}
                                valueStyle={{ color: '#52c41a' }}
                                prefix={
                                    <FontAwesomeIcon icon="fa-regular fa-house-chimney-medical" />
                                }
                            />
                        </Col>
                    </Row>
                </Card>
            </div>
        </Layout>
    )
}

export default Home
