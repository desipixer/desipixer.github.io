import React from 'react';
import { render } from 'react-dom';
import { ImageClass } from './models/image';
import { Gallery } from './models/gallery';
import MyImage from './MyImage.jsx';
import MyFileReader from './MyFileReader.jsx';
import FetchBlock from './FetchBlock.jsx';


class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            items: [],
            galInstance: null,
            currentIndex: 0,
            currentImage: "",
            startIndex: 500000,
            endIndex: 600000,
            dataLoaded: false
        }
        this.getPreviousImage = this.getPreviousImage.bind(this);
        this.getNextImage = this.getNextImage.bind(this);
    }

    componentDidMount() {
        let _this = this;
        this.add
        let imageset = ImageClass.getImageDataSet().then((res) => {
            return res.json()
        }).then((data) => {
            let inst = new Gallery('new-gallery');
            let startIndex = _this.state.startIndex > data.length ? 0 : _this.state.startIndex;
            let endIndex = _this.state.endIndex > data.length ? data.length : _this.state.endIndex;
            data = data.slice(startIndex, endIndex);
            this.setState({
                startIndex: startIndex,
                endIndex: endIndex
            });
            inst.loadImages(data);
            _this.setState({
                galInstance: inst,
                currentIndex: 0,
                currentImage: inst.getCurrentImage(),
                dataLoaded: true
            });

            let shortenedData = data.slice(0, 10);
            _this.setState({
                items: shortenedData
            });
        }).catch((err) => {
            console.log("Error");
        });
    }

    getPreviousImage() {
        this.setState({
            currentImage: this.state.galInstance.getPreviousImage()
        });
        //console.log("clicked previous");
        //this.galleryInstance.getPreviousImage();
    }

    getNextImage() {
        this.setState({
            currentImage: this.state.galInstance.getNextImage(),
            currentIndex: this.state.galInstance.getCurrentIndex()
        });
        //console.log("clicked next");
    }

    /**
    * Once image has loaded successfully, load next image.
    */
    getNextImageOnLoad() {
        let _this = this;
        if((_this.state.currentIndex + _this.state.startIndex) < _this.state.endIndex){
            //end the slideshow.
            setTimeout(() => {
                _this.getNextImage();
            }, 1);
        }
    }

    /**
     * If Image fails to load, get next image.
     */
    getNextImageOnError() {
        let _this = this;
        _this.getNextImage();
    }

    startSlideshow() {
        console.log("slide show started");
        this.getNextImageOnLoadInitial = this.getNextImageOnLoad;
        this.getNextImageOnLoad();
    }

    stopSlideshow() {
        console.log("slide show stopped");
        this.getNextImageOnLoadInitial = () => { };
    }

    getNextImageOnLoadInitial() {

    }

    onReaderChange(e) {
        let reader = new FileReader();
        reader.onload = this.onReaderLoad.bind(this);
        if (e.target.files.length < 0) {
            console.log(`Error : cannot read file `);
            alert('Cannot read file. Try again.')
            return;
        }
        reader.readAsText(e.target.files[0]);
    }

    onReaderLoad(e) {
        let _this = this;
        try {
            let obj = JSON.parse(e.target.result);
            if (obj && typeof obj == "object") {
                let inst = new Gallery('new-gallery');
                inst.loadImages(obj);
                _this.setState({
                    items: obj,
                    currentIndex: 0,
                    galInstance: inst,
                    dataLoaded: true,
                    currentImage: inst.getCurrentImage(),
                    startIndex: 0,
                    endIndex: obj.length - 1
                });

            }
            return null;
        } catch (ex) {
            console.log("ERROR while decrypting file ", ex);
            return null;
        }
    }

    render() {
        if (this.state.dataLoaded) {
            return (
                <div>
                    <FetchBlock />
                </div>);
        }
        return (<div> Loading... </div>);
    }

    arrayItems() {
        return null;
    }
}

render(<App />, document.getElementById('app'));