/**
 * patsan
 * Created by andreykubasov on 08.11.17.
 */

// iterates over array of ElementCreators
// and after render templates
// also it should update model values.
// this digest loop function is executed every time
// the model or model binded value changes
// AND once after all application inited

import appStore from './store';
import { ElementTypes } from '../constants/directiveTypes';
import Compiler from './compiler';

function DigestLoop () {
    
    const shadowedElements = appStore.getItemByKey(ElementTypes.SHADOWED);
    //const storeContent = appStore.getStoreContent();
    
    // TODO check attribute bindings created after element creator executed
    // TODO probably rewrite looping through node attribute bindings
    
    for (let i = 0; i < shadowedElements.length; i++) {
        
        let item = shadowedElements[i],
            innerText = item.element.innerText;
        
        if (innerText) {
            const compiledExpression = Compiler(item);
            if (compiledExpression) {
                let bracketsExpression = innerText.match(/\[\[(.*)\]\]/)[0];
                const newText = innerText.replace(bracketsExpression, compiledExpression);
                
                for (let i = 0; i < item.element.node.childNodes.length; i++) {
                    let curNodeValue = item.element.node.childNodes[i].nodeValue;
                    if (curNodeValue && curNodeValue.indexOf(innerText) > -1) {
                        item.element.node.childNodes[i].nodeValue = newText;
                    }
                }
                
                //item.element.node.innerText = newText;
            }
        }
        
        //let item = shadowedElements[i],
        //    element = item.element,
        //    elParsedText = element.parsedText,
        //    elSourceModel = element.sourceModel,
        //    elChildNodes = element.node.childNodes.length;
        //
        //if (elParsedText) {
        //    if (storeContent.size>1) {
        //        for (let [modelName, modelValue] of storeContent) {
        //            if (modelName !== ElementTypes.SHADOWED) {
        //                if (elParsedText.indexOf(modelName)>-1) {
        //                    elParsedText = elParsedText.replace(modelName, modelValue);
        //                }
        //            }
        //        }
        //        //element.parsedText = eval(element.parsedText);
        //        for (let i=0; i<elChildNodes.length; i++) {
        //            let curNodeValue = element.node.childNodes[i].nodeValue;
        //            if (curNodeValue && curNodeValue.indexOf(elSourceModel)>-1) {
        //                curNodeValue = curNodeValue.replace(elSourceModel, elParsedText);
        //            }
        //        }
        //        //element.node.innerHTML = element.node.innerHTML.replace(element.sourceModel, element.parsedText);
        //    }
        //}
    }
    
}

export default DigestLoop;