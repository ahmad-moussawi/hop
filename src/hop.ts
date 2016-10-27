interface Offset {
    top: number,
    left: number
}

interface Options {
    radius: number,
    color: string,
    borderWidth: number,
    borderColor: string,
    opacity: number,
    adjustLeft?: number,
    adjustTop?: number,
}

interface jQuery {
    (selector: string | Object): jQueryInstance,
    extend: Function,
    fn: any
}

interface jQueryInstance {
    width: Function,
    height: Function,
    offset: Function,
    each: Function,
    append: Function,
    css: Function,
    remove: Function
}

module HopPlugin {

    export class Hop {

        protected target: jQueryInstance;
        protected targetOffset: Offset;
        protected targetWidth: number;
        protected targetHeight: number;
        protected documentWidth: number;
        protected documentHeight: number;
        protected defaultOptions: Options = {
            borderColor: '#fff',
            color: '#388E3C',
            radius: 100,
            borderWidth: 2,
            opacity: 0.8,
            adjustLeft: 0,
            adjustTop: 0
        };

        private static outerEl: jQueryInstance = null;
        private static innerEl: jQueryInstance = null;


        constructor(private $: jQuery) {

        }

        public init(instance: jQueryInstance, options?: Options) {

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
                marginTop: - options.radius / 2,
                marginLeft: - options.radius / 2,
                position: 'fixed',
                zIndex: 999,
                borderRadius: '50%',
                borderWidth: options.borderWidth,
                borderStyle: 'solid',
                borderColor: options.borderColor,
                boxSizing: 'content-box',
            });

            Hop.innerEl.css({
                width: options.radius + options.borderWidth * 2,
                height: options.radius + options.borderWidth * 2,
                position: 'absolute',
                border: `${maxRadius}px solid ${options.color}`,
                marginTop: -maxRadius - options.borderWidth,
                marginLeft: -maxRadius - options.borderWidth,
                borderRadius: '50%',
                opacity: options.opacity,
                boxSizing: 'content-box',
            });

        }

        public maxRadius(width, height) {
            return Math.ceil(Math.sqrt(Math.pow(width, 2) * Math.pow(height, 2)));
        }

        remove(): Hop {
            Hop.outerEl.remove();
            Hop.outerEl = null;
            return this;
        }        

        move(left = 0, top = 0, relative = false): Hop {

            if (relative === true) {


                var topSign = top > 0 ? '+' : '-';
                var leftSign = left > 0 ? '+' : '-';

                Hop.outerEl.css({
                    left: `${leftSign}=${left}`,
                    top: `${topSign}=${top}`,
                });

                return this;

            }

            Hop.outerEl.css({
                left,
                top
            });

            return this;


        }

    }

    export class Startup {
        public static main() {

            if (!window['jQuery']) {
                console.error('Hop requires jQuery.');
                return;
            }

            var $: jQuery = window['jQuery'];

            $.fn.hop = function (options: Options) {

                if (this.length === 0) {
                    // skip if no elements found
                    return;
                }

                var instance = this.length > 1 ? $(this[0]) : this;
                // make sure we are passing the first element
                var hop = new Hop($);
                hop.init(instance, options);
                instance.data('hop', hop);
                return instance;
            }

        }
    }

}

HopPlugin.Startup.main();