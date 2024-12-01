import {ProductInterface} from "./product.interface.ts";

export interface CartProductsInterface extends ProductInterface{
    count:number;
}