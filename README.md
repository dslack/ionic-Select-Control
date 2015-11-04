ionic-Select-Control
====================

## Description

This is a customizable select box for ionic framework.

## Dependencies

This component uses ionic-modal and ionic-list from ionic framework components.

## How to use

1. Install with bower:

`bower install ionic-select-box --save`

2. Include as a dependency of your angular module:

```javascript
angular.module('myApp', ['ionic', $selectBox'])
```

3. Include necessary files in your index.html header:

```HTML
   <link href="lib/selectbox/css/SelectBox.css" rel="stylesheet">

   <script type="text/javascript" src="lib/selectbox/SelectBox.js"></script>
```

4. Use the select-box directive:

```HTML
  <select-box ng-Selected-Value="selectedValue" 
          		ng-Item-Name="label" 
          		ng-Item-Id="id" 
          		ng-title="Select something!" 
          		ng-data="mySelectedValue" 
          		ng-placeholder="nothing selected!"
          		ng-select-changed="displaySelectedValue()"></select-box>
```
 
### Directive parameters
| Name  | Description |
| :------------- | :------------- |
|ng-Selected-Value|Variable from scope that will get populated with selected option value|
|ng-data|Scope object passed to SelectBox, format: list of object with two properties, one for label, one for value|
|ng-Item-Name|Name of property for label, in scope object passed to SelectBox|
|ng-Item-Id|Name of property for value, in scope object passed to SelectBox|
|ng-placeholder|Placholder string when no value is selected|
|ng-title|Title of SelectBox|
|ng-select-changed|Optional JS function to execute after item selection|
 
 
 **Example of object for ng-data:**
 ```javascript
var obj = [
  {label: "Value1", id:"1"},
  {label: "Value2", id:"2"},
  {label: "Value3", id:"3"},
  {label: "Value4", id:"4"},
]
 ```
 
## History
 
### Version 1.0.0:
 
 - Addition of ng-select-changed attribute to hook a function to handle selected value. (postb99 new fork, from dslack fork).
 - Added Header class support to better integrate with apps (dslack fork).
 
##Original project Codepen
 http://codepen.io/domiSchenk/pen/cvDkt
