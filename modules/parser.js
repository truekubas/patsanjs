/**
 * patsan
 * Created by andreykubasov on 08.11.17.
 */

import { DirectiveTypes } from '../constants/directiveTypes';

// for every node check if there are any directives or template models
function Parser (elNode) {
    
    const element = elNode;
    const elementDirectives = {};
    
    getElementDirectives();
    getElementText();
    
    // assign directiveType/value pair into Directives object if any of them exist
    function getElementDirectives () {
        for (let type in DirectiveTypes) {
            let attr = element.getAttribute(DirectiveTypes[type]);
            if (attr) elementDirectives[type] = attr;
        }
    }
    
    // grab node's text and parse it by [[ ... ]] template brackets
    // if found - place into Directives object
    // TODO make parsing with multiple [[ ... ]] items
    function getElementText () {
        let innerText = element.innerText;
        let parsedText = innerText.match(/\[\[(.*)\]\]/);
        if (parsedText) {
            elementDirectives.innerText = innerText;
            elementDirectives.sourceModel = parsedText[0];
            elementDirectives.parsedText = parsedText[1].replace(/\s/g, '');
        }
    }
    
    // return false cause of empty Directive object after checking
    if (Object.keys(elementDirectives).length === 0) return false;
    
    // extend Directives by elements node and return it
    if (Object.keys(elementDirectives).length > 0) {
        elementDirectives.node = element;
        return elementDirectives;
    }
    
}

export default Parser;