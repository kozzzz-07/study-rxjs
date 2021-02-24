import { merge, of, Subject } from "rxjs";
import { scan, tap } from "rxjs/operators";

// 商品のリストコンポーネントから商品を追加して、追加されたデータのストリームが流れる　って感じのシナリオ (Angularを意識している)

interface Product {
  id: number;
  name: string;
  price: number;
}

const products: Product[] = [
  { id: 1, name: "A", price: 100 },
  { id: 2, name: "B", price: 200 },
  { id: 3, name: "C", price: 300 },
];

class Service {
  products$ = of(products);

  productInsertedSubject = new Subject<Product>();
  productInsertedAction$ = this.productInsertedSubject.asObservable();

  productsWithAdd$ = merge(this.products$, this.productInsertedAction$).pipe(
    // TODO: 型定義をうまくやりたい。Product[]を返すを明示したい。
    scan((acc: any, value) => {
      return [...acc, value] as Product[];
    }),
    tap((ret) => console.log("productsWithAdd: ", ret))
  );

  addProduct(newProduct: Product): void {
    this.productInsertedSubject.next(newProduct);
  }
}

const service = new Service();

class ProductList {
  onAdd(newProduct: Product): void {
    service.addProduct(newProduct);
  }
}

const productList = new ProductList();

service.productsWithAdd$.subscribe();

// 商品が追加されたのを想定
const product: Product = { id: 4, name: "D", price: 400 };
productList.onAdd(product);

/**
結果：

productsWithAdd:  [
  { id: 1, name: 'A', price: 100 },
  { id: 2, name: 'B', price: 200 },
  { id: 3, name: 'C', price: 300 }
]

productsWithAdd:  [
  { id: 1, name: 'A', price: 100 },
  { id: 2, name: 'B', price: 200 },
  { id: 3, name: 'C', price: 300 },
  { id: 4, name: 'D', price: 400 }
]

 */
