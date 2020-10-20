class Operation{
    constructor(code, name, description, counters){
        if(code)
            this.code = code;
        this.name = name;
        this.description = description;
        this.counters = [];
        if(counters)
            this.counters = counters;
    }
}

module.exports = Operation;