import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
    name: "rpShortenLength"
})
export class ShortenStringLength implements PipeTransform{
    transform(value: string, strLength: number, textToAppend: string){
        if(value && (value.length > strLength)){
            return textToAppend ? `${value.substring(0, strLength)} (${textToAppend})...` : `${value.substring(0, strLength)}...`;
        }
        return value;
    }

}