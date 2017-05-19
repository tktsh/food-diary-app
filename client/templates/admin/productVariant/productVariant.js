Template.productVariant.events({
  'click .addToDish': function() {
      Meteor.call("addProductToDish", Template.parentData(1)._id, { id: this._id, name: this.name, weight: 100});
  },
});
