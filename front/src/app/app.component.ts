
import {Component, ElementRef, OnInit, Renderer2, ViewChild} from '@angular/core';
import {MapCustomService} from "./map-custom.service";
import {Socket} from "ngx-socket-io";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})


export class AppComponent implements OnInit {
  @ViewChild('asGeoCoder') asGeoCoder: ElementRef;
  modeInput = 'start';
  wayPoints: WayPoints = { start: null, end: null};

  constructor(private mapCustomService:MapCustomService, private renderer2: Renderer2){
    
  }

  ngOnInit(): void {
    this.mapCustomService.buildMap()
      .then(({geocoder, map}) => {
        // this.asGeoCoder
        this.renderer2.appendChild(this.asGeoCoder.nativeElement,
          geocoder.onAdd(map)
        );


        console.log('*** TODO BIEN *****');
      })
      .catch((err) => {
        console.log('******* ERROR ******', err);
      });

    this.mapCustomService.cbAddress.subscribe((getPoint) => {
      if (this.modeInput === 'start') {
        this.wayPoints.start = getPoint;
      }
      if (this.modeInput === 'end') {
        this.wayPoints.end = getPoint;
      }
    });
}

drawRoute(): void {
  console.log('***** PUNTOS de ORIGEN y DESTINO', this.wayPoints)
  const coords = [
    this.wayPoints.start.center,
    this.wayPoints.end.center
  ];

  this.mapCustomService.loadCoords(coords);
}

changeMode(mode: string): void {
  this.modeInput = mode;
}
}

export class WayPoints {
    start:any;
    end: any;
}