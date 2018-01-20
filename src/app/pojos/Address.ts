 class Address {
    private _houseNo : string;
    private _street : string;
    private _colony : string;
    private _area : string;
    private _town : string;
    private _pincode : string;

    
    public set houseNO(v : string) {
        this._houseNo = v;
    }
    
    
    public get houseNO() : string {
        return this._houseNo;
    }

    
    public set street(v : string) {
        this._street = v;
    }

    
    public get street() : string {
        return this._street;
    }
    
    
    public set colony(v : string) {
        this._colony = v;
    }
    
    
    
    public get colony() : string {
        return this._colony;
    }
    

    
    public set area(v : string) {
        this._area = v;
    }

    
    public get area() : string {
        return this._area;
    }

    
    public set town(v : string) {
        this._town = v;
    }
    
    
    public get town() : string {
        return this._town;
    }
    
    
    public set pincode(v : string) {
        this._pincode = v;
    }

    
    
    public get pincode() : string {
        return this._pincode;
    }
    
    constructor(parameters) {
        
    }
}