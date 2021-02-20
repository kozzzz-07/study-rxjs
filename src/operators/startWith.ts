import { of } from "rxjs";
import { startWith } from "rxjs/operators";

// 初期値を提供する演算子
// Initial Valueが欲しい場合はBehaviorSubjectも候補になる

// デフォルト値が必要な場合などで使用する
of(1, 2, 3).pipe(startWith(10)).subscribe(console.log); // =>c 10 1 2 3
