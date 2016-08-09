
// Meta object
function Meta(total, count, offset, error) {

      if (error) {
        total = 0;
        count = 0;
        offset = 0;
        resource = null;
      }

      var meta = {
        total: total,
        count: count,
        offset: offset,
        error: error
      };

      return meta;

    }

/**
 * Error message to return to the user
 * @param {String} message information to the user
 * @param {String} details Detail of the error message
 */
function NewError(message, details) {

    return {
        meta: this.meta(0, 0, 0, {message: message, details: details}),
        data: []
    };

}

function Response(itemArray, arrInterface, useResource) {

      return {
        meta: this.meta(
          itemArray._meta.total,
          itemArray.length,
          itemArray._meta.offset,
          null,
          null,
          useResource && this.resourceFromModelArray(itemArray, arrInterface)
        ),
        data: itemArray.toObject(arrInterface)
      };

    }

module.exports = {
    response: Response,
    meta: Meta,
    error: NewError
};
