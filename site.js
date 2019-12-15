var pages = {
   'écriture' : 'ecriture.html',
   'desseins' : 'desseins.html',
   'pensées' : 'pensees.html',
   'photos' : 'photos.html',
   'livres' : 'livres.html',
   'musique' : 'musique.html',
   'films' : 'films.html'
}

$(document).ready(function() {

   // Populate nav menu
   $('#nav_menu').append(render_links(pages, 'nav_menu_item'));

   document.title = '✴';
});

function render_links(obj, klass) {
   return Object.keys(obj).reduce(function (acc, title) {
      return `${acc}<a href="${obj[title]}" class="${klass}">${title}</a>`
   }, '');
}
