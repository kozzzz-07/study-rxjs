import { map } from "rxjs/operators";
import { of } from "rxjs";

// 配列を受け取り各要素の値を更新する

interface Product {
  id: string;
  name: string;
  price: number;
}

const products: Product[] = [
  { id: "A-1", name: "A", price: 100 },
  { id: "B-1", name: "B", price: 200 },
  { id: "C-1", name: "C", price: 300 },
];

of(products)
  .pipe(
    map((products) =>
      products.map((product) => ({ ...product, price: product.price * 1.5 }))
    )
  )
  .subscribe((ret) => console.log(ret));
