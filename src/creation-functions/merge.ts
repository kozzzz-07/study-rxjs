import { of, merge } from "rxjs";

// 組み合わせ作成関数

merge(of("A", "B", "C"), of("X", "Y")).subscribe(console.log);
