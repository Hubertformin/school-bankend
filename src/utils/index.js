
function convertCSVToObject(csv) {
    /**
     * Convert the file data to an array using the new line character as delimiter
     */
    const fileDataArray = csv.split("\n");
    /**
     * Now we get the header form the csv file, to be used to create objects
     */
    const keys = fileDataArray[0].split(',').map(k => k.toLowerCase());
    /**
     * Filter the data by removing empty string, since empty string
     * are not valid data...
     * 
     */
    const records = fileDataArray.slice(1);
    /**
     * Filter return an array with the  elements that pass a condition
     */
    let recordStrings = records.filter(userString => Boolean(userString));

    return recordStrings.map((userString) => {
        // userString = "8Kgb3uUpKGKpvirY2zm9GV,Tumasang Ndeh,tumasang.ndeh@gmail.com,24"
        const fields = userString.split(",");
        // fields = [ '8Kgb3uUpKGKpvirY2zm9GV', 'Tumasang Ndeh', 'tumasang.ndeh@gmail.com', '24']
        let record = {};
        // keys = [ 'id', 'name', 'email', 'age' ]
        keys.forEach((key, index) => {
            // ('id', 0)
            record[key] = fields[index];
        })
        return record;
    });
}

module.exports = { convertCSVToObject }