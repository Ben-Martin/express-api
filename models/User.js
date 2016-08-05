
function User(user_guid) {
    this.user_guid = user_guid;
    return this;
}

module.exports = {
    user: User
};

