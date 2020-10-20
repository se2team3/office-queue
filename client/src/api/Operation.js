class Operation{
    constructor(code, name, description, counters){
        if(code)
            this.code = code;
        this.name = name;
        this.description = description;
        if(counters)
            this.counters = counters;
    }
}

export default Operation;