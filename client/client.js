
Meteor.subscribe("products");
Meteor.subscribe("dishes");
Meteor.subscribe("diary");
Products = new Mongo.Collection("products");
Dishes = new Mongo.Collection("dishes");
Diary = new Mongo.Collection("diary");

Template.body.onCreated(function bodyOnCreated(){});
Template.body.helpers({});
Template.body.events({});
Accounts.ui.config({
    passwordSignupFields: "USERNAME_ONLY"
});
