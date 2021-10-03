import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {Location, Appearance, GermanAddress} from '@angular-material-extensions/google-maps-autocomplete';
import PlaceResult = google.maps.places.PlaceResult;
import {Title} from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  public appearance = Appearance;
  public zoom = 0;
  public latitudeDep = 0;
  public longitudeDep = 0;
  public latitudeDest = 0;
  public longitudeDest = 0;
  public distance = "";
  constructor(private titleService: Title) {

  }

  ngOnInit() {
    this.titleService.setTitle('Home | @angular-material-extensions/google-maps-autocomplete');
    this.zoom = 10;
    this.latitudeDest = 52.520008;
    this.longitudeDest = 13.404954;
    this.latitudeDep = 52.520008;
    this.longitudeDep = 13.404954;
    this.setCurrentPosition();

  }

  private setCurrentPosition() {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.latitudeDest = position.coords.latitude;
        this.longitudeDest = position.coords.longitude;

        this.latitudeDep = position.coords.latitude;
        this.longitudeDep = position.coords.longitude;

        this.zoom = 12;
      });
    }
  }

  onAutocompleteSelected(result: PlaceResult) {
    console.log('onAutocompleteSelected: ', result);
  }

  onLocationSelectedDepart(location: Location) {
    console.log('onLocationSelected: ', location);
    this.latitudeDep = location.latitude;
    this.longitudeDep = location.longitude;

  }

  onLocationSelectedDestination(location: Location) {
    console.log('onLocationSelected: ', location);
    this.latitudeDest = location.latitude;
    this.longitudeDest = location.longitude;
    this.distance = this.calculdistance(this.latitudeDep, this.longitudeDep, this.latitudeDest, this.longitudeDest, "k") + " KM";

  }

  onGermanAddressMapped($event: GermanAddress) {
    console.log('onGermanAddressMapped', $event);
  }

  private calculdistance(lat1: number, lon1: number, lat2: number, lon2: number, unit: string) {
    if ((lat1 == lat2) && (lon1 == lon2)) {
      return 0;
    } else {

      var R = 6371; // km
      var dLat = this.toRad(lat2 - lat1);
      var dLon = this.toRad(lon2 - lon1);
      var lat1 = this.toRad(lat1);
      var lat2 = this.toRad(lat2);

      var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.sin(dLon / 2) * Math.sin(dLon / 2) * Math.cos(lat1) * Math.cos(lat2);
      var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
      var d = R * c;
      return Math.round(d * 100) / 100;
    }
  }

  private toRad(Value: number) {
    return Value * Math.PI / 180;
  }
}
