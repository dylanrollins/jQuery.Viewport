# jQuery.Viewport
Currently: `v1.0.0`

Check if elements are within view of the user in the browser by comparing the current web-page's scroll position to the offset of elements on the page.

***
## How To Use

1. Include jQuery & jQuery.Viewport in your web page

```html
<script type='text/javascript' src='http://code.jquery.com/jquery-1.11.1.min.js'></script>
<script type='text/javascript' src='/jQuery.Viewport.min.js?v=1.0.0'></script>
```

2. Call .viewport of the jQuery items you wish to monitor with your settings

Note: _Javascript/jQuery cannot find items unless they have been successfully loaded. I recommend using `$(document).ready()` or `window.onload` to make sure the page loading is complete._

```javascript
$('.jquery-viewport-hide').viewport(options);
```

***
## Options

The viewport function accepts one parameter expecting it to be a plain Javascript object for the options. The items provided are not type-checked to minimize the size of the file, meaning your code could throw errors or not work as intended if you input invalid values.

```javascript
$('.jquery-viewport-hide').viewport({
    class:  'jquery-viewport-visible',
    offset: 0,
    repeat: false,
    binds:  'load scroll touchmove',
    show:   $.noop,
    hide:   $.noop
});
```

or

```javascript
var options = {
    class:  'jquery-viewport-visible',
    offset: 0,
    repeat: false,
    binds:  'load scroll touchmove',
    show:   $.noop,
    hide:   $.noop
};

$('.jquery-viewport-hide').viewport(options);
```
***
### class `string`

Default: `jquery-viewport-visible`

This is the class that will be added/removed when elements are in/out of view. 

Note: _jQuery.Viewport uses the class(es) provided to check if the item was already accepted as in view, therefore this item should never be left empty. You may use the class(es) added to provide additional styling to elements as they enter/exit view, but be aware of how it will effect the elements around it._
***
### offset `integer`

Default: `0`

The amount of pixels to offset the top/bottom of the page, to wait for before adding/removing the class and calling the show/hide functions.

e.g. 200 offset will require the bottom of the element to be 200 pixels from the bottom of the browser before it considers it within view.

***
### repeat `boolean`

Default: `false`

Should the class be added/removed more than once when the element enters/exits view?
***
### binds `string`

Default: `load scroll touchmove`

The binds to attach to the window to detect when it should check if the elements are within view.
***
### show `function`

Default: `$.noop`

The function to callback when an element enters view.

Note: _jQuery.Viewport only passes the current element that has entered within view to the show function as the first and only argument._
***
### hide `function`

Default: `$.noop`

The function to callback when an element exits view.

Notes:
* _This function is only called if repeat is set to true_
* _jQuery.Viewport only passes the current element that has exited from view to the hide function as the first and only argument._