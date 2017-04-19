import {
    Meteor
} from 'meteor/meteor';

Meteor.startup(() => {
    // code to run on server at startup
    Products = new Mongo.Collection("products");
    Dishes = new Mongo.Collection("dishes");
    Diary = new Mongo.Collection("diary");
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
        Dishes.update(dish, {
            $addToSet: {
                products: {
                  id: product.id,
                  name: product.name,
                  weight: product.weight
                }
            }
        });
    },
    updateDish: function(dish, product) {
      // Could be scaled and work like update if it'll take option name instead of "weight" and add cycle
      Dishes.update(
         { _id: dish, "products.id": product.id },
         { $set: { "products.$.weight" : product.weight } }
      )
    },
    addDiaryEntrie: function(entrie) {
        Diary.insert(entrie);
    },
    deleteDiaryEntrie: function(id) {
        Diary.remove(id);
    }
});


Meteor.publish("products", function() {
    return Products.find();
});

Meteor.publish("dishes", function() {
    return Dishes.find();
});

Meteor.publish("diary", function() {
    return Diary.find();
});
