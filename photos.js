var photos = {
   'B/W' : {
      'sculpture.jpg' : '',
      'roses.png' : '',
      'hallway.jpg' : '',
      'multiverse-1.png' : '',
      'portrait-1.jpg' : '',
      'basketball.jpg' : '',
      'multiverse-2.png' : '',
      'flower.png' : '',
   },
   'Campus' : {
      'campus - 1.jpg' : '',
      'campus - 2.jpg' : '',
      'campus - 3.jpg' : '',
      'campus - 4.jpg' : '',
      'campus - 5.jpg' : 'Sun rising over Commons',
      'campus - 6.jpg' : '',
      'campus - 7.jpg' : '',
      'campus - 8.jpg' : '',
      'campus - 9.jpg' : '',
      'campus - 10.jpg' : '',
      'campus - 11.jpg' : '',
      'campus - 12.jpg' : '',
      'campus - 13.jpg' : '',
      'campus - 14.jpg' : '',
      'campus - 15.jpg' : 'Physics in the summer',
      'campus - 16.jpg' : '',
      'campus - 17.jpg' : '',
      'campus - 18.jpg' : '',
      'campus - 19.jpg' : '',
      'campus - 20.jpg' : '',
      'campus - 21.jpg' : '',
      'campus - 22.jpg' : '',
      'campus - 23.jpg' : '',
      'campus - 24.jpg' : '',
      'campus - 25.jpg' : '',
      'campus - 26.jpg' : '',
      'campus - 27.jpg' : '',
      'campus - 28.jpg' : '',
      'campus - 29.jpg' : '',
      'campus - 30.jpg' : '',
      'campus - 31.jpg' : '',
      'campus - 32.jpg' : ''
   },
   'Misc.' : {
      'misc - 1.jpg' : '',
      'misc - 2.jpg' : '',
      'misc - 3.jpg' : '',
      'misc - 4.jpg' : '',
      'misc - 5.jpg' : '',
      'misc - 6.jpg' : 'Archives in the summer',
      'misc - 7.jpg' : '',
      'misc - 8.jpg' : '',
      'misc - 9.jpg' : '',
      'misc - 10.jpg' : '',
      'misc - 11.jpg' : '',
      'misc - 12.jpg' : '',
      'misc - 13.jpg' : '',
      'misc - 14.jpg' : '',
      'misc - 15.jpg' : '',
      'misc - 16.jpg' : '',
      'misc - 17.jpg' : '',
      'misc - 18.jpg' : '',
      'misc - 19.jpg' : '',
      'misc - 20.jpg' : ''
   },
   'Travels' : {
      'travels - 1.jpg' : 'Driving the perimeter of Oahu',
      'travels - 2.jpg' : '',
      'travels - 3.jpg' : '',
      'travels - 4.jpg' : '',
      'travels - 5.jpg' : '',
      'travels - 6.jpg' : '',
      'travels - 7.jpg' : 'Montpellier – Promenade du Peyrou',
      'travels - 8.jpg' : '',
      'travels - 9.jpg' : 'Place du Panthéon',
      'travels - 10.jpg' : 'Belleville',
      'travels - 11.jpg' : '',
      'travels - 12.jpg' : '',
      'travels - 13.jpg' : ''
   }
}

var album_path = {
   'B/W' : 'bw/',
   'Campus' : 'campus/',
   'Misc.' : 'misc/',
   'Travels' : 'travels/'
}

function render_albums(obj, klass) {
   return Object.keys(obj).reduce(function (acc, key) {
      return `${acc}<span class="${klass}">${key}</span>`;
   }, '');
}

function render_thumbnails(obj, album_name, klass) {
   return Object.keys(obj).reduce(function (acc, path) {
      return `${acc}<img src="./photos/${album_path[album_name]}/${path}" filename="${path}" class="${klass}" />`;
   }, '');
}

$(document).ready(function() {

   $('#content').css('display', 'flex');
   $('#content').css('flex-direction', 'row');

   // Populate album menu
   $('#album_menu').append(render_albums(photos, 'album_item'));

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
      var album = photos[album_name];

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
