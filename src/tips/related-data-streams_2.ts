import { BehaviorSubject, combineLatest, from, Observable, of } from "rxjs";
import {
  filter,
  map,
  mergeMap,
  shareReplay,
  switchMap,
  toArray,
} from "rxjs/operators";

// Just In Time Pattern

// id:1の商品が選択して、それに関連するサプライヤーの一覧を取得する っていう想定

const get = function get<T = any>(arg: any): Observable<T> {
  return of(arg);
};

const getSupplier = function getSupplier(id: number) {
  return of(suppliers.find((supplier) => supplier.id === id));
};

const dummyHttpClient = {
  get,
  getSupplier,
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

const suppliers: Supplier[] = [
  { id: 1, name: "XX", cost: 1000 },
  { id: 2, name: "BBB", cost: 5000 },
  { id: 3, name: "ZZ", cost: 3000 },
];

class SupplierService {
  suppliers$ = dummyHttpClient.get<Supplier[]>(suppliers).pipe(
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
  selectedProductSupplliers$ = this.selectedProduct$.pipe(
    filter((selectedProduct) => Boolean(selectedProduct)), // 初回の処理が走らない
    switchMap((selectedProduct) =>
      from(selectedProduct!.supplierIds).pipe(
        mergeMap((supplierId) => dummyHttpClient.getSupplier(supplierId)),
        toArray() // 全ての内部オブザーバブルが終了するのを待ってから配列を発行する
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

[
  { id: 1, name: 'XX', cost: 1000 },
  { id: 2, name: 'BBB', cost: 5000 }
]

 */
