Template.admin.events({
    'submit .addNewProduct': function(event) {

        var product = {
          name: event.target.productName.value,
          proteins: event.target.proteins.value,
          fats: event.target.fats.value,
          carbohydrates: event.target.carbohydrates.value
        };

        Meteor.call("addProduct", product);

        event.target.productName.value = "";
        event.target.proteins.value = "";
        event.target.fats.value = "";
        event.target.carbohydrates.value = "";

        return false;
    },
    'submit .addNewDish': function(event) {

        var dish = {
          name: event.target.dishName.value,
          //products: []
        };

        Meteor.call("addDish", dish);

        event.target.dishName.value = "";

        return false;
    },
    'click .deleteCurrentProduct': function() {
        Meteor.call("deleteProduct", this._id)
    },
    'click .deleteCurrentDish': function() {
        Meteor.call("deleteDish", this._id)
    },
});

Template.adminPageContent.helpers({
    products: function(){
      return Products.find();
    },
    dishes: function(){
      return Dishes.find();
    }
});

Template.dish.events({
  'keyup .addProductToDish': function(event) {
      Session.set('searchProductName', event.target.value);
  },
});

Template.dish.helpers({
  variants: function(){
    var input = Session.get('searchProductName');
    if(input){
      console.log(input);
      var reg = new RegExp('.*'+input+'.*');
      return Products.find({"name": reg});
    }
  }
});

Template.variant.events({
  'click .variant': function() {
      Meteor.call("addProductToDish", this._id, Template.parentData(1)._id);
      //console.log(this._id);                    // the {{#each days}} context
      //console.log(Template.parentData(1)._id);  // the {{#with calendar}} context
  },
});
