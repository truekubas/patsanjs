/**
 * patsan
 * Created by andreykubasov on 08.11.17.
 */

import appStore from './store';
import { AttributeBindings, DispatchEvents } from '../constants/directiveTypes';

// will be called after parsing node if there are any of Directives exist
export default class ElementCreator {
    constructor(parsedElement) {
        this.element = parsedElement;
        // if there is patsan-model directive
        // add event listener on change and callback global Model Object update
        if (this.element.MODEL) this.addModelListener();
        
        // TODO check Directive type to properly handle events
    }
    
    bindEventModelToAttribute() {
        this.element.node.setAttribute(AttributeBindings.ATTRIBUTE_MODEL,'');
        
    }
    getElementContents() {
        console.log(this.element);
    }
    updateModelValue() {
        //this.node.innerText = this.element.MODEL;
        appStore.addToStore(this.element.MODEL, this.element.node.value);
    }
    addModelListener() {
        this.bindEventModelToAttribute();
        this.element.node.addEventListener(DispatchEvents.MODEL_CHANGE, this.updateModelValue.bind(this));
    }
}