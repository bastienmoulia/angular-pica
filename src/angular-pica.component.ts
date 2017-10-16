import picaService from "./angular-pica.service";

class picaImgController implements angular.IController {
  src: string;
  width: number;
  height: number;
  constructor (private picaService: picaService) {
  }
  $onInit() {
    console.log(this.src, this.width, this.height);
    let canvas: any = document.getElementById('viewport');
    let context = canvas.getContext("2d");

    let newCanvas = document.createElement('canvas');
    newCanvas.height = this.height;
    newCanvas.width = this.width;
    let image = new Image();
    image.src = this.src;
    image.onload = () => {
      console.log("image", image, image.width, image.height);
      let oldCanvas = document.createElement('canvas');
      oldCanvas.height = image.height;
      oldCanvas.width = image.width;
      let oldContext = oldCanvas.getContext("2d");
      oldContext.drawImage(image, 0, 0, image.width, image.height);
      this.picaService.resize(oldCanvas, newCanvas).then((resized) => {
        console.log("resized", resized, resized.getContext("2d"));
        context.drawImage(resized, 0, 0);
      }, (error) => {
        console.error("error", error) ;
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
      <canvas id="viewport" width="{{ $ctrl.width }}" height="{{ $ctrl.height }}"></canvas>
    `;
  }
};