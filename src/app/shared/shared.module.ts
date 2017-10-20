import { NgModule } from "@angular/core";

import { ShortenStringLength } from "app/shared/shorten-length.pipe";
import { titlePipe } from "app/shared/title.pipe";
import { OnlyNumber } from "app/shared/numbersonly.directive";

@NgModule({
    declarations:[
        ShortenStringLength,
        titlePipe,
        OnlyNumber
    ],
    exports: [
        ShortenStringLength,
        titlePipe,
        OnlyNumber
    ]
})
export class RepSharedModule{

}