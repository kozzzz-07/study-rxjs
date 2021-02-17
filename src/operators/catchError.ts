// エラー処理演算子

// Catch and Replace パターン
// エラーキャッチして、エラーのあるオブザーバブルを新しいオブザーバブルに置き換える

// Catch and Rethrow パターン
// キャッチして再スローする

import { of } from "rxjs";
import { catchError, tap } from "rxjs/operators";

// Catch and Replace

// example:
// catchError(err => { errMsg = err; return EMPTY; })

of(1, 2, 3)
  .pipe(
    tap((_) => {
      throw new Error("error");
    }),
    catchError((err) => {
      console.log("catchError: " + err);
      // エラーが発生した場合に、デフォルト値やローカルデータを返して続行する
      return of(0);
    })
  )
  .subscribe(
    (item) => {
      // catchErrorの中で0を返すのでerrの方には入っていかない
      console.log(item);
    },
    (err) => {
      console.log("err!: " + err);
    }
  );
