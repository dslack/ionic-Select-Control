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
          		ng-Item-Name="label" 
          		ng-Item-Id="id" 
          		ng-title="Select something!" 
          		ng-data="mySelectedValue" 
          		ng-placeholder="nothing selected!"
          		ng-select-changed="displaySelectedValue()"></select-box>
 ```
 
## Parameter
| Name  | Description |
| :------------- | :------------- |
|ng-Selected-Value|Variable from scope that will get populated with selected option value|
|ng-data|Scope object passed to SelectBox, format: list of object with two properties, one for label, one for value|
|ng-Item-Name|Name of property for label, in scope object passed to SelectBox|
|ng-Item-Id|Name of property for value, in scope object passed to SelectBox|
|ng-placeholder|Placholder string when no value is selected|
|ng-title|Title of SelectBox|
|ng-select-changed|Optional JS function to execute after item selection|
 
 
 **Example of object passed**
 ```javascript
var obj = [
  {label: "Value1", id:"1"},
  {label: "Value2", id:"2"},
  {label: "Value3", id:"3"},
  {label: "Value4", id:"4"},
]
 ```
 
##Original project Codepen
 http://codepen.io/domiSchenk/pen/cvDkt
