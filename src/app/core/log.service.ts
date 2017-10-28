import { Injectable } from "@angular/core";

@Injectable()
export class LogService{
    logError(errMessage: String){
        console.log(errMessage);
    }
}