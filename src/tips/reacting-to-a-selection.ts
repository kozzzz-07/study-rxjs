import { combineLatest, EMPTY, of, Subject } from "rxjs";
import { BehaviorSubject } from "rxjs";
import { catchError, map, tap } from "rxjs/operators";

// 商品のリストコンポーネントから商品を選択して詳細のコンポーネントに値が流れる　って感じのシナリオ (Angularを意識している)
// 詳細は Service の selectedProduct$ を監視している

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

  private productSelectedSubject = new BehaviorSubject<number>(0);

  // 初回流す必要がないならこっち
  // private productSelectedSubject = new Subject<number>();
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
}

const service = new Service();

class ProductList {
  onSelected(id: number) {
    service.selectedProductChanged(id);
  }
}

class ProductDetail {
  private errorSubject = new Subject<string>();
  errorMessage$ = this.errorSubject.asObservable();

  product$ = service.selectedProduct$.pipe(
    // 初回 undefined
    tap((ret) => console.log("ProductDetail: ", ret)),
    // Reacting to an Error
    // (Angular) OnPushを使用しているとき、ローカルの値変更では検知されないので、エラーのストリームを使用する
    catchError((err) => {
      this.errorSubject.next(err);
      return EMPTY;
    })
  );

  constructor() {
    this.product$.subscribe();
  }
}

const productList = new ProductList();

const productDetail = new ProductDetail();

// リストから商品が選択されたっていう想定
productList.onSelected(1);
productList.onSelected(3);
