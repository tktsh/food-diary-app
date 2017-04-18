
Meteor.subscribe("products");
Meteor.subscribe("dishes");
Products = new Mongo.Collection("products");
Dishes = new Mongo.Collection("dishes");

Template.body.onCreated(function bodyOnCreated() {

});

Template.body.helpers({

  whoami: function(){
    return 0;
  },
  products: function() {
    return Products.find();
  },
  dishes: function() {
    return Dishes.find();
  }

});

Template.body.events({

});

Accounts.ui.config({
    passwordSignupFields: "USERNAME_ONLY"
});
