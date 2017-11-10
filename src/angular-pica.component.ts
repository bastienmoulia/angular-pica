import * as angular from "angular";

import picaService from "./angular-pica.service";

class picaImgController implements angular.IController {
  src: string;
  width: number;
  height: number;
  size: "cover" | "contain";
  canvasWidth: number;
  canvasHeight: number;
  constructor (
    private picaService: picaService,
    private $timeout: angular.ITimeoutService,
    private $element: angular.IRootElementService
  ) {
    "ngInject";
  }
  $onInit() {
    //console.log("element", this.$element);
    let canvas: any = angular.element(this.$element).find("canvas")[0];
    let context: CanvasRenderingContext2D = canvas.getContext("2d");

    let image = new Image();
    image.src = this.src;
    image.onload = () => {
      let oldCanvas = document.createElement('canvas');
      oldCanvas.height = image.height;
      oldCanvas.width = image.width;
      let oldContext = oldCanvas.getContext("2d");
      oldContext.drawImage(image, 0, 0, image.width, image.height);
      let newCanvas = document.createElement('canvas');
      if (this.height && this.width) {
        this.canvasHeight = this.height;
        this.canvasWidth = this.width;
      } else if (this.height) {
        this.canvasHeight = this.height;
        this.canvasWidth = this.height / image.height * image.width;
      } else if (this.width) {
        this.canvasWidth = this.width;
        this.canvasHeight = this.width / image.width * image.height;
      } else {
        this.canvasHeight = image.height;
        this.canvasWidth = image.width;
      }
      newCanvas.height = this.canvasHeight;
      newCanvas.width = this.canvasWidth;
      let imageRatio = image.width / image.height;
      let canvasRatio = this.canvasWidth / this.canvasHeight;
      if (this.size === "contain" && this.height && this.width) {
        if (imageRatio < canvasRatio) {
          newCanvas.width = newCanvas.height * imageRatio;
        } else {
          newCanvas.height = newCanvas.width / imageRatio;
        }
      }
      if (this.size === "cover" && this.height && this.width) {
        let tempX = 0;
        let tempY = 0;
        let tempW = image.width;
        let tempH = image.height;
        if (imageRatio < canvasRatio) {
          tempH = tempW / canvasRatio;
          tempY = (image.height - tempH) / 2;
        } else {
          tempW = tempH * canvasRatio;
          tempX = (image.width - tempW) / 2;
        }
        //console.log("temp", tempW, tempH, tempX, tempY);
        oldCanvas.height = tempH;
        oldCanvas.width = tempW;
        oldContext.drawImage(image, tempX, tempY, tempW, tempH, 0, 0, tempW, tempH);
      }
      //console.log("oldCanvas", oldCanvas.width, oldCanvas.height);
      //console.log("newCanvas", newCanvas.width, newCanvas.height);
      this.$timeout(() => {
        this.picaService.resize(oldCanvas, newCanvas).then((resized) => {
          let dstX = 0;
          let dstY = 0;
          let dstW = newCanvas.width;
          let dstH = newCanvas.height;
          if (this.size === "contain" && this.height && this.width) {
            if (imageRatio < canvasRatio) {
              dstX = (this.canvasWidth - dstW) / 2;
            } else {
              dstY = (this.canvasHeight - dstH) / 2;
            }
          }
          context.drawImage(resized, dstX, dstY, dstW, dstH);
          //console.log("[angular-pica] Resize image", this.src, dstX, dstY, dstW, dstH)
        }, (error) => {
          console.warn("[angular-pica] Error during resizing", error) ;
        });
      });
    }
  }
}

export default class picaComponent implements angular.IComponentOptions {
  public bindings: any;
  public controller: any;
  public template: string;

  constructor() {
    this.bindings = {
      src: '@',
      height: '<',
      width: '<',
      size: '@'
    };
    this.controller = picaImgController;
    this.template = `
      <canvas width="{{ $ctrl.canvasWidth }}" height="{{ $ctrl.canvasHeight }}" ng-hide="!$ctrl.src"></canvas>
    `;
  }
};