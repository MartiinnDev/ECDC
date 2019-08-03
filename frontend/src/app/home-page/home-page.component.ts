import { Component, OnInit } from '@angular/core';
import { SmokeService } from '../_services/smoke.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {

  constructor(private _smokeService: SmokeService) { }

  ngOnInit() {
    this._smokeService.start()
  }

}
