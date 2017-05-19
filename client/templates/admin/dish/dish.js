Template.dish.helpers({
  variants: function(){
    var input = Session.get('searchProductName');
    if(input){
      var reg = new RegExp('^'+'.*'+input.toLowerCase()+'.*', "i");
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
        id: $(event.target).closest("li").attr("data-id"),
        weight: event.target.value
      });
  },
  'click .deleteProductFromDish': function() {
    // deleteProductFromDish: function(dishID, productID){};
      var dishID = Template.parentData(0)._id,
          productID = $(event.target).closest("li").attr("data-id");
          console.log(dishID+" "+productID);
      Meteor.call("deleteProductFromDish", dishID, productID);
  },
  'click .deleteCurrentDish': function() {
      Meteor.call("deleteDish", this._id)
  },
});