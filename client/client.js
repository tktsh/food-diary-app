
Meteor.subscribe("products");
Meteor.subscribe("dishes");
Meteor.subscribe("diary");
Products = new Mongo.Collection("products");
Dishes = new Mongo.Collection("dishes");
Diary = new Mongo.Collection("diary");

Template.body.onCreated(function bodyOnCreated(){

  Session.set('searchProductName', '');
  Session.set('searchDishName', '');

/*
  $(document).on('click', function(e){
    if ($(e.target).is(':not(.diary-entry, .diary-entry *)')){
      $('.variant').css('display', 'none');
    }else{
      $('.variant').css('display', 'none');
      $(e.target).closest('.diary-entry').find('.variant').css('display', 'inline');
    }
  });
*/

});

Template.body.helpers({});
Template.body.events({});
Accounts.ui.config({
    passwordSignupFields: "USERNAME_ONLY"
});
