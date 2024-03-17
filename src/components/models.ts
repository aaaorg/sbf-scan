export interface ScanEventBus {
  // Index signature for each property of the event bus
  // Each property must take a function with void return type and any number of string arguments (even none)
  [key: string]: (...args: string[]) => void;
  'code-scanned': (value: string) => void;
  'scan-failed': () => void;
}

export interface Category {
  name: string;
  color: string;
}

export interface ProductStock {
  amount_left: number;
  price: number;
}

export interface Product {
  _id: string;
  code: string;
  displayName: string;
  description: string;
  imagePath: string;
  category: Category;
  stock: ProductStock[];
  stockSum: number;
}

export interface BasketItem {
  product: Product;
  quantity: number;
  readonly totalPrice: number;
  readonly priceDetails: {amount: number, price: number}[];
}

export class BasketItemImpl implements BasketItem {
  constructor(public product: Product, public quantity: number) {}
  get totalPrice() {
    let totalQuantity = 0;
    let totalPrice = 0;
    for (let i = 0; i < this.product.stockSum && totalQuantity < this.quantity ; i++) {
      for (let j = 0; j < this.product.stock[i].amount_left && totalQuantity < this.quantity; j++) {
        totalQuantity++;
        totalPrice += this.product.stock[i].price;
      }
    }
    return totalPrice;
  }
  get priceDetails() {
    const result = [];
    let amount = this.quantity;
    for (let i = 0; i < this.product.stock.length; i++) {
        if (this.product.stock[i].amount_left >= amount) {
            result.push({
                'amount': amount,
                'price': this.product.stock[i].price
            });
            return result;
        } else {
            result.push({
                'amount': this.product.stock[i].amount_left,
                'price': this.product.stock[i].price
            });
            amount -= this.product.stock[i].amount_left;
        }
    }
    return result;
  }
}

export interface User {
  id: string;
  displayName: string;
  supplier: boolean;
  favorites?: Product[];
}

export interface BoundingBox {
  x: number;
  y: number;
  width: number;
  height: number;
  top: number;
  right: number;
  bottom: number;
  left: number;
}

export interface ScanResult {
  boundingBox: BoundingBox;
  rawValue: string;
  format: BarcodeType;
  cornerPoints: [
    { x: number; y: number },
    { x: number; y: number },
    { x: number; y: number },
    { x: number; y: number }
  ];
}

export type BarcodeType =
  | 'aztec'
  | 'code_128'
  | 'code_39'
  | 'code_93'
  | 'codabar'
  | 'databar'
  | 'databar_expanded'
  | 'data_matrix'
  | 'dx_film_edge'
  | 'ean_13'
  | 'ean_8'
  | 'itf'
  | 'maxi_code'
  | 'micro_qr_code'
  | 'pdf417'
  | 'qr_code'
  | 'rm_qr_code'
  | 'upc_a'
  | 'upc_e'
  | 'linear_codes'
  | 'matrix_codes';
