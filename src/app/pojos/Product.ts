class Product {

    private _productId :number;
    private _name : string;
    private _category :Category;
    private _price : number;
    private _quantity : number;
    private _tags : Array<string>;
    private _description : string;


    
    public set productId(v : number) {
        this._productId = v;
    }
    
    
    public get productId() : number {
        return this._productId;
    }
    
    
    public set name(v : string) {
        this._name = v;
    }
    
    
    public get name() : string {
        return this._name;
    }

    
    public set category(v : Category) {
        this._category = v;
    }

    
    public get category() : Category {
        return this._category;
    }
    
    
    public set price(v : number) {
        this._price = v;
    }
    
    
    public get price() : number {
        return this._price;
    }
    

    
    public set quantity(v : number) {
        this._quantity = v;
    }
    

    
    public get quantity() : number {
        return this._quantity;
    }
    
    
    
    public set tags(v : Array<string>) {
        this._tags = v;
    }
    

    
    public get tags() : Array<string> {
        return this._tags;
    }
    
    
    
    public set description(v : string) {
        this._description = v;
    }
    

    
    public get description() : string {
        return this._description;
    }
    
    constructor(parameters) {
        
    }
}