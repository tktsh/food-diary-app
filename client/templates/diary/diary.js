Template.diary.helpers({
    diaryEntries: function(){
      return Diary.find();
    }
});

Template.diary.events({
  'click .addDiaryEntrie': function(event) {

      var entrie = {
        authorID: this.userId,
        createdAt: new Date()
      };

      Meteor.call("addDiaryEntrie", entrie);
      return false;
  },
  'click .deleteCurrentEntrie': function(event) {
      Meteor.call("deleteDiaryEntrie", this._id);
      return false;
  },
});
