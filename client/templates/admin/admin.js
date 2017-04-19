Template.adminPageContent.helpers({
    products: function(){
      return Products.find({}, { sort: {name: 1}});
    },
    dishes: function(){
      return Dishes.find();
    }
});

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

Template.dish.helpers({
  variants: function(){
    var input = Session.get('searchProductName');
    if(input){
      var reg = new RegExp('.*'+input+'.*');
      return Products.find({"name": reg});
    }
  }
});

Template.dish.events({
  'keyup .addProductToDish': function(event) {
      Session.set('searchProductName', event.target.value);
  },
  'change input[name=weight]': function(event) {
      Meteor.call("updateDish", Template.parentData(0)._id, {
        id: event.target.id,
        weight: event.target.value
      });
  },
});


Template.variant.events({
  'click .addToDish': function() {
      Meteor.call("addProductToDish", Template.parentData(1)._id, { id: this._id, name: this.name, weight: 100});
  },
});
