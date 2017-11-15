/**
 * patsan
 * Created by andreykubasov on 07.11.17.
 */

// PRODUCTION MODE
// now app fully executed FIRST in 1.485107421875ms
//                          SECOND in 0.42431640625ms
// one model updates after digest loop in 0.469970703125ms


import ElementCreator from './modules/elementCreator';
import Parser from './modules/parser';
import appStore from './modules/store';
import { ElementTypes } from './constants/directiveTypes';

function Patsan(params={}) {
    this.element = document.querySelector(params.element); // root node element of the app
    this.shadowedElements = []; // array of elements with template or attribute directive bindings
    
    this.elementChildNodes = this.element.querySelectorAll('*');
    
    if (this.elementChildNodes) {
        for (let childNode of this.elementChildNodes) {
            let parsedEl = Parser(childNode); // extracts models and directives from
            if (parsedEl) {                   // node and extend to shadow element object
                this.shadowedElements.push(new ElementCreator(parsedEl));
            }
        }
        appStore.addToStore(ElementTypes.SHADOWED, this.shadowedElements);
    }
}

module.exports = Patsan;