import { Component, OnInit } from '@angular/core';
import { SmokeService } from '../_services/smoke.service';

@Component({
  selector: 'app-construction-page',
  templateUrl: './construction-page.component.html',
  styleUrls: ['./construction-page.component.scss']
})
export class ConstructionPageComponent implements OnInit {

  constructor(private _smokeService: SmokeService) { }

  ngOnInit() {
    this._smokeService.start();
  }

}
