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
        // var userRole = Meteor.user( Meteor.userId() ).role; If admin then public
        product.createdAt = new Date();
        product.authorID = Meteor.userId();
        Products.insert(product);
    },
    deleteProduct: function(id) {
        Products.remove(id);
    },
    addDish: function(dish) {
        // var userRole = Meteor.user( Meteor.userId() ).role; If admin then public
        dish.createdAt = new Date();
        dish.authorID = Meteor.userId();
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
    addDiaryEntrie: function(entrie) {
        var currentTime = new Date();
        Diary.insert({
          createdAt: currentTime,
          authorID: Meteor.userId(),
          entryTime: currentTime.getHours()+":"+currentTime.getMinutes(),
          entryDate: currentTime.getMonth()+"/"+currentTime.getDate()+"/"+currentTime.getFullYear()
        });
    },
    deleteDiaryEntrie: function(id) {
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
    return Products.find(/*{
      $or: [
        { public: true },
        { authorID: this.userId }
      ]
    }*/);
});

Meteor.publish("dishes", function() {
    return Dishes.find(/*{
      $or: [
        { public: true },
        { authorID: this.userId }
      ]
    }*/);
});

Meteor.publish("diary", function() {
  return Diary.find({
    $or: [
      { authorID: this.userId }
    ]
  });
});
