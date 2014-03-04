//=*****************************************************************************************************************************************************
//= ppPopOut PLUGIN
//======================================================================================================================================================
//======================================================================================================================================================
$.fn.precisionPopOut = function (settings) {

    var config = {
        inlineCSS: false,
        markUpInc: true,
        blackOut: false,
        speed: 0.35,
        responsive: true,
        popup: false,
        popClickText: 'Help',
        popOutDirection: 'left',
        resWindowWidth: 600,
        loadTweenMax: false,
        loadRotatePlugin: false,
        width: '70%',
        height: '100%',
        backgroundColor: '#333',
        textColor: '#fff',
        padding: 20,
        container: '#Container',
        clickBackground: '#ff3600',
        clickColor: '#fff',
        clickHeightH: 30,
        clickWidthH: 120,
        clickHeightV: 120,
        clickWidthV: 30,
        clickDefaultPos: 'top',
        clickResPos: 'bottom'
    };

    if (settings) {
        $.extend(config, settings);
    }



    //= MOBILE DEVICE CHECK
    //==============================================================================================================================================
    var mobileDevice = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent); //Check for mobile devices

    //= ********************************************************************************************************************************************
    //= PLUGIN EACH FUNCTION
    //==============================================================================================================================================
    return this.each(function () {
        var speedMilli = config.speed * 1000;
        var _this = $(this);
        var body = $('body');
        var popClick, popText, close;

        if (config.markUpInc == false) {
            _this.wrap('<div id="ppPopOut"></div>');
            _this = _this.parent();

            //= Append The Close Handler
            //========================================================================================================
            _this.prepend('<div id="ppClose">X</div>');

            //= Append The Click Handler
            //========================================================================================================
            $('<div id="ppPopClick"><span class="ppPopText">' + config.popClickText + '</span></div>').insertAfter(_this);

            console.log('Insert Before');
            popClick = _this.next('#ppPopClick');
            popText = popClick.find('.ppPopText');
            close = _this.find('#ppClose');
        } else {
            popClick = $('#ppPopClick');
            popText = $('.ppPopText');
            close = $('#ppClose');
        }

        if (config.blackOut == true) {
            $('<div class="ppFadeOut"></div>').insertBefore(_this);

            var ppFadeOut = $('.ppFadeOut');
            ppFadeOut.css({
                display: 'none',
                opacity: 0,
                height: '100%',
                width: '100%',
                position: 'fixed',
                zIndex: 98,
                background: '#333',
                top: 0,
                left: 0
            });
        }

        var ppPopOut = _this;
        var ppClose = _this.find('#ppClose');
        var container = $(config.container);
        var containerPos = container.css('position');


        console.log('container position: ' + containerPos);

        //= Load Tween Max
        //========================================================================================================
        if (config.loadTweenMax == true) {
            var loadTweenMax = document.createElement('script');
            $(loadTweenMax).attr('src', 'http://cdnjs.cloudflare.com/ajax/libs/gsap/latest/TweenMax.min.js');

            $(loadTweenMax).appendTo('head');
        }


        //= SET VERTICAL POSITION OF CLICK
        //===========================================================================
        popClick.setVertPos();

        //= SHOW FORM FUNCTIONS
        //===========================================================================
        var showForm = function () {

            if (config.popOutDirection == 'top') {
                TweenMax.to(ppPopOut, config.speed, {
                    top: 0,
                    boxShadow: '0 0 36px 3px #000'
                });
                container.css({
                    position: 'absolute'
                });
                TweenMax.to(container, config.speed, {

                    top: config.height,
                    bottom: 'auto'
                });
            } else if (config.popOutDirection == 'bottom') {
                TweenMax.to(ppPopOut, config.speed, {
                    bottom: 0,
                    boxShadow: '0 0 36px 3px #000'
                });
                TweenMax.to(container, config.speed, {
                    position: 'relative',
                    bottom: config.height,
                    top: 'auto'
                });
            } else if (config.popOutDirection == 'left') {
                TweenMax.to(ppPopOut, config.speed, {
                    left: 0,
                    boxShadow: '0 0 36px 3px #000'
                });
                TweenMax.to(container, config.speed, {
                    position: 'relative',
                    left: config.width
                });
            } else {
                TweenMax.to(ppPopOut, config.speed, {
                    right: 0,
                    boxShadow: '0 0 36px 3px #000'
                });
                TweenMax.to(container, config.speed, {
                    position: 'relative',
                    left: '-' + config.width
                });
            }

            body.css({
                overflow: 'hidden'
            });

            if (config.blackOut) {
                ppFadeOut.css({
                    display: 'block'
                });
                TweenMax.to(ppFadeOut, config.speed, {
                    opacity: 0.7
                });
            }
        };

        //= HIDE FORM FUNCTIONS
        //===========================================================================
        var hideForm = function () {
            if (config.popOutDirection == 'top') {
                TweenMax.to(ppPopOut, config.speed, {
                    top: '-' + config.height
                });
                TweenMax.to(container, config.speed, {
                    position: 'relative',
                    top: 0
                });
            } else if (config.popOutDirection == 'bottom') {
                TweenMax.to(ppPopOut, config.speed, {
                    bottom: '-' + config.height
                });
                TweenMax.to(container, config.speed, {
                    position: 'relative',
                    bottom: 0
                });
                setTimeout(function () {
                    container.css({
                        bottom: 'auto'
                    });
                }, speedMilli*1.1);
            } else if (config.popOutDirection == 'left') {
                TweenMax.to(ppPopOut, config.speed, {
                    left: '-' + config.width
                });
                TweenMax.to(container, config.speed, {
                    position: 'relative',
                    left: 0
                });
            } else {
                TweenMax.to(ppPopOut, config.speed, {
                    right: '-' + config.width
                });
                TweenMax.to(container, config.speed, {
                    position: 'relative',
                    left: 0
                });
            }

            TweenMax.to(ppPopOut, config.speed, {
                boxShadow: 'none'
            });

            setTimeout(function () {
                body.css({
                    overflow: 'auto'
                });
            }, speedMilli*1.1);

            if (config.blackOut) {
                TweenMax.to(ppFadeOut, config.speed, {
                    opacity: 0
                });
                setTimeout(function () {
                    ppFadeOut.css({
                        display: 'none'
                    });
                }, speedMilli*1.1);
            }
        };

        //= CLICK FUNCTIONS
        //===========================================================================
        close.on('click', function () {
            popClick.click();
            state = 0;

            console.log('Close Form');
        });

        var state = 0;
        popClick.on('click', function () {

            if (state == 0) {
                console.log('Show Form, state= ' + state);
                showForm();
                state = 1;
                console.log('State= ' + state);

            } else {
                console.log('Hide Form');
                hideForm();
                state = 0
            }
            console.log('Done');

        });


        //= SET THE CLICK POSITION
        //===========================================================================
        var clickDefaultPos = function () {
            if (config.clickDefaultPos == 'top') {
                popClick.css({
                    top: 0,
                    bottom: 'auto',
                    height: config.clickHeightH,
                    width: config.clickWidthH
                });
                popClick.setHorizPos();

                //= ROTATE TEXT 0 DEGREES
                popText.css({
                    rotate: 0,
                    transformOrigin: '0 0',
                    left: 0,
                    width: config.clickWidthH,
                    lineHeight: config.clickHeightH + 'px'
                });
            } else if (config.clickDefaultPos == 'bottom') {
                popClick.css({
                    bottom: 0,
                    top: 'auto',
                    height: config.clickHeightH,
                    width: config.clickWidthH
                });
                popClick.setHorizPos();

                //= ROTATE TEXT 0 DEGREES
                popText.css({
                    rotate: 0,
                    transformOrigin: '0 0',
                    left: 0,
                    width: config.clickWidthH,
                    lineHeight: config.clickHeightH + 'px'
                });
            } else if (config.clickDefaultPos == 'left') {
                popClick.css({
                    left: 0,
                    right: 'auto',
                    top: 'auto',
                    height: config.clickHeightV,
                    width: config.clickWidthV
                });

                //= ROTATE TEXT 90 DEGREES
                popText.css({
                    rotate: 90,
                    transformOrigin: '0 0',
                    left: 25,
                    width: config.clickHeightV,
                    lineHeight: config.clickWidthV + 'px'
                });
                popClick.setVertPos();
            } else {
                popClick.css({
                    right: 0,
                    left: 'auto',
                    top: 'auto',
                    height: config.clickHeightV,
                    width: config.clickWidthV
                });

                //= ROTATE TEXT 90 DEGREES
                popText.css({
                    rotate: 90,
                    transformOrigin: '0 0',
                    left: 25,
                    width: config.clickHeightV,
                    lineHeight: config.clickWidthV + 'px'
                });
                popClick.setVertPos('right');
            }
        };

        var clickResponsivePos = function () {
            if (config.clickResPos == 'top') {
                popClick.css({
                    top: 0,
                    bottom: 'auto',
                    height: config.clickHeightH,
                    width: config.clickWidthH
                });
                popClick.setHorizPos();

                //= ROTATE TEXT 0 DEGREES
                popText.css({
                    rotate: 0,
                    transformOrigin: '0 0',
                    left: 0,
                    width: config.clickWidthH,
                    lineHeight: config.clickHeightH + 'px'

                });
            } else if (config.clickResPos == 'bottom') {
                popClick.css({
                    bottom: 0,
                    top: 'auto',
                    height: config.clickHeightH,
                    width: config.clickWidthH
                });
                popClick.setHorizPos();

                //= ROTATE TEXT 0 DEGREES
                popText.css({
                    rotate: 0,
                    transformOrigin: '0 0',
                    left: 0,
                    width: config.clickWidthH,
                    lineHeight: config.clickHeightH + 'px'
                });
            } else if (config.clickResPos == 'left') {
                popClick.css({
                    left: 0,
                    right: 'auto',
                    top: 'auto',
                    height: config.clickHeightV,
                    width: config.clickWidthV
                });
                popClick.setVertPos();

                //= ROTATE TEXT 90 DEGREES
                popText.css({
                    rotate: 90,
                    transformOrigin: '0 0',
                    left: 25,
                    width: config.clickHeightV,
                    lineHeight: config.clickWidthV + 'px'
                });

            } else {
                popClick.css({
                    right: 0,
                    left: 'auto',
                    top: 'auto',
                    height: config.clickHeightV,
                    width: config.clickWidthV

                });
                popClick.setVertPos();

                //= ROTATE TEXT 90 DEGREES
                popText.css({
                    rotate: 90,
                    transformOrigin: '0 0',
                    lineHeight: config.clickHeightV + 'px',
                    left: 25,
                    width: config.clickHeightV
                });
                popClick.setVertPos('right');
            }
        };

        //= SET THE DIRECTION FOR THE SLIDE OUT
        //===========================================================================
        var setPopDirection = function () {
            if (config.popOutDirection == 'top') {
                ppPopOut.css({
                    top: '-' + config.height,
                    left: 0
                });
            } else if (config.popOutDirection == 'bottom') {
                ppPopOut.css({
                    bottom: '-' + config.height,
                    left: 0
                });
            } else if (config.popOutDirection == 'left') {
                ppPopOut.css({
                    left: '-' + config.width,
                    top: 0
                });
            } else {
                ppPopOut.css({
                    right: '-' + config.width,
                    top: 0
                });
            }
        };

        //= SET THE CSS FOR THE SLIDE OUT AND CLICK
        //===========================================================================
        var setCSS = function () {
            ppPopOut.css({
                display: 'block',
                opacity: 1,
                position: 'fixed',
                height: config.height,
                width: config.width,
                background: config.backgroundColor,
                zIndex: 9999,
                padding: config.padding,
                color: config.textColor,
                overflowY: 'auto',
                boxSizing: 'border-box'
            });
            ppClose.css({
                display: 'block',
                position: 'absolute',
                top: 0,
                right: 0,
                height: 50,
                width: 50,
                fontSize: 30,
                color: '#FFF',
                background: '#333',
                lineHeight: '50px',
                textAlign: 'center',
                zIndex: 999,
                cursor: 'pointer'
            });
            popText.css({
                display: 'block',
                position: 'relative',
                textAlign: 'center',
                color: config.textColor,
                fontWeight: 'bold',
                lineHeight: config.clickWidth + 'px'
            });
            popClick.css({
                background: config.clickBackground,
                zIndex: 99,
                position: 'fixed',
                cursor: 'pointer',
                color: config.clickColor
            });

            clickDefaultPos();
            setPopDirection();

            if ($(window).width() <= config.resWindowWidth) {
                popClick.css({
                    zIndex: 99,
                    position: 'fixed',
                    cursor: 'pointer',
                    color: config.clickColor
                });

                clickResponsivePos();
            }
        };

        if (config.inlineCSS == true) {
            setCSS();
        }

        if (config.responsive == true) {
            setCSS();
            $(window).resize(function () {
                setCSS();
            });
        }
    });
};

