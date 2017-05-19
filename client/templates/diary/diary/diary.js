Template.diary.onCreated(
  function diaryOnCreated(){
    Session.set('searchProductName', '');
    Session.set('searchDishName', '');

    $(document).on('click', function(e){
      if ($(e.target).is(':not(.diary-entry, .diary-entry *)')){
        $('.variant').css('display', 'none');
      }else{
        $('.variant').css('display', 'none');
        $(e.target).closest('.diary-entry').find('.variant').css('display', 'inline');
      }
    });
  }
);

Template.diary.helpers({
    diaryEntries: function(){
      var options = {
        sort: { createdAt: -1 }
      };
      return Diary.find({}, options);
    }
});

Template.diary.events({
  'click .addDiaryEntry': function(event) {

      var entry = {
      };

      Meteor.call("addDiaryEntry", entry);
      return false;
  },
});