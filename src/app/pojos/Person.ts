    abstract class Person{

    private _id : number;
    private _name : string;
    private _address : Address;
    private _phoneNo : PhoneNO;
    private _emailId : Email;
    private _dateOfBirth : Date;
    private _dateOfJoining : Date;


    
    public get id() : number {
        return this._id;
    }

    
    public set id(id : number) {
        this._id = id;
    }
    
    

    constructor(parameters) {
        
    }
}