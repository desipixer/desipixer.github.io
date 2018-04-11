export class Gallery {
    constructor(name) {
        this.name = name;
        this.itemsCount = 0;
        this.items = [];
        this.currentIndex = null;
    }
    loadImages(items) {
        if (!this.items) {
            return [];
        } else {
            this.items = items;
            this.currentIndex = 0;
            this.itemsCount = items.count;
        }
    }
    getNextImage() {
        if (this.items) {
            if (this.currentIndex == this.items.length) {
                this.currentIndex = 0;
            }
            return this.items[++this.currentIndex];
        }
    }
    getPreviousImage() {
        if (this.items) {
            if (this.currentIndex == 0) {
                this.currentIndex = this.items.length - 1;
            }
            return this.items[--this.currentIndex];
        }
    }
    getCurrentIndex() {
        return this.currentIndex;
    }
    getCurrentImage() {
        if (!this.items) {
            return "";
        }
        return this.items[this.currentIndex];
    }

    /**
     * Implement code later.
     * Use the same code as dp.
     */
    downloadImage(index) {
        if (index < 0 || index > this.items.length) {
            console.log("ERROR");
            return null;
        }
    }

}