import { map, take, withLatestFrom } from "rxjs/operators";
import { interval } from "rxjs";

const a$ = interval(50).pipe(take(5));

const b$ = interval(100).pipe(
  take(3),
  map((i) => "ABC"[i])
);

const c$ = interval(150).pipe(
  take(2),
  map((i) => "ab"[i])
);

// a$がsource stream
// 全てのストリームが少なくとも１つ放出されるまで放出されず、かつソースストリームが放出される時のみに放出される

a$.pipe(withLatestFrom(b$, c$)).subscribe((ret) => {
  console.log(ret);
});

/**
結果：

a$) 01234--------->
b$) -A-B-C-------->
c$) --a--b-------->

------------------>

[ 2, 'A', 'a' ]
[ 3, 'B', 'a' ]
[ 4, 'B', 'a' ]

> 流れ:
0が来たタイミングではb＄とc$はまだemitされていない
1が来たタイミングでc$がまだemitされていない
2が来たタイミングで[2,A,a]がcombineされた値がemitされる
3が来たタイミングで[3,B,a]がcombineされた値がemitされる
4が来たタイミングで[4,B,a]がcombineされた値がemitされる

*/
