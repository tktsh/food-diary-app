Template.diary.helpers({
    diaryEntries: function(){
      var options = {
        sort: { createdAt: -1 }
      };
      return Diary.find({}, options);
    }
});

Template.diary.events({
  'click .addDiaryEntrie': function(event) {

      var entrie = {
      };

      Meteor.call("addDiaryEntrie", entrie);
      return false;
  },
  'click .deleteCurrentEntrie': function(event) {
      Meteor.call("deleteDiaryEntrie", this._id);
      return false;
  },
  'keyup .addDishToDiarySearch': function(event) {
      Session.set('searchDishName', event.target.value);
  },
});

Template.entry.helpers({
  variants: function(){
    var input = Session.get('searchDishName');
    if(input){
      var reg = new RegExp('.*'+input+'.*');
      return Dishes.find({"name": reg});
    }
  }
});

Template.entry.events({
  'click .addDishToDiary': function() {
      Meteor.call("addDishToDiary", Template.parentData(0)._id, { id: this._id, name: this.name, weight: 100});
  },
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
});
