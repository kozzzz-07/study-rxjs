import { of } from "rxjs";
import { map, tap } from "rxjs/operators";

// ストリームに影響を与えない操作を実行する
// デバッグとデータフロー外のアクションに使用する

of(2, 4, 6)
  .pipe(
    tap((item) => console.log(item)),
    map((item) => item * 2),
    tap((item) => console.log(item)),
    map((item) => item - 3),
    tap((item) => console.log(item)),
    tap((_) => console.log("----"))
  )
  .subscribe();
