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
        // If administrator create product then it becomes public.

        product.createdAt = new Date();
        product.authorID = Meteor.userId();

        if(Roles.userIsInRole(Meteor.userId(),['admin'])){
          product.public = true;
        }

        Products.insert(product);
    },
    deleteProduct: function(id) {
        Products.remove(id);
    },
    addDish: function(dish) {
        // If administrator create dish then it becomes public.
        dish.createdAt = new Date();
        dish.authorID = Meteor.userId();

        if(Roles.userIsInRole(Meteor.userId(),['admin'])){
          dish.public = true;
        }

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
    deleteProductFromDish: function(dishID, productID){
        Dishes.update(dishID, {
            $pull: { products: { id: productID } }
        });
    },
    addDiaryEntry: function(entrie) {
        var currentTime = new Date();
        Diary.insert({
          createdAt: currentTime,
          authorID: Meteor.userId(),
          entryTime: ((currentTime.getHours()<10?'0':'') + currentTime.getHours())+":"+ ((currentTime.getMinutes()<10?'0':'') + currentTime.getMinutes()),
          entryDate: currentTime.getMonth()+"/"+currentTime.getDate()+"/"+currentTime.getFullYear()
        });
    },
    deleteDiaryEntry: function(id) {
        Diary.remove(id);
    },
    addDishToDiary: function(entry, dish) {
        Diary.update(entry, {
            $addToSet: {
                dishes: {
                  id: dish.id,
                  name: dish.name,
                  weight: dish.weight
                }
            }
        });
    },
    updateDiary: function(entry, dish) {
      // Could be scaled and work like update if it'll take option name instead of "weight" and add cycle
      Diary.update(
         { _id: entry, "dishes.id": dish.id },
         { $set: { "dishes.$.weight" : dish.weight } }
      )
    },
    deleteDishFromEntry: function(entryID, dishID) {
        Diary.update(entryID, {
            $pull: { dishes: { id: dishID } }
        });
    },
});


Meteor.publish("products", function() {
    return Products.find({
      $or: [
        { public: true },
        { authorID: this.userId }
      ]
    });
});

Meteor.publish("dishes", function() {
    return Dishes.find({
      $or: [
        { public: true },
        { authorID: this.userId }
      ]
    });
});

Meteor.publish("diary", function() {
  return Diary.find({
    $or: [
      { authorID: this.userId }
    ]
  });
});
