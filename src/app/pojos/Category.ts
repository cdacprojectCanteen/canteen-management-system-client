class Category {

    private _categoryId : string;
    private _name : string;

    
    public set categoryId(v : string) {
        this._categoryId = v;
    }

    
    public get categoryId() : string {
        return this._categoryId;
    }
    
    
    public set name(v : string) {
        this._name = v;
    }
    
    
    public get name() : string {
        return this._name;
    }
    

    constructor(parameters) {
        
    }
}