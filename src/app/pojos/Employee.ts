class Employee extends Person {
    private _salary : number;
    private _department : Department;

    
    public set salary(v : number) {
        this._salary = v;
    }
    
    
    public get salary() : number {
        return this._salary;
    }
    
    
    public set department(v : Department) {
        this._department = v;
    }
    
    
    public get department() : Department {
        return this._department;
    }
    

    constructor(parameters) {
        super(parameters);
    }
}