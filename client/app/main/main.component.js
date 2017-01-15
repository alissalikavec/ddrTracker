import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { SocketService } from '../../components/socket/socket.service';

@Component({
  selector: 'main',
  template: require('./main.html'),
  styles: [require('./main.scss')],
})
export class MainComponent {
  Http;

  awesomeThings = [];
  newThing = '';

  static parameters = [Http, SocketService];
  constructor(_Http_) {
    this.Http = _Http_;
  }

  ngOnInit() {
    this.Http.get('/api/things')
      .map(res => res.json())
      .catch(err => Observable.throw(err.json().error || 'Server error'))
      .subscribe(things => {
        this.awesomeThings = things;
      });
  }


  addThing() {
    if(this.newThing) {
      this.Http.post('/api/things', { name: this.newThing });
      this.newThing = '';
    }
  }

  deleteThing(thing) {
    this.$http.delete(`/api/things/${thing._id}`);
  }
}
