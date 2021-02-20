import { of } from "rxjs";
import { filter } from "rxjs/operators";

of(1, 2, 1)
  .pipe(filter((item) => item === 1))
  .subscribe(console.log);
