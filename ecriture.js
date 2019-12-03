var jours_ensoleilles = {
   'Incipit' : 'incipit.html',
   'Repas parfait' : 'repas_parfait.txt',
   'Couteau chinois' : 'couteau_chinois.txt',
   'Derniers mots' : 'derniers_mots.txt'
}

var misc = {
   'Stage Crew' : '#',
   'M.' : '#'
}

var histoires = {
   'Jeune garçon' : '#'
}

function render_menu_items(obj, klass) {
   return Object.keys(obj).reduce(function (acc, title) {
      return `${acc}<span class="${klass}" file="${obj[title]}">${title}</span>`;
   }, '');
}

$(document).ready(function() {

   $('#content').css('display', 'flex');
   $('#content').css('flex-direction', 'row');

   // Populate writing menu

   $('#writing_menu').append('<h1>Jours ensoleillés</h1>');
   $('#writing_menu').append(render_menu_items(jours_ensoleilles, 'writing_menu_item'));

   $('#writing_menu').append('<h1>Histoires</h1>');
   $('#writing_menu').append(render_menu_items(histoires, 'writing_menu_item'));

   $('#writing_menu').append('<h1>Misc.</h1>');
   $('#writing_menu').append(render_menu_items(misc, 'writing_menu_item'));

   // Change link color on hover
   $('.writing_menu_item').css('cursor', 'pointer');
   $('.writing_menu_item').on({
      mouseenter: function () { $(this).addClass('writing_menu_item_hover'); },
      mouseleave: function () { $(this).removeClass('writing_menu_item_hover'); }
   });

   // Populate writing display
   $('.writing_menu_item').click(function() {
      // Bold the clicked item
      // $('.writing_menu_item').css('font-weight', 'normal');
      // $(this).css('font-weight', 'bold');

      $('.writing_menu_item').css('text-decoration', 'none');
      $(this).css('text-decoration', 'underline dotted');

      // TEST
      // $('#writing_display').empty();
      // $.ajax({
      //   url: 'https://www.w3.org/TR/PNG/iso_8859-1.txt',
      //   success: function(data) {
      //     var title = $('<h1>Test piece</h1>').hide();
      //     var text = $(`<p>${data}</p>`).hide()
      //     $('#writing_display').append(title, text);
      //     title.fadeIn();
      //     text.fadeIn();
      //   },
      //   error: function(XMLHttpRequest, textStatus, errorThrown) {
      //     var text = $(`<p>Content unavailable</p>`).hide()
      //     $('#writing_display').append(text);
      //     text.fadeIn();
      //   }
      // });

      // Clear and populate display
      // $.get(`./ecriture/${$(this).attr('file')}`, function(data) {
      //    var title = $(`<h1>${$(this).text()}</h1>`).hide();
      //    var text = $(`<p>${data}</p>`).hide()
      //    $('#writing_display').append(title, text);
      //    title.fadeIn();
      //    text.fadeIn();
      // });

      $('#writing_display').empty();
      $.ajax({
        url: `./ecriture/${$(this).attr('file')}`,
        success: function(data) {
          var title = $(`<h1>${$(this).text()}</h1>`).hide();
          var text = $(`<p>${data}</p>`).hide()
          $('#writing_display').append(title, text);
          title.fadeIn();
          text.fadeIn();
        },
        error: function(XMLHttpRequest, textStatus, errorThrown) {
          var text = $(`<p>Content unavailable</p>`).hide()
          $('#writing_display').append(text);
          text.fadeIn();
        }
      });
   });
});
