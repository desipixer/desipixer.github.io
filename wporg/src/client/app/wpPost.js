export class WpPost{
    constructor(title, content){
        this.title = title;
        this.content = content;
    }

    getContent(){
        return this.content;
    }

    setContent(content){
        this.content = content;
    }
}