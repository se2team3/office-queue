class Counter{
    constructor(id, operations){
        if(id)
            this.id = id;
        if(operations)
            this.operations = operations;
    }
}

module.exports = Counter;