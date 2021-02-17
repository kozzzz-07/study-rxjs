// エラー処理演算子

// Catch and Replace パターン
// エラーキャッチして、エラーのあるオブザーバブルを新しいオブザーバブルに置き換える

// Catch and Rethrow パターン
// キャッチして再スローする

import { EMPTY, of, throwError } from "rxjs";
import { catchError, tap } from "rxjs/operators";

// Catch and Rethrow

// example:
// catchError(err => throwError(err))

// errorMessageを作成しthrowErrorを使用してエラーを伝播させる
const handleError = (err: any) => {
  // エラーをキャッチしたらログに出すことを推奨（原因特定の手がかり）
  console.error(err);

  let errorMessage = "";

  // if (err.error instanceof ErrorEvent) {
  if (err.error) {
    errorMessage = `An error occurred ${err.error.message}`;
  } else {
    errorMessage = `${err}!!!`;
  }

  // 再スロー、ここで返すエラーはユーザーフレンドリーなエラーを返すことを推奨（そのまま出さずに変換をかける）
  return throwError(errorMessage);
};

// Catch and Rethrow
const ob$ = of(1, 2, 3).pipe(
  tap((_) => {
    throw new Error("error");
  }),
  catchError(handleError)
);

ob$
  .pipe(
    catchError((err) => {
      console.log(err); // => error!!!
      return EMPTY; // 何も発行しない
    })
  )
  .subscribe();
