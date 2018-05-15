const parse = {}, on = {}




//// PARSERS

//// A number-attribute can be positive or negative, and have decimal places.
//// An invalid attribute parses to zero.
parse.number = function (value) { return +value || 0 }

//// An ‘enum’ attribute must be one of a set of valid strings.
//// An invalid attribute parses to the first (index 0) element in `valid`.
parse.enum = function (value, attrName) {
    const valid = this.oom.api.attributes[attrName].valid
    return 0 > valid.indexOf(value) ? valid[0] : value
}




//// EVENT HANDLERS

on.change = function (evt) {
    const
        attrName = evt.type.match(/^oom-(.*)-change$/)[1] // eg 'oom-foo-change'
      , value = this.oom.instance[attrName] // the 'foo' attribute’s new value
      , { valid, linkedElements } = this.oom.api.attributes[attrName]
      , toRemove = valid.map( v => attrName+'-'+v )
    linkedElements.forEach( elName => {
        this.oom.$[elName].classList.remove(...toRemove)
        this.oom.$[elName].classList.add(attrName+'-'+value)
    })
}




export { parse, on }
