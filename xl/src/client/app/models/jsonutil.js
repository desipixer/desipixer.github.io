export class JsonUtil {
    constructor() {

    }

    /**
     * File Reader event.
     * @param {event} e 
     */
    static onChange(e) {
        var reader = new FileReader();
        reader.onload = this.onReaderLoad;
        if (e.target.files.length < 0) {
            console.log(`Error : cannot read file `);
            alert('Cannot read file. Try again.')
            return;
        }
        reader.readAsText(e.target.files[0]);
    }

    /**
     * this file will be used to load the event.
     * @param {event} e 
     */
    static onReaderLoad(e) {
        try {
            var obj = JSON.parse(e.target.result);
            if (obj && typeof obj == "object") {
                return obj;
            }
            return null;
        } catch (ex) {
            console.log("ERROR while decrypting file ", ex);
            return null;
        }
    }

    render(){
        
    }
}