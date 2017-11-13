# angular-pica

Resize image in browser with <a href="https://github.com/nodeca/pica">pica</a> for AngularJS

## Install

```bash
$ npm install angular-pica --save
```

## Declaring dependencies

```Javascript
angular.module('app', ['angularPica']);
```

## Using service

```Javascript
app.controller('Ctrl', ['picaService', function (picaService) {

}]);
```

## Using directive

```html
<pica-img src="my-image.png"></pica-img>
```

