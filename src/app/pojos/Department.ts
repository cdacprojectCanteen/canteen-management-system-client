class Department {
    private _departmentId : number
    private _name : string;

    
    public set departmentId(v : number) {
        this._departmentId = v;
    }

    
    public get departmentId() : number {
        return this._departmentId;
    }

    
    public set name(v : string) {
        this._name = v;
    }
    
    
    public get name() : string {
        return this._name;s
    }
    
    
    constructor(parameters) {
        
    }
}