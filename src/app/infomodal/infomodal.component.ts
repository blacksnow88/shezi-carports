import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-infomodal',
  templateUrl: './infomodal.component.html',
  styleUrls: ['./infomodal.component.scss']
})
export class InfomodalComponent implements OnInit {

  btnTitle: string;
  title: string;
  body: string;
  
  constructor() { }

  ngOnInit() {
  }

}
