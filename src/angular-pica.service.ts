import * as pica from "pica/dist/pica.js";// TODO: replace by "pica" when https://github.com/nodeca/pica/pull/109

declare var window: any;

export interface resizeOptions {
  quality?: number;
  alpha?: boolean;
  unsharpAmount?: number;
  unsharpRadius?: number;
  unsharpThreshold?: number;
}

export interface resizeBufferOptions {
  src: Uint8Array;
  width: number;
  height: number;
  toWidth: number;
  toHeight: number;
  quality?: number;
  alpha?: boolean;
  unsharpAmount?: number;
  unsharpRadius?: number;
  unsharpThreshold?: number;
}

export default class {
  resizer: any
  constructor (
    private $q: angular.IQService
  ) {
    "ngInject";
    this.resizer = pica();
  }

  public resize(from: HTMLCanvasElement, to: HTMLCanvasElement, options?: resizeOptions): angular.IPromise<HTMLCanvasElement> {
    let deferred: angular.IDeferred<HTMLCanvasElement> = this.$q.defer();
    this.resizer.resize(from, to, options).then((to) => {
      deferred.resolve(to);
    }, (error) => {
      deferred.reject(error);
    });
    return deferred.promise;
  }

  public resizeBuffer(options: resizeBufferOptions): angular.IPromise<Uint8Array> {
    let deferred: angular.IDeferred<Uint8Array> = this.$q.defer();
    this.resizer.resizeBuffer(options).then((output) => {
      deferred.resolve(output);
    }, (error) => {
      deferred.reject(error);
    });
    return deferred.promise;
  }
}