import { Observable, of } from "rxjs";
import { map } from "rxjs/operators";

// mapping しない アンチパターン
// ネストされたObservableを購読する

of(5, 10) // Outer Observable or Source Observable
  .pipe(
    map((id) => of(id * 10)) // Inner Observable
  )
  .subscribe((o: Observable<number>) => {
    o.subscribe((ret) => console.log(ret)); // 管理が煩雑（購読解除やエラー処理など）
  });

// アンチパターンを解決した mapping パターン
const xxxMap: any = (arg: any) => {
  return of(arg);
};

of(5, 10) // Outer Observable or Source Observable
  .pipe(
    // Higher-order mapping operator
    xxxMap(
      (
        id: number // Item emitted from outer Observable
      ) => {
        return of(id * 10); // Inner Observable
      }
    )
  )
  .subscribe(); // flat化されたアイテムが放出される
