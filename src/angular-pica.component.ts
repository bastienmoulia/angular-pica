import * as angular from "angular";

import picaService from "./angular-pica.service";

class picaImgController implements angular.IController {
  src: string;
  width: number;
  height: number;
  constructor (
    private picaService: picaService,
    private $element: angular.IRootElementService
  ) {
    "ngInject";
  }
  $onInit() {
    let canvas: any = angular.element(this.$element).find("canvas")[0];
    let context = canvas.getContext("2d");

    let newCanvas = document.createElement('canvas');
    newCanvas.height = this.height;
    newCanvas.width = this.width;
    let image = new Image();
    image.src = this.src;
    image.onload = () => {
      let oldCanvas = document.createElement('canvas');
      oldCanvas.height = image.height;
      oldCanvas.width = image.width;
      let oldContext = oldCanvas.getContext("2d");
      oldContext.drawImage(image, 0, 0, image.width, image.height);
      this.picaService.resize(oldCanvas, newCanvas).then((resized) => {
        context.drawImage(resized, 0, 0);
      }, (error) => {
        console.warn("[angular-pica] Error during resizing", error) ;
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
      width: '<'
    };
    this.controller = picaImgController;
    this.template = `
      <canvas width="{{ $ctrl.width }}" height="{{ $ctrl.height }}"></canvas>
    `;
  }
};