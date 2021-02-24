import { of } from "rxjs";
import { switchMap } from "rxjs/operators";

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
    switchMap((id) => dummyHttpClient.get(id)) // ※1
  )
  .subscribe(console.log); // id:1の結果が出力されることが保証されない（id:1の処理が遅ければキャンセルされid:2のみが出力される）

// ※1: id:1 が発行されると、内部で新しいオブザーバブルが作成される
// id:2 が発行されると、さらに内部で新しいオブザーバブルが作成され、以前のオブザーバブルからサブスクライブは解除され、新しいオブザーバブルにサブスクライブする
// id:1 が出力される前に解除される可能性がある
