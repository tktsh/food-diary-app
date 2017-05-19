Template.admin.onCreated(
	function adminOnCreated(){
	  Session.set('searchProductName', '');
	  Session.set('searchDishName', '');

	  $(document).on('click', function(e){
	    if ($(e.target).is(':not(.control-panel-dish-item, .control-panel-dish-item *)')){
	      $('.variant').css('display', 'none');
	    }else{
	      $('.variant').css('display', 'none');
	      $(e.target).closest('.control-panel-dish-item').find('.variant').css('display', 'inline');
	    }
	  });
	}
);