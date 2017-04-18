Router.configure({
  layoutTemplate: 'page-layout',
  loadingTemplate: 'loading',
  notFoundTemplate: 'not-found'
});

Router.route('/', function () {
  this.render('main');
});

Router.route('/diary', function () {
  this.render('diary');
});

Router.route('/admin', function () {
  this.render('admin');
});

Router.route('/login', function () {
  this.render('login-page-layout');
  this.layout();
});

Router.route
