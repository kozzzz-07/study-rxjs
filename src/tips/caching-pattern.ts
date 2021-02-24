import { shareReplay, tap } from "rxjs/operators";
import { Observable, of } from "rxjs";

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
}

const products: Product[] = [
  { id: 1, name: "A", price: 100 },
  { id: 2, name: "B", price: 200 },
  { id: 3, name: "C", price: 300 },
];

const product: Product = { id: 4, name: "D", price: 400 };

// Classic Pattern
class ClassicPatternService {
  private products: Product[] = [];

  getData(): Observable<Product[]> {
    if (this.products.length) {
      return of(this.products).pipe(
        tap((_) => {
          console.log("caching!");
        })
      );
    }
    return dummyHttpClient.get<Product[]>(products).pipe(
      tap((data) => (this.products = data)),
      tap((_) => {
        console.log("classic pattern: ", this.products);
      })
    );
  }
}

const classic = new ClassicPatternService();
classic.getData().subscribe();
classic.getData().subscribe(); // => caching!

// Declarative Pattern
class DeclarativePatternService {
  products$ = dummyHttpClient.get<Product[]>(products).pipe(
    tap((_) => {
      console.log("first time");
    }),
    shareReplay(1),
    tap((_) => {
      console.log("calling get() of DeclarativePatternService");
    })
  );
}

const declarative = new DeclarativePatternService();
declarative.products$.subscribe();
declarative.products$.subscribe(); // => first timeは表示されない