//= GET TRANSFORM PROPERTIES FUNCTION
//===========================================================================
function getTransformProperty(element) {
    var properties = ['transform', 'WebkitTransform',
        'MozTransform', 'msTransform',
        'OTransform'];
    var p;
    while (p = properties.shift()) {
        if (element.style[p] !== undefined) {
            return p;
        }
    }
    return false;
}

//= SET NEW CSS HOOK TO ROTATE TEXT
//===========================================================================
$.cssHooks['rotate'] = {
    get: function (elem, computed, extra) {
        var property = getTransformProperty(elem);
        if (property) {
            return elem.style[property].replace(/.*rotate\((.*)deg\).*/, '$1');
        } else {
            return '';
        }
    },
    set: function (elem, value) {
        var property = getTransformProperty(elem);
        if (property) {
            value = parseInt(value);
            $(elem).data('rotation', value);
            if (value == 0) {
                elem.style[property] = '';
            } else {
                elem.style[property] = 'rotate(' + value % 360 + 'deg)';
            }
        } else {
            return '';
        }
    }
};
$.fx.step['rotate'] = function (fx) {
    $.cssHooks['rotate'].set(fx.elem, fx.now);
};

//= SET VERTICAL POSITION METHOD
//===========================================================================
$.fn.setVertPos = function (pos) {
    var _this = $(this);
    var top = ($(window).height() - _this.height()) / 2;

    console.log('Window Height = ' + $(window).height() + ', PopHeight = ' + _this.height() + ', top position = ' + top + ', which direction = ' + pos);

    if (pos == 'right') {
        _this.css({
            right: 0,
            bottom: top,
            left: 'auto'
        });
    } else {
        _this.css({
            left: 0,
            bottom: top
        });
    }
};

//= SET HORIZONTAL POSITION METHOD
//===========================================================================
$.fn.setHorizPos = function (pos) {
    var _this = $(this);
    var left = ($(window).width() - _this.width()) / 2;

    console.log('Window width = ' + $(window).width() + ', PopWidth = ' + _this.width() + ', left position = ' + left);

    if (pos == 'right') {
        _this.css({
            right: left
        });
    } else {
        _this.css({
            left: left
        });
    }
};
