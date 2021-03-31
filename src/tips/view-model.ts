import { combineLatest, of } from "rxjs";
import { filter, map } from "rxjs/operators";

const numbers$ = of([1, 2, 3]);
const person$ = of({name: 'aaa', age: 22});
const abc$ = of('abc');

const vm$ = combineLatest([
  numbers$,
  person$,
  abc$
])
  .pipe(
    filter(([numbers, person, abc]) => Boolean(abc)), // 必須チェック例
    map(([numbers, person, abc]) =>
      ({ numbers, person, abc })) // vmとしてまとめ上げる
  );

vm$.subscribe(vm => console.log(vm)); // => { numbers: [ 1, 2, 3 ], person: { name: 'aaa', age: 22 }, abc: 'abc' }
