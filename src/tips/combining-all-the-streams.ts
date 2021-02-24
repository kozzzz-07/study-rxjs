import { filter, map } from "rxjs/operators";
import { combineLatest, Observable, of } from "rxjs";

// ストリームをまとめ上げる
// Angularで複数のストリームが存在するコンポーネントでasync pipeを利用するときとか便利

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

const products$ = of(products);
const suppliers$ = of(suppliers);
const hoge$ = of("hoge");

const vm$ = combineLatest([products$, suppliers$, hoge$]).pipe(
  filter(([products]) => Boolean(products)), // 検査をかける場合
  map(([products, suppliers, hoge]) => ({ products, suppliers, hoge }))
);

vm$.subscribe((ret) => console.log(ret));

/** 
結果：

{
  products: [
    { id: 1, name: 'A', price: 100, supplierIds: [Array] },
    { id: 2, name: 'B', price: 200, supplierIds: [Array] },
    { id: 3, name: 'C', price: 300, supplierIds: [] }
  ],
  suppliers: [
    { id: 1, name: 'XX', cost: 1000 },
    { id: 2, name: 'BBB', cost: 5000 },
    { id: 3, name: 'ZZ', cost: 3000 }
  ],
  hoge: 'hoge'
}

*/
