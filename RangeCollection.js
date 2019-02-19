// Task: Implement a 'Range Collection' class.
// A pair of integers define a range, for example: [1, 5). This range includes integers: 1, 2, 3, and 4.
// A range collection is an aggregate of these ranges: [1, 5), [10, 11), [100, 201)

/**
 * RangeCollection class
 * NOTE: Feel free to add any extra member variables/functions you like.
 */
class RangeCollection {
    
    /**
     * Setup store which will store the values
     */
    constructor() {
        this.store = [];
    }

    /**
     * Gave the numbers in range
     * @param {number} startNum - starting number of range
     * @param {number} max - End number of range
     * @param {Array<number>} arr - Array to insert new range
     */
    giveRange(startNum, max, arr) {
        if (startNum >= max) {
            return arr
        }
        arr.push(startNum);
        return this.giveRange(++startNum, max, arr)
    }

    /**
     * Give the index where new number needs to insert  
     * @param {number} number - Number which needs to insert
     */
    getIndexToInsert(number) {
        const index = this.store.findIndex(element => element > number);
        return index > -1 ? index : this.store.length;
    }

    /**
     * Insert a range into Store
     * @param {Array<number>} range - Array of two integers that specify beginning and end of range.
     */
    insertIntoStore(range) {
        let rangeElements = this.giveRange(range[0], range[1], []);
        if (!rangeElements.length) return;
        const indexToInsert = this.getIndexToInsert(range[0]);
        rangeElements.forEach((element, ind) => {
            const elementInStore = this.store[indexToInsert + ind];
            if (elementInStore === element) return;
            this.store.splice(indexToInsert + ind, 0, element);
        })
    }

    /**
     * Adds a range to the collection
     * @param {Array<number>} range - Array of two integers that specify beginning and end of range.
     */
    add(range) {
        const lowerRange = range[0]
        const upperRange = range[1];
        if(lowerRange == upperRange) return;
        
        this.insertIntoStore(range);
    }

    /**
     * Removes a range from the collection
     * @param {Array<number>} range - Array of two integers that specify beginning and end of range.
     */
    remove(range) {
        // TODO: implement this
    }
    /**
     * Create RangeCollection from Array (store)
     * @param {Array<number>} store - Array of numbers i.e [1,2,3,4,7,8,9,20,21,22]
     */
    makeGroup(store) {
        let data = [];
        let startNumber = store[0];
        let count = store[0];
        for (let index = 0; index < store.length; index++) {
            const element = store[index + 1];
            if (element - count > 1 || index === store.length - 1) {
                data.push([startNumber, count + 1]);
                startNumber = element
            };
            count = store[index + 1]
        }
        return data;
    }
    /**
     * Format the result
     */
    getResult() {
        const data = this.makeGroup(this.store)
        if (!data.length) {
            return 'Empty Range';
        }
        return data.reduce((previousValue, currentValue) => {
            previousValue && (previousValue = previousValue + ' ');
            return `${previousValue}[${currentValue.join(', ')})`;
        }, '');
    }
    /**
     * Prints out the list of ranges in the range collection
     */
    print() {
        console.log(this.getResult())
    }
}

module.exports = RangeCollection;

//Moved the test into test/RangeCollection.test.js and also inputs.js