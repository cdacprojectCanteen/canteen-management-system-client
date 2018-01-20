    abstract class Person{

    private _id : number;
    private _firstName : string;
    private _lastName : string;
    private _passHash : string;
    private _address : Address;
    private _phoneNo : PhoneNO;
    private _emailId : Email;
    private _dateOfBirth : Date;
    private _dateOfJoining : Date;
    private _preferredLanguage : string;
    
    

	public get id(): number {
		return this._id;
	}

	public set id(value: number) {
		this._id = value;
	}

	public get firstName(): string {
		return this._firstName;
	}

	public set firstName(value: string) {
		this._firstName = value;
	}

	public get lastName(): string {
		return this._lastName;
	}

	public set lastName(value: string) {
		this._lastName = value;
	}

	public get passHash(): string {
		return this._passHash;
	}

	public set passHash(value: string) {
		this._passHash = value;
	}

	public get address(): Address {
		return this._address;
	}

	public set address(value: Address) {
		this._address = value;
	}

	public get phoneNo(): PhoneNO {
		return this._phoneNo;
	}

	public set phoneNo(value: PhoneNO) {
		this._phoneNo = value;
	}

	public get emailId(): Email {
		return this._emailId;
	}

	public set emailId(value: Email) {
		this._emailId = value;
	}

	public get dateOfBirth(): Date {
		return this._dateOfBirth;
	}

	public set dateOfBirth(value: Date) {
		this._dateOfBirth = value;
	}

	public get dateOfJoining(): Date {
		return this._dateOfJoining;
	}

	public set dateOfJoining(value: Date) {
		this._dateOfJoining = value;
	}

	public get preferredLanguage(): string {
		return this._preferredLanguage;
	}

	public set preferredLanguage(value: string) {
		this._preferredLanguage = value;
	}

    constructor(parameters) {
        
    }
}