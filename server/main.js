import {
    Meteor
} from 'meteor/meteor';

Meteor.startup(() => {
    // code to run on server at startup
    Products = new Mongo.Collection("products");
    Dishes = new Mongo.Collection("dishes");
});

Meteor.methods({
    addProduct: function(product) {
        Products.insert(product);
    },
    deleteProduct: function(id) {
        Products.remove(id);
    },
    addDish: function(dish) {
        Dishes.insert(dish);
    },
    deleteDish: function(id) {
        Dishes.remove(id);
    },
    addProductToDish: function(dish, product) {
        Dishes.update(dish._id, {
          $set: {
              products: product._id
          }
        });
    }
});

Meteor.publish("products", function() {
    return Products.find();
});

Meteor.publish("dishes", function() {
    return Products.find();
});
