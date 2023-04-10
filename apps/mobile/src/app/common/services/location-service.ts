import { ILocationData } from '../../modules/location/location.branch';

interface IWithCoords {
  coords: number[];
}

export class LocationService {
  private readonly coords: [number, number];

  constructor({ latitude, longitude }: ILocationData) {
    this.coords = [latitude, longitude];
  }

  public calculateDistance(shopCoords: number[], formatToText = true) {
    const userLocation = this.coords.map(this.transformToRad);
    const shopLocation = shopCoords.map(this.transformToRad);
    const R = 6371;

    const cosD =
      Math.sin(userLocation[0]) * Math.sin(shopLocation[0]) +
      Math.cos(userLocation[0]) *
        Math.cos(shopLocation[0]) *
        Math.cos(userLocation[1] - shopLocation[1]);

    const distance = Math.acos(cosD) * R;

    return formatToText ? this.formatDistance(distance) : distance;
  }

  public sortByDistance<Item extends IWithCoords>(a: Item, b: Item) {
    const aDistance = this.calculateDistance(a.coords, false);
    const bDistance = this.calculateDistance(b.coords, false);

    if (aDistance < bDistance) {
      return -1;
    }

    if (aDistance > bDistance) {
      return 1;
    }

    return 0;
  }

  private formatDistance(distance: number) {
    return `${distance.toFixed(1).replace('.', ',')} км`;
  }

  private transformToRad(deg: number) {
    return (deg * Math.PI) / 180;
  }
}
