import { of } from "rxjs";
import { mergeMap } from "rxjs/operators";

const get = function get(id: number) {
  return of(products.find((product) => product.id === id));
};
const dummyHttpClient = {
  get,
};

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

of(1, 2)
  .pipe(
    mergeMap((id) => dummyHttpClient.get(id)) // 並列にgetの結果を待つ
  )
  .subscribe(console.log); // (id)1,2の順番は保証されずに出力される (id:1が遅かったら 2,1の順番になる)
