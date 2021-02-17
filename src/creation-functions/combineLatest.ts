import { map, take } from "rxjs/operators";
import { combineLatest, interval } from "rxjs";

const a$ = interval(50).pipe(take(5));

const b$ = interval(100).pipe(
  take(3),
  map((i) => "ABC"[i])
);

const c$ = interval(150).pipe(
  take(2),
  map((i) => "ab"[i])
);

combineLatest([a$, b$, c$]).subscribe((ret) => {
  console.log(ret);
});

/**
結果：

a$) 01234--------->
b$) -A-B-C-------->
c$) --a--b-------->

------------------>
[ 1, 'A', 'a' ]
[ 2, 'A', 'a' ]
[ 2, 'B', 'a' ]
[ 3, 'B', 'a' ]
[ 4, 'B', 'a' ]
[ 4, 'B', 'b' ]
[ 4, 'C', 'b' ]

*/
