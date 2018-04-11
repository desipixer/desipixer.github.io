

export class ImageClass {
    constructor(src) {
        this.src = src;
    }
    getImageUrl() {
        return this.src;
    }

    static getImageDataSet() {
        let imageArray = [
            "./data/images-bak.json",
            "./data/ragalahari-full.json"
        ]
        return fetch(imageArray[0]);
    }
}