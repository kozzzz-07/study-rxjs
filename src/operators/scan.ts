import { of } from "rxjs";
import { scan } from "rxjs/operators";
// array reduce() みたいな感じ
// 中間結果も出力される

of(1, 2, 3)
  .pipe(scan((acc, curr) => acc + curr))
  .subscribe(console.log); // => 1 3 6
