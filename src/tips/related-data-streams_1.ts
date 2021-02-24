import { map, shareReplay, tap } from "rxjs/operators";

// Get It All Pattern
// 関連するデータセットから全てのデータを取得し、表示の必要に応じてデータセット内の関連するアイテムを検索する

// id:1の商品が選択して、それに関連するサプライヤーの一覧を取得する っていう想定

import { BehaviorSubject, combineLatest, Observable, of } from "rxjs";

const get = function get<T = any>(arg: any): Observable<T> {
  return of(arg);
};
const dummyHttpClient = {
  get,
};

interface Product {
  id: number;
  name: string;
  price: number;
  supplierIds: number[];
}

const products: Product[] = [
  { id: 1, name: "A", price: 100, supplierIds: [1, 2] },
  { id: 2, name: "B", price: 200, supplierIds: [3] },
  { id: 3, name: "C", price: 300, supplierIds: [] },
];

interface Supplier {
  id: number;
  name: string;
  cost: number;
}

const Suppliers: Supplier[] = [
  { id: 1, name: "XX", cost: 1000 },
  { id: 2, name: "BBB", cost: 5000 },
  { id: 3, name: "ZZ", cost: 3000 },
];

class SupplierService {
  suppliers$ = dummyHttpClient.get<Supplier[]>(Suppliers).pipe(
    // tap((data) => console.log(data)),
    shareReplay(1)
  );
}

const supplierService = new SupplierService();

class ProductService {
  products$ = of(products);

  private productSelectedSubject = new BehaviorSubject<number>(0);

  productSelectedAction$ = this.productSelectedSubject.asObservable();

  selectedProduct$ = combineLatest([
    this.products$,
    this.productSelectedAction$,
  ]).pipe(
    map(([products, selectedProductId]) =>
      products.find((product) => product.id === selectedProductId)
    )
  );

  selectedProductChanged(id: number): void {
    this.productSelectedSubject.next(id);
  }

  //
  selectedProductSupplliers$ = combineLatest([
    this.selectedProduct$,
    supplierService.suppliers$,
  ]).pipe(
    map(([selectedProduct, suppliers]) =>
      suppliers.filter((supplier) =>
        selectedProduct?.supplierIds.includes(supplier.id)
      )
    )
  );
}

const productService = new ProductService();
productService.selectedProductSupplliers$.subscribe((ret) => console.log(ret));

// id:1の商品が選択された
productService.selectedProductChanged(1);

/** 
結果：

（BehaviorSubject<number>(0)の結果）
[]

(id:1を選択された結果)
[
  { id: 1, name: 'XX', cost: 1000 },
  { id: 2, name: 'BBB', cost: 5000 }
]

*/
