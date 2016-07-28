
/* =========================================
 *  product detail gallery 
 *  =======================================*/

function productDetailGallery(confDetailSwitch) {
    $('.product__thumbs .thumb:first').addClass('active');
    timer = setInterval(autoSwitch, confDetailSwitch);
    $(".product__thumbs .thumb").click(function (e) {

        switchImage($(this));
        clearInterval(timer);
        timer = setInterval(autoSwitch, confDetailSwitch);
        e.preventDefault();
    }
    );
    $('.mainImage img').hover(function () {
        clearInterval(timer);
    }, function () {
        timer = setInterval(autoSwitch, confDetailSwitch);
    });
    function autoSwitch() {
        var nextThumb = $('.product__thumbs .thumb.active').closest('div').next('div').find('.thumb');
        if (nextThumb.length == 0) {
            nextThumb = $('.product__thumbs  .thumb:first');
        }
        switchImage(nextThumb);
    }

    function switchImage(thumb) {

        $('.product__thumbs .thumb').removeClass('active');
        var bigUrl = thumb.attr('href');
        thumb.addClass('active');
        $('.mainImage img').attr('src', bigUrl);
    }
}

function productQuickViewGallery() {

    $('.quick-view').each(function () {

        var element = $(this);

        element.find('.thumb:first').addClass('active');


        element.find(".thumb").click(function (e) {

            switchImage($(this));
            e.preventDefault();
        }
        );

    });

    function switchImage(thumb) {

        thumb.parents('.quick-view').find('.thumb').removeClass('active');
        var bigUrl = thumb.attr('href');
        thumb.addClass('active');
        thumb.parents('.quick-view').find('.quick-view-main-image img').attr('src', bigUrl);
    }
}

