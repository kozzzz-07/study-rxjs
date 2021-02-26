import { map, take } from "rxjs/operators";
import { of, merge, interval } from "rxjs";

// 組み合わせ作成関数

const a$ = interval(50).pipe(
  take(3),
  map((i) => "ABC"[i])
);

const b$ = interval(100).pipe(
  take(2),
  map((i) => "XY"[i])
);

merge(a$, b$).subscribe(console.log);

/**
結果：

a$) ABC--------->
b$) -X-Y-------->
==================
----AXBCY-------->

A
X
B
C
Y

*/
