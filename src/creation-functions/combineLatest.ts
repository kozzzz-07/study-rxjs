import { map, take } from "rxjs/operators";
import { combineLatest, interval } from "rxjs";

// 全て放出されてからの、最新の組み合わせ

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
====================
----0--------------> ×
----0A-------------> ×
----1A-------------> ×
----1Aa------------> ◎
----2Aa------------> ◎
...

[ 1, 'A', 'a' ]
[ 2, 'A', 'a' ]
[ 2, 'B', 'a' ]
[ 3, 'B', 'a' ]
[ 4, 'B', 'a' ]
[ 4, 'B', 'b' ]
[ 4, 'C', 'b' ]

*/
