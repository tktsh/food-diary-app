Template.adminPageContent.helpers({
    products: function(){
      return Products.find({}, { sort: {name: 1}});
    },
    dishes: function(){
      return Dishes.find();
    }
});

Template.adminPageContent.events({
    'submit .addNewDish': function(event) {
        var dish = {
          name: event.target.dishName.value,
        };
        Meteor.call("addDish", dish);
        event.target.dishName.value = "";
        return false;
    },
    'submit .addNewProduct': function(event) {
        var product = {
          name: event.target.productName.value, proteins: event.target.proteins.value,
          fats: event.target.fats.value, carbohydrates: event.target.carbohydrates.value
        };
        Meteor.call("addProduct", product);
        event.target.productName.value = ""; event.target.proteins.value = "";
        event.target.fats.value = "";event.target.carbohydrates.value = "";
        return false;
    },
});