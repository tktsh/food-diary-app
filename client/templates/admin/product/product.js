Template.product.events({
    'click .deleteCurrentProduct': function() {
        Meteor.call("deleteProduct", this._id)
    },
});