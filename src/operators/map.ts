import { of } from "rxjs";
import { map } from "rxjs/operators";

of(2, 4, 6)
  .pipe(
    map((item) => item * 2),
    map((item) => item - 3)
  )
  .subscribe(console.log);
