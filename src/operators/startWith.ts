import { of } from "rxjs";
import { startWith } from "rxjs/operators";

// デフォルト値が必要な場合などで使用する
of(1, 2, 3).pipe(startWith(10)).subscribe(console.log); // =>c 10 1 2 3
