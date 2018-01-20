class Email {

    private _email : string;
    
    public set email(v : string) {
        this._email = v;
    }

    
    public get email() : string {
        return this._email;
    }
    
    
    constructor(parameters) {
        
    }
}