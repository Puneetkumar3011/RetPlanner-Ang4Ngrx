import { Pipe, PipeTransform } from "@angular/core"; 

@Pipe({
    name: "rpTitle"
})
export class titlePipe implements PipeTransform{
    transform(value: string){
        if(value && value.length > 0){
            let arrValue = value.split(" ");
            let newValueArr = [];
            arrValue.forEach(element => {
                newValueArr.push(element[0].toUpperCase() + element.slice(1));
            });
            return newValueArr.join(" ");
        }
        return null;
    }

}