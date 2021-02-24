import { of } from "rxjs";
import { concatMap } from "rxjs/operators";

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
    concatMap((id) => dummyHttpClient.get(id)) // 順番にgetの結果を待つ
  )
  .subscribe(console.log); // (id)1,2の順番に出力される
