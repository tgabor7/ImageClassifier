import React, { useEffect } from 'react';
import logo from './logo.svg';
import Upload from './Upload'
import './App.css';
import { Card } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Helmet } from 'react-helmet';

function App() {

  return (
    <div className="App" >
      <Helmet>
        <meta charSet="utf-8" />
        <title>Image classifier</title>
        <link rel="canonical" href="" />
      </Helmet>
      <div style={{ marginTop: 50, width: '90%', marginLeft: 'auto', marginRight: 'auto' }}>
        <h1>Image classifier</h1>
        <p>The website uses the COCO-SSD model to identify multiple objects in a single image. The model uses the COCO dataset which is a large-scale object detection, segmentation, and captioning dataset. The model is capable of detecting <a href="https://github.com/tensorflow/tfjs-models/blob/master/coco-ssd/src/classes.ts">80 classes</a> of objects. <a href="https://github.com/tensorflow/tfjs-models/tree/master/coco-ssd">Source</a></p>
      </div>
      <Upload />
    </div>
  );
}

export default App;
