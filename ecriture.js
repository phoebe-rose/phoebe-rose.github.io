var jours_ensoleilles = {
   'Incipit' : 'incipit.html',
   'The Whitney' : 'whitney.html',
   'Repas parfait' : 'repas_parfait.html',
   'Couteau chinois' : 'couteau_chinois.html',
   'Derniers mots' : 'derniers_mots.html'
}

var misc = {
   'Crew' : 'stage_crew.html',
   'French': 'french.html'
}

var histoires = {
   'Jeune garçon I' : 'jeune_garcon_1.html',
   'Jeune garçon II' : 'jeune_garcon_2.html'
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
      $('.writing_menu_item').css('text-decoration', 'none');
      $(this).css('text-decoration', 'underline dotted');

      // Clear and populate display
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
