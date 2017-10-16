import * as angular from "angular";

import picaComponent from "./angular-pica.component";
import picaService from "./angular-pica.service";

export default angular
  .module("angularPica", [])
  .service("picaService", picaService)
  .component("picaImg", new picaComponent());