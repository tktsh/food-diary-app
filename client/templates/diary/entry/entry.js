Template.entry.helpers({
  variants: function(){
    var input = Session.get('searchDishName');
    if(input){
      var reg = new RegExp('^'+'.*'+input.toLowerCase()+'.*', 'i');
      return Dishes.find({"name": reg});
    }
  }
});

Template.entry.events({
  'change input[name=weight]': function(event) {
      Meteor.call("updateDiary", Template.parentData(0)._id, {
        id: $(event.target).closest("li").attr("data-id"),
        weight: event.target.value
      });
  },
  'click .deleteDishFromEntry': function() {
    // deleteDishFromEntry: function(entryID, dishID){};
      var entryID = Template.parentData(0)._id,
          dishID = $(event.target).closest("li").attr("data-id");
          console.log(entryID+" "+dishID);
      Meteor.call("deleteDishFromEntry", entryID, dishID);
  },
  'click .diary-entry': function(e) {
      if ($(e.target).hasClass('diary-entry')){
        $('.active').removeClass('active');
        $(e.target).addClass('active');
      }else{
        $('.active').removeClass('active');
        $(e.target).closest('.diary-entry').addClass('active');
      }
  },
  'click .deleteCurrentEntry': function(event) {
      Meteor.call("deleteDiaryEntry", this._id);
      return false;
  },
  'keyup .addDishToDiarySearch': function(event) {
      Session.set('searchDishName', event.target.value);
  },
});
