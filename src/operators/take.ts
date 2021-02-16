// 指定された数のアイテムを放出する
// ストリームから指定された数のアイテムを取得し、ストリームを制限する
// 取得したらtakeはobservableからサブスクライブを解除する
// フィルタリング演算子

import { of } from "rxjs";
import { map, take, tap } from "rxjs/operators";

of(2, 4, 6)
  .pipe(
    tap((item) => console.log(item)),
    map((item) => item * 2),
    // 最初の2つ目まで取得
    take(2),
    map((item) => item - 3),
    tap((item) => console.log(item))
  )
  .subscribe();
