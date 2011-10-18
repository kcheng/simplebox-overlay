// EXAMPLES: $('.shareEmail').simplebox({isEmail:true, url: 'http://www.yahoo.com'});
// click on element with classname 'shareEmail', overlay will be appended to body and popup with yahoo's web site.

(function ($) {

    var simpleoverlay = simplebox = loading = seoName = null;

    // $.fn is the object we add our custom functions to
    $.fn.simplebox = function (options) {
        this.each(function () {
            var o = $.extend({}, $.simplebox.defaults, options || {}),
                obj = $(this),
                href = o.url;

            obj.click(function () {
                createOverlay(href);
                if (o.isEmail) { seoName = obj.closest('.media-column').find('.seoName').attr('id'); }
                return false;
            })
        });
    };

    function insert(data) {
        var boxContent = simplebox.append(data).find('div:first').hide();
        $('#simplebox .loading').hide();
        boxContent.fadeIn();

        if (seoName) { GLGInc.emailPopup(seoName); }

        $('.close', boxContent).click(function () {
            $.simplebox.closeOverlay();
            return false;
        })
    }

    function createOverlay(url) {
        simpleoverlay = $('<div id="simpleoverlay"></div>').appendTo('body'),
        simplebox = $('<div id="simplebox"><span class="loading"></span></div>').appendTo('body');
        $.post(url, function (data) {
            insert(data);
        });
    };

    // Public Variables and Methods
    $.simplebox = {
        defaults: {
            isEmail: false,
            url: ''
        },

        closeOverlay: function () {
            simpleoverlay.fadeOut().remove();
            simplebox.fadeOut().remove();
        },

        autoOpen: function (url) {
            createOverlay(url);
        }
    };

})(jQuery);

