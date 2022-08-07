import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'time'
})
export class TimePipe implements PipeTransform {
    transform(value: string) {
        let hours;
        let mins;
        if (value?.length > 4) {
            hours = `${value.charAt(0)}${value.charAt(1)}`;
            mins = `:${value.charAt(3)}${value.charAt(4)}`;
        } else {
            hours = `${value.charAt(0)}`;
            mins = `:${value.charAt(2)}${value.charAt(3)}`;
        }
        return `${hours}${mins}`;
    }
}