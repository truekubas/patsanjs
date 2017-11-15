/**
 * patsan
 * Created by andreykubasov on 14.11.17.
 */

// gets the ElementCreator instance (shadowedElement)
// parses innerText
// creates function closure and executes expression from string
// passed store models argument helps to evaluate innerText
// function returns compiled innerText to digestLoop

import appStore from './store';
import { ElementTypes } from '../constants/directiveTypes';

function Compiler(shadowedElement) {
    
    const storeContent = appStore.getStoreContent();
    
    let shadowEl = shadowedElement,
        el = shadowEl.element,
        elText = el.innerText;
    
    const modelNames = [],
        modelValues = [];
    
    // TODO eval brackets expressions and  replace them to thr result
    for (let [modelName, modelValue] of storeContent) {
        if (modelName !== ElementTypes.SHADOWED) {
            modelNames.push(modelName);
            modelValues.push(modelValue);
        }
    }
    
    if (modelNames.length) {
        let textToCompile = elText.match(/\[\[(.*)\]\]/)[1], // select text only in brackets
            allText = elText.match(/\[\[(.*)\]\]/).input; // select all node еуче
    
        // wrap evaluated text into closure and run it!
        const compilerFunction = new Function(...modelNames, 'return '+textToCompile);
    
        return compilerFunction(...modelValues); // return compiled result to digestLoop
    }
   
}

export default Compiler;