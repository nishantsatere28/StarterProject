import { Pipe } from '@angular/core';

@Pipe({
  name: 'AgePipe',
//   standalone: true,
})
export class AgePipe  {
  transform(value: number | undefined): string {
    return `${value} years old`;
  }
}
