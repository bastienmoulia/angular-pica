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

interface canvasToResize {
  from: HTMLCanvasElement;
  to: HTMLCanvasElement;
  options?: resizeOptions;
}

export default class {
  startProcess: boolean;
  constructor (
    private $q: angular.IQService
  ) {
    "ngInject";
    this.startProcess = false;
  }

  public resize(from: HTMLCanvasElement, to: HTMLCanvasElement, options?: resizeOptions): angular.IPromise<HTMLCanvasElement> {
    let deferred: angular.IDeferred<HTMLCanvasElement> = this.$q.defer();
    let resizer = new pica();
    resizer.resize(from, to, options).then((newCanvas) => {
      deferred.resolve(newCanvas);
    }, (error) => {
      deferred.reject(error);
    });
    return deferred.promise;
  }

  public resizeAsync(from: HTMLCanvasElement, to: HTMLCanvasElement, options?: resizeOptions): angular.IPromise<HTMLCanvasElement> {
    let deferred: angular.IDeferred<HTMLCanvasElement> = this.$q.defer();
    if (!this.startProcess) {
      this.startProcess = true;
      this.resize(from, to, options).then((newCanvas) => {
        deferred.resolve(newCanvas);
        this.startProcess = false;
      }, (error) => {
        deferred.reject(error);
      });
    } else {
      setTimeout(() => { 
        this.resizeAsync(from, to, options).then((newCanvas) => {
          deferred.resolve(newCanvas);
          this.startProcess = false;
        }, (error) => {
          deferred.reject(error);
        });
      }, 50);
    }
    return deferred.promise;
  }

  public resizeBuffer(options: resizeBufferOptions): angular.IPromise<Uint8Array> {
    let deferred: angular.IDeferred<Uint8Array> = this.$q.defer();
    let resizer = new pica();
    resizer.resizeBuffer(options).then((output) => {
      deferred.resolve(output);
    }, (error) => {
      deferred.reject(error);
    });
    return deferred.promise;
  }
}