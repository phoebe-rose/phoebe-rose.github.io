var films = {
   'À bout de souffle (1960)' : {
      'breathless/champs_elysees.jpeg': ''
   },
   'Cléo de 5 à 7 (1962)' : {},
   'Belle de jour (1967)' : {},
   'La Collectionneuse (1967)' : {},
   'Les Demoiselles de Rochefort (1967)' : {},
   'Le Genou de Claire (1970)' : {},
   'Last Tango in Paris (1972)' : {},
   'Chungking Express (1994)': {},
   'Pulp Fiction (1994)' : {},
   'Whisper of the Heart (1995)' : {},
   'Girl with a Pearl Earring (2003)' : {},
   'Lost in Translation (2003)' : {},
   'Howl\'s Moving Castle (2004)' : {},
   'Black Swan (2010)' : {},
   'Cold War (2018)' : {
      'cold-war/field.jpg' : '',
      'cold-war/regard.jpg' : '',
      'cold-war/eclisse.jpg' : '',
      'cold-war/micro.jpg' : ''
   }
}

function render_films(obj, klass) {
   return Object.keys(obj).reduce(function (acc, key) {
      return `${acc}<span class="${klass}">${key}</span>`;
   }, '');
}

function render_thumbnails(obj, album_name, klass) {
   return Object.keys(obj).reduce(function (acc, path) {
      return `${acc}<img src="./films/${path}" filename="${path}" class="${klass}" />`;
   }, '');
}

$(document).ready(function() {

   $('#content').css('display', 'flex');
   $('#content').css('flex-direction', 'row');

   // Populate album menu
   $('#album_menu').append(render_films(films, 'album_item'));

   // Cursor, hover
   $('.album_item').css('cursor', 'pointer');
   $('.album_item').on({
      mouseenter: function () { $(this).addClass('album_item_hover'); },
      mouseleave: function () { $(this).removeClass('album_item_hover'); }
   });

   // Populate thumbnail gallery
   $('.album_item').click(function () {
      // Mark link in menu
      $('.album_item').css('text-decoration', 'none');
      $(this).css('text-decoration', 'underline dotted');

      var album_name = $(this).text();
      var album = films[album_name];

      // Clear image display
      $('#image_display').fadeOut(300, function () {
         $(this).empty();
         $(this).fadeIn(300);
      })
      // Clear thumbnail gallery
      $('#image_menu').fadeOut(300, function() {
         $(this).empty();
         $(this).fadeIn(300);

         // Render thumbnails, re-populate gallery
         var thumbnails = $(render_thumbnails(album, album_name, 'thumbnail')).hide();
         $('#image_menu').append(thumbnails);
         thumbnails.fadeIn(300);

         $('img.thumbnail').on({
            mouseenter: function () { $(this).animate({ opacity: 1.0 }, 300); },
            mouseleave: function () { $(this).animate({ opacity: 0.5 }, 150); }
         });


         // Add listeners to thumbnails
         $('img.thumbnail').click(function () {
            $('#image_display').empty();

            var image = $(`<img src="${$(this).attr('src')}" class="displayed_image" />`).hide();
            var caption = $(`<div class="image_caption">${album[$(this).attr('filename')]}</div>`).hide();

            $('#image_display').append(image, caption);

            image.fadeIn(300);
            caption.fadeIn(300);
         });

         $('img.thumbnail').first().click();
      });
   });




});
