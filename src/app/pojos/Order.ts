import {Product} from './Product';
import {Customer} from './Customer';

export class Order {

	public orderId : number;
    public customer : Customer;
    public products : Array<Product>;
    public orderTime : Date;
    public transactionNo : number;
	public couponCode : string;
	public orderStatus : string;

    // private orderId : number;
    // private customer : Customer;
    // private products : Array<Product>;
    // private orderTime : Date;
    // private transactionNo : number;
	// private couponCode : string;
    

	// public get OrderId(): number {
	// 	return this.orderId;
	// }

	// public set OrderId(value: number) {
	// 	this.orderId = value;
	// }

	// public get Customer(): Customer {
	// 	return this.customer;
	// }

	// public set Customer(value: Customer) {
	// 	this.customer = value;
	// }

	// public get Products(): Array<Product> {
	// 	return this.products;
	// }

	// public set Products(value: Array<Product>) {
	// 	this.products = value;
	// }

	// public get OrderTime(): Date {
	// 	return this.orderTime;
	// }

	// public set OrderTime(value: Date) {
	// 	this.orderTime = value;
	// }

	// public get TransactionNo(): number {
	// 	return this.transactionNo;
	// }

	// public set TransactionNo(value: number) {
	// 	this.transactionNo = value;
	// }

	// public get CouponCode(): string {
	// 	return this.couponCode;
	// }

	// public set CouponCode(value: string) {
	// 	this.couponCode = value;
	// }
    
}