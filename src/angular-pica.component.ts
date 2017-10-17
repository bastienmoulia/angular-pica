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
        this.canvasWidth = this.height * image.height / image.width;
      } else if (this.width) {
        this.canvasWidth = this.width;
        this.canvasHeight = this.width * image.width / image.height;
      } else {
        this.canvasHeight = image.height;
        this.canvasWidth = image.width;
      }
      newCanvas.height = this.canvasHeight;
      newCanvas.width = this.canvasWidth;
      this.$timeout(() => {
        this.picaService.resize(oldCanvas, newCanvas).then((resized) => {
          let dstX = 0;
          let dstY = 0;
          let dstW = this.canvasWidth;
          let dstH = this.canvasHeight;
          if (this.size === "contain") {
            //TODO
            dstX = 150;
            dstW = 150;
          }
          context.drawImage(resized, dstX, dstY, dstW, dstH);
          //console.log("[angular-pica] Resize image", this.src)
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
      <canvas width="{{ $ctrl.canvasWidth }}" height="{{ $ctrl.canvasHeight }}"></canvas>
    `;
  }
};