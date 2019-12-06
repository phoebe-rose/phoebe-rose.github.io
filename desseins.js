var drawings = {
   'Portraiture' : {
      'el greco 1.jpg' : '',
      'sculpture.jpg' : '',
      'giuseppe.jpg' : '',
      'l.jpg' : '',
      'jane.jpg' : '',
      'misc-1.png' : '',
      'misc-2.png' : '',
      'slumber.png' : '',
   },
   'Danse' : {
      'danse-2.png' : '',
      'danse-1.png' : '',

      'danse-3.png' : '',
      'danse-4.png' : '',
      'danse-5.png' : ''
   },
   // 'School Days' : {
   //    'school life.png' : '',
   //    'd.png' : '',
   //    'b5.png' : '',
   //    'a.png' : '',
   //    'c copy.png' : '',
   //    'f.png' : '',
   //    'e.png' : ''
   // },
   'Misc.' : {
      'c-1.png' : '',
      'sophie.png' : '',
      'sylvia.png' : '',
      'une lettre de suicide.png' : '',
      'another_bust.png' : '',
      '5 dos of cumber.png' : '',
      // 'walking.png' : '',
      'chimio.png' : ''
   },
   'Cartoons' : {
      'claudia at vanity desk.png' : ''
      // '11.jpg' : '',
      // '9.jpg' : ''
   }
}

var album_path = {
   'Portraiture' : 'portraiture/',
   'Misc.' : 'misc/',
   'Danse' : 'danse/',
   'School Days' : 'school_days/',
   'Cartoons' : 'cartoons/'
}

function render_albums(obj, klass) {
   return Object.keys(obj).reduce(function (acc, key) {
      return `${acc}<span class="${klass}">${key}</span>`;
   }, '');
}

function render_thumbnails(obj, album_name, klass) {
   return Object.keys(obj).reduce(function (acc, path) {
      return `${acc}<img src="./drawings/${album_path[album_name]}/${path}" filename="${path}" class="${klass}" />`;
   }, '');
}

$(document).ready(function() {

   $('#content').css('display', 'flex');
   $('#content').css('flex-direction', 'row');

   // Populate album menu
   $('#album_menu').append(render_albums(drawings, 'album_item'));

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
      var album = drawings[album_name];

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

         // $('img.thumbnail').hover(function () {
         //    $(this).animate({ opacity: 1.0 }, 500);
         // });

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
