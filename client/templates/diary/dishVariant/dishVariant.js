Template.dishVariant.events({
  'click .addDishToDiary': function() {
     	Meteor.call("addDishToDiary", Template.parentData(1)._id, { id: this._id, name: this.name, weight: 100});
  },
});
