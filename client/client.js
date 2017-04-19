
Meteor.subscribe("products");
Meteor.subscribe("dishes");
Meteor.subscribe("diary");
Products = new Mongo.Collection("products");
Dishes = new Mongo.Collection("dishes");
Diary = new Mongo.Collection("diary");


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
  },
  diary: function() {
    return Diary.find();
  }

});

Template.body.events({

});

Accounts.ui.config({
    passwordSignupFields: "USERNAME_ONLY"
});
