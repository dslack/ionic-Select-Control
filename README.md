ionic-Select-Control
====================

Select Box created with Ionic modal and ionic-list

## Changes

Addition of ng-select-changed attribute to hook a function to handle selected value. ( **New fork by postb99, from dslack fork**).

Added Header class support to better integrate with apps.

## Usage

Include as a dependency in your angular module

```javascript
angular.module('myApp', ['$selectBox'])
```

```HTML
  <select-box ng-Selected-Value="selectedValue" 
          		ng-Item-Name="name" 
          		ng-Item-Id="id" 
          		ng-title="Select something!" 
          		ng-data="obj" 
          		ng-placeholder="nothing selected!"
          		ng-select-changed="displaySelectedValue()"></select-box>
 ```
 
## Parameter
| Name  | Description |
| :------------- | :------------- |
|ng-Selected-Value|Variable from scope that will get populated with selected value|
|ng-data|Scope object passed to SelectBox, format: list of object with two properties, one for label, one for value|
|ng-Item-Name|Name of label property of scope object passed to SelectBox|
|ng-Item-Id|Name of value property of scope object passed to SelectBox|
|ng-placeholder|Placholder when no value is selected|
|ng-title|Title of SelectBox|
|ng-select-changed|Optional JS function to execute after item selection|
 
 
 **Example of object passed**
 ```javascript
var obj = [
  {name: "Value1", id:"1"},
  {name: "Value2", id:"2"},
  {name: "Value3", id:"3"},
  {name: "Value4", id:"4"},
]
 ```
 
##Original project Codepen
 http://codepen.io/domiSchenk/pen/cvDkt
