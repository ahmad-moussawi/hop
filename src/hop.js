var HopPlugin;
(function (HopPlugin) {
    var Hop = (function () {
        function Hop($) {
            this.$ = $;
            this.defaultOptions = {
                borderColor: '#fff',
                color: '#388E3C',
                radius: 100,
                borderWidth: 2,
                opacity: 0.8,
                adjustLeft: 0,
                adjustTop: 0
            };
        }
        Hop.prototype.init = function (instance, options) {
            options = this.$.extend(this.defaultOptions, options);
            var $window = this.$(window);
            this.documentHeight = $window.height();
            this.documentWidth = $window.width();
            this.targetHeight = instance.height();
            this.targetWidth = instance.width();
            this.targetOffset = instance.offset();
            if (Hop.outerEl === null) {
                Hop.outerEl = this.$('<div class="hop-outer" />');
                Hop.innerEl = this.$('<div class="hop-inner" />');
                Hop.outerEl.append(Hop.innerEl);
                this.$('body').append(Hop.outerEl);
            }
            var maxRadius = this.maxRadius(this.documentWidth - this.targetOffset.left, this.documentHeight - this.targetOffset.top);
            Hop.outerEl.css({
                top: Math.ceil(options.adjustTop + this.targetOffset.top + this.targetHeight / 2),
                left: Math.ceil(options.adjustLeft + this.targetOffset.left + this.targetWidth / 2),
                width: options.radius,
                height: options.radius,
                marginTop: -options.radius / 2,
                marginLeft: -options.radius / 2,
                position: 'fixed',
                zIndex: 999,
                borderRadius: '50%',
                borderWidth: options.borderWidth,
                borderStyle: 'solid',
                borderColor: options.borderColor
            });
            Hop.innerEl.css({
                width: options.radius + options.borderWidth * 2,
                height: options.radius + options.borderWidth * 2,
                position: 'absolute',
                border: maxRadius + "px solid " + options.color,
                marginTop: -maxRadius - options.borderWidth,
                marginLeft: -maxRadius - options.borderWidth,
                borderRadius: '50%',
                opacity: options.opacity,
            });
        };
        Hop.prototype.maxRadius = function (width, height) {
            return Math.ceil(Math.sqrt(Math.pow(width, 2) * Math.pow(height, 2)));
        };
        Hop.prototype.remove = function () {
            Hop.outerEl.remove();
            Hop.outerEl = null;
        };
        Hop.prototype.move = function (left, top) {
            this.moveLeft(left);
            this.moveTop(top);
        };
        Hop.prototype.moveLeft = function (x) {
            Hop.outerEl.css({
                left: x > 0 ? "+=" + x : "-=" + x
            });
        };
        Hop.prototype.moveTop = function (x) {
            Hop.outerEl.css({
                top: x > 0 ? "+=" + x : "-=" + x
            });
        };
        Hop.prototype.goTo = function (left, top) {
            Hop.outerEl.css({
                left: Math.ceil(left + this.targetHeight / 2),
                top: Math.ceil(top + this.targetHeight / 2)
            });
        };
        Hop.outerEl = null;
        Hop.innerEl = null;
        return Hop;
    })();
    HopPlugin.Hop = Hop;
    var Startup = (function () {
        function Startup() {
        }
        Startup.main = function () {
            if (!window['jQuery']) {
                console.error('Hop requires jQuery.');
                return;
            }
            var $ = window['jQuery'];
            $.fn.hop = function (options) {
                if (this.length === 0) {
                    // skip if no elements found
                    return;
                }
                var instance = this.length > 1 ? $(this[0]) : this;
                // make sure we are passing the first element
                var hop = new Hop($);
                hop.init(instance, options);
                instance.hop = hop;
                return instance;
            };
        };
        return Startup;
    })();
    HopPlugin.Startup = Startup;
})(HopPlugin || (HopPlugin = {}));
HopPlugin.Startup.main();
//# sourceMappingURL=hop.js.map