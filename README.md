# Patsanjs
Angular 1 / Vue like framework. Written with ES6 and love

============

## Installation
First clone the repo, install packages via yarn or classical 'npm i'

## Build
Use typical 'webpack' to build app into dist folder in development mode.
Use -p flag to build prod ('webpack -p')

## Usage
Use markup like this:
```
  <div id="myapp">
    <span>[[ myModelVariable ]]</span>
    <input patsan-model="myModelVariable">
  </div>
```
In your JS file init the application:
```
  const myNewApp = new Patsan({el: '#myapp'})
```
Then you can use all the API listed above in your application: 
(list will be updated soon) :shipit:
