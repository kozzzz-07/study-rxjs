import { combineLatest, of } from "rxjs";
import { map } from "rxjs/operators";

interface Product {
  id: string;
  name: string;
  price: number;
}

interface ProductCategory {
  id: string;
  name: string;
  description?: string;
}

interface ProductsWithCategory extends Product {
  category: string;
}

const products: Product[] = [
  { id: "A-1", name: "A", price: 100 },
  { id: "B-1", name: "B", price: 200 },
  { id: "C-1", name: "C", price: 300 },
];

const productCategoies: ProductCategory[] = [
  { id: "A-1", name: "BIG" },
  { id: "B-1", name: "SMALL" },
  { id: "C-1", name: "NORMAL" },
];

const productsWithCategory$ = combineLatest([
  of(products), // プライマリデータストリーム
  of(productCategoies), // ルックアップストリーム
]).pipe(
  map(([products, categoies]) =>
    products.map(
      (product) =>
        ({
          ...product,
          category: categoies.find((c) => product.id === c.id)?.name, // 文字列をルックアップ
        } as ProductsWithCategory)
    )
  )
);

productsWithCategory$.subscribe((ret) => console.log(ret));
