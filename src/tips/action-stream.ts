import { combineLatest, of, Subject } from "rxjs";
import { map } from "rxjs/operators";

// action Stream を利用したリアクティブなストリーム

// Subject (BehaviorSubject) のインスタンスを生成してaction Streamを定義する
const subject$ = new Subject<number>();
// asObservableでオブザーバブルを作成する
const action$ = subject$.asObservable();

// data Stream
// 通常はhttpで取得したデータなど
const data$ = of([1, 2, 3]);

// action Streamとdata Stream組み合わせて、アクションが発生する度にアイテムを発行する
const example$ = combineLatest([data$, action$]).pipe(
  map(([numbers, id]) =>
    numbers.filter((number) => (id ? number === id : true))
  )
);

example$.subscribe(console.log);

// subjectはオブザーバーなのでnext, error, completeを呼べる
// nextを使用してアクションストリームにアイテムを流す
// データストリームがactonに反応できる
subject$.next(1);
