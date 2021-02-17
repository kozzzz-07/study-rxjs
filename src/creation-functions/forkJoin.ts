import { map, take } from "rxjs/operators";
import { forkJoin, interval } from "rxjs";

const a$ = interval(50).pipe(take(5));

const b$ = interval(100).pipe(
  take(3),
  map((i) => "ABC"[i])
);

const c$ = interval(150).pipe(
  take(2),
  map((i) => "ab"[i])
);

forkJoin([a$, b$, c$]).subscribe((ret) => {
  console.log(ret);
});

/**
結果：

a$) 01234--------->
b$) -A-B-C-------->
c$) --a--b-------->

------------------>
[ 4, 'C', 'b' ]

*/
