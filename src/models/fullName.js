const Fullname = function (fullName) {
    console.log("fullName", fullName);
    this.customerID = fullName.customerID;
    this.firstName = fullName.firstName;
    this.midName = fullName.midName;
    this.lastName = fullName.lastName;
}
module.exports = Fullname;