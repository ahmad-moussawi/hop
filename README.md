![Hop Logo](./hop-logo.png)

a jQuery plugin to highlight important sections of your site, inspired by Google Inbox.
it will create a circle arround your selected element, and overlay the whole page.

## Get Started

Simply call the `hop()` method on your jQuery instance.

### `$.hop(options: Options): jQueryInstance`
return the current jQuery instance

```js
    $('.target-element').hop();
```

> *Note:* if multiple elements selected, Hop will choose the first one.

## Options
The following options are available if you want to adjust it,

### color: string
The overlay color, any valid html color

### radius: number
The radius of the circle, must be a positive number

### opacity: number 
the overlay opacity, `0 > opacity < 1`

### borderWidth: number
the width of the border arround the hop

### borderColor: string
the border color, any valid html color


## API
After calling the `hop()` plugin on a jQuery element, you can get the `Hop` instance in `$(el).data('hop')`


### Usage example

```js
$('.logo').hop();
var hopApi = $('.logo').data('hop');

// move the hope by (20px, 10px) from the current position
hopApi.move(20, 10, true);

// remove it
hopApi.remove();
```

## `Hop` class methods interface

## `remove() : Hop`
Remove and hide the hop, return the current `Hop` instance

## `move(left:number = 0, top:number = 0, relative?:bool = false): Hop`
Move the current hop horizantally or vertically, return the current `Hop` instance

param | description
------| -----------
left  | move the hop to the right, pass a negative value to move it to the left
top   | move the hop to the bottom, pass a negative value to move it to the top
relative | if true, it will move it from the current location, otherwise it will be relative to the current document

