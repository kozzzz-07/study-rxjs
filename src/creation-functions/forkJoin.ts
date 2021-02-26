import { map, take } from "rxjs/operators";
import { forkJoin, interval } from "rxjs";

// Observablesが完了するのを待ってから、それらが発行した最後の値を結合する

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
====================
--------4Cb------->
[ 4, 'C', 'b' ]

*/
