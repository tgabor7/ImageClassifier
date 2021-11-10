import { useEffect, useRef, useState } from "react"
import ml5 from 'ml5'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Col, Container, Row, Spinner } from "react-bootstrap";

export default () => {

    const image = useRef(null)
    const container = useRef(null)
    const canvas = useRef(null)

    const [data, setData] = useState()
    const [prediciton, setPrediction] = useState('')
    const [loading, setLoading] = useState(false)

    const objectDetector = ml5.objectDetector('cocossd', {}, ()=>{});  

    return (<>
        <Container>
            <Row>
                <Col>
                    <div ref={container} style={{ 'box-shadow': '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)', width: image.current ? image.current.width : 500, height: image.current ? image.current.height : 500, margin: 'auto', marginTop: 100, border: '1px solid gray' }}>
                        <img style={{ visibility: 'hidden', margin: 'auto', position: 'absolute', zIndex: -1, maxWidth: 400, height: 'auto' }} ref={image} onChange={() => {

                        }} src={data} />
                        {loading && <Spinner style={{ zIndex: 2, color: '#000', width: 100, height: 100, margin: 'auto' }} animation="border" role="status">
                        </Spinner>}
                        <canvas ref={canvas} style={{ visibility: loading ? 'hidden' : 'visible', margin: 'auto', position: 'absolute', zIndex: -1, maxWidth: 400, height: 'auto' }} width={image.current ? image.current.width : 500} height={image.current ? image.current.height : 500} />
                        {!image.current && <p style={{ fontFamily: 'sans-serif', fontSize: 24, zindex: -1, fontWeight: 'bold', margin: 'auto' }}>Drag and drop an image</p>}
                        <input label="file-input" style={{ width: '100%', height: '100%', opacity: 0 }} type="file" onChange={event => {
                            if (event.target.files && event.target.files[0]) {
                                let reader = new FileReader();
                                setLoading(true)
                                reader.onload = (e) => {
                                    setData(e.target.result);
                                    
                                   
                                    objectDetector.detect(image.current, (err, results) => {
                                        setPrediction(results)

                                        var context = canvas.current.getContext('2d')
                                        context.clearRect(0, 0, canvas.current.width, canvas.current.height)
                                        context.drawImage(image.current, 0, 0, image.current.width, image.current.height)

                                        for (const result of results) {
                                            context.beginPath()
                                            context.rect(result.x, result.y, result.width, result.height)

                                            context.lineWidth = 2
                                            context.strokeStyle = '#ff0'
                                            context.stroke()

                                            context.font = '24px serif'
                                            context.fillStyle = '#ff0'
                                            context.fillText(result.label, result.x, result.y + 20)
                                        }
                                        setLoading(false)
                                    });
                                };
                                reader.readAsDataURL(event.target.files[0]);
                            }
                        }} />

                    </div>
                </Col>
                <Col>


                    <div style={{ marginTop: 100 }}>
                        <h1>Predictions</h1>
                        {loading && <p>Loading...</p>}
                        {!loading && prediciton ? prediciton.map((p, i) => {
                            return <Row><p style={{ fontSize: i === 0 ? 32 : (i === 1 ? 24 : 16) }}>{p.label}</p></Row>
                        }) : ''}
                    </div>
                </Col>
            </Row>

        </Container>



    </>)
}