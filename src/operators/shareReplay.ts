import { shareReplay, take, tap } from "rxjs/operators";
import { BehaviorSubject, of, combineLatest } from "rxjs";

// データをキャッシュする
const numbers = [1, 2, 3];

const numbers$ = of(numbers).pipe(tap(() => console.log("I'm numbers!!")));

const productSelectedSubject = new BehaviorSubject<number>(0);
const productSelectedAction$ = productSelectedSubject.asObservable();

combineLatest([numbers$, productSelectedAction$])
  .pipe(take(3), shareReplay(1))
  .subscribe((ret) => console.log(ret));

// nextでI'm numbers!! は出力されない
productSelectedSubject.next(1);
productSelectedSubject.next(5);
productSelectedSubject.next(10);

/*
結果：

I'm numbers!!
[ [ 1, 2, 3 ], 0 ]
[ [ 1, 2, 3 ], 1 ]
[ [ 1, 2, 3 ], 5 ]

*/
