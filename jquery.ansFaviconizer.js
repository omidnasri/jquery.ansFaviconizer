/**
 * ansFaviconizer jQuery plugin - v.0.0.3
 *
 * ansFaviconizer is released under the GNU Affero GPL version 3
 *
 * More information at http://www.gnu.org/licenses/agpl-3.0.html
 *
 * USAGE EXAMPLE:
 * $(document).ready(function () {
 *		$('a.external').ansFaviconizer({
 *			where: 'prepend', //see below possible values
 *			className: 'myclass' //this class will be applied to the favicon img
 *		});
 *	});
 */

(function($) {
	$.fn.ansFaviconizer = function(customOptions) {

		var options = $.extend({}, $.fn.ansFaviconizer.defaultOptions, customOptions);

		if($.inArray(options.where, ['prepend','append','before','after']) === -1){
			$.error('Bad config. Option "where" must be one of this values: prepend, append, before, after');
		}
		
		return this.each(function() { 
			var $this = $(this);
			var domain = $this.attr('href').match(/https?:\/\/[^\/]+/);

			if (domain) {
				var custom_icon = $this.attr('data-ansFavicon');
				var favicon_url = custom_icon ? custom_icon : domain + '/favicon.ico';

				var img = $('<img>', {
					'class': options.className,
					'src': favicon_url
				}).one('error', function () {
					if (!custom_icon) {
						$(this).attr('src', 'http://www.google.com/s2/favicons?domain_url=' + domain);
					}
				});

				$this[options.where](img);
			}
		});
	};
 
	$.fn.ansFaviconizer.defaultOptions = {
		className : 'ansFavicon',
		where: 'prepend' // possible values: prepend, append, before, after
	};
})(jQuery);
