import { Component, OnInit } from '@angular/core';
import { Observable, filter, from, map, of, switchMap, tap } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'RxJSTest';

  observable1 = from([1, 2, 3, 4]);

  ngOnInit(): void {
    //test map
    console.log('test map');
    this.observable1
      .pipe(
        map((value) => {
          if (value == 4) {
            return 'Changed value: ' + value * 2 + 'is changed';
          }

          return 'Changed value: ' + value + 'is changed';
        })
      )
      .subscribe((value) => {
        console.log('Data is:', value);
      });

      console.log('tapped test');
      //test tap
      this.observable1
      .pipe(
        tap((value) => {
          console.log('tapped value: ', value)
        }
      ),
      map((value) => {
        return value + 5;
      }),
      tap((value)=> {
        console.log('tapped value changed: ', value)
      }))
      .subscribe((value) => {
        console.log('Data is:', value);
      });
     

    //test switch map
    console.log('test switch map');
    this.observable1
      .pipe(
        switchMap((value) => {
          if (value == 4) {
            return this.combinedMessage(value);
          }

          return '';
        })
      )
      .subscribe((value) => {
        if (value != '') console.log('Data is:', value);
      });

      //test switch map with switch
    console.log('test for map and switch map combined 2');
    this.observable1
      .pipe(
        map((value: number) => {
          if (value == 4) {
            return value * 2;
          }

          return 0;
        }),
        switchMap((val: number) => {
          if (val != 0) {
            return this.combinedMessage(val);
          }

          return '';
        })
      )
      .subscribe((test) => {
        console.log(test);
      });

      //test filter
      console.log('test for filter')

      this.observable1.pipe(filter(value => {
        return value == 4;
      }))
      .subscribe(data => {
        console.log(data);
      })

      //test filter and map
      console.log('test for filter and map')

      this.observable1.pipe(filter(value => {
        return value == 4;
      }),
      map((filteredValue :number) => {
        return filteredValue * 3;
      }))
      .subscribe(data => {
        console.log(data);
      })
  }
  combinedMessage(num: Number): Observable<string> {
    return of('Sada vracam ' + num);
  }
}
