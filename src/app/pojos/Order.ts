class Order {

    private _orderId : number;
    private _customer : Customer;
    private _products : Array<Product>;
    private _orderTime : Date;

    
    public set orderId(v : number) {
        this._orderId = v;
    }
    
    
    public get orderId() : number {
        return this._orderId;
    }
    

    
    public set customer(v : Customer) {
        this._customer = v;
    }
    
    
    public get customer() : Customer {
        return this._customer;
    }

    
    public set products(v : Array<Product>) {
        this._products = v;
    }

    
    public get products() : Array<Product> {
        return this._products;
    }
    
    
    public set orderTime(v : Date) {
        this._orderTime = v;
    }
    
    
    public get orderTime() : Date {
        return this._orderTime;
    }
    
    
    constructor(parameters) {
        
    }
}