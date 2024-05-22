let scrimbaUsers = {
    "00": "sindre@scrimba.com",
    "01": "per@scrimba.com",
    "02": "frode@scrimba.com"
}

console.log(Object.entries(scrimbaUsers)); // Object.values() will create an array of the values, Object.keys() will crate an array of the keys,
                                           // and Object.entries() will create a 2-d array of the key,value pairs

let scrimbaUsersEmails = Object.values(scrimbaUsers);
let scrimbaUsersIDs = Object.keys(scrimbaUsers);
let scrimbaUserEntries = Object.entries(scrimbaUsers);