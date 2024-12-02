import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-test-purpose',
  templateUrl: './test-purpose.page.html',
  styleUrls: ['./test-purpose.page.scss'],
})
export class TestPurposePage implements OnInit {
  content: boolean = true;
  constructor() { }

  ngOnInit() {
  }

  // test() {
  //   this.content = false;
  //   setTimeout(() => {
  //     let box1 = document.getElementById('top');
  //     let box2 = document.getElementById('bottom');
  //     let box3 = document.getElementById('wlcm')
  //     let box4 = document.getElementById('roundLogo');
  //     const credentials = document.querySelectorAll('.credentials');

  //     box1.style.height = '42%';
  //     box2.style.height = '65%';
  //     box3.style.color = '#DA107E';
  //     box4.style.width = '38%';

  //     credentials.forEach((credential) => {
  //       credential.classList.add('transition');
  //     });
  //   }, 500);
  // }

  test() {
    this.content = false;
    setTimeout(() => {
      let box1 = document.getElementById('top');
      let box2 = document.getElementById('bottom');
      let box3 = document.getElementById('wlcm');
      let box4 = document.getElementById('roundLogo');
      const credentials1 = document.getElementById('credentials1');
      const credentials2 = document.getElementById('credentials2');
      const farrow = document.querySelector('.farrow');

      box1.style.height = '42%';
      box2.style.height = '65%';
      box3.style.color = '#DA107E';
      box4.style.width = '34%';

      setTimeout(() => {
        credentials1.classList.add('show');
        setTimeout(() => {
          credentials2.classList.add('show');
          setTimeout(() => {
            farrow.classList.add('show');
          }, 500);
        }, 500);
      }, 500);
    }, 500);
  }
}
