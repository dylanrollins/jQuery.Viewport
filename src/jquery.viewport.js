//  Make sure we have the jQuery library
//  to build off of.
if ( typeof jQuery === 'undefined' )
{
    throw new Error( 'jQuery.Viewport require jQuery to work properly, please make sure to include it before jQuery.Viewport is loaded.' );
}

( function( $ ) {
    //  jQuery.viewport 
    $.fn.viewport = function( Options = {} ) {
        //  Default setting configuration
        var Settings = {
            class:  'jquery-viewport-visible',
            offset: 0,
            repeat: false,
            binds:  'load scroll touchmove',
            show:   $.noop,
            hide:   $.noop
        };
        
        //  If we don't have an object for our
        //  configuration, ignore it and set it
        //  to a plain object before we merge
        //  it with our defaults
        if ( !$.isPlainObject( Options ) )
        {
            Options = {};
        }
        
        Options = $.extend( {} , Settings , Options );
        
        //  Store our elements from jQuery, fetch
        //  the height of the window, then determine
        //  the best scroll object based on the 
        //  browser's document element
        var Elements     = this,
            WindowHeight = $( window ).height(),
            ScrollObject = $( document.documentElement );
        
        //  This is called from our configured binds
        //  to check if the elements are within view
        //  (Both top and bottom)
        this.checkElements = function()
        {
            //  Get the area currently being viewed by the
            //  user to determine if the element is in it
            var ViewportTop    = ScrollObject.scrollTop(),
                ViewportBottom = ViewportTop + WindowHeight;
            
            //  Iterate through each element to make sure we
            //  dont act on them all when one enters view
            $( Elements ).each( function() {
                //  This is the node we are currently focused on
                var Node = $( this );
                
                //  If it's already been brought in view and
                //  we don't want to repeat each time, then
                //  ignore this from now on.
                if ( Node.hasClass( Options.class ) && !Options.repeat )
                {
                    return;
                }
                
                //  Figure out where the element sits within our
                //  viewport so we can determine if it is within
                //  view for the user.
                var ElementTop    = Math.round( Node.offset().top ) + Options.offset,
                    ElementBottom = ElementTop + Node.height();
                
                //  If the top & bottom of the element are within 
                //  the current view of the user, then we need to
                //  add the class if opted, and send out the show
                //  function provided.
                if ( ( ElementTop < ViewportBottom ) && ( ElementBottom > ViewportTop ) )
                {
                    Node.addClass( Options.class );
                    Options.show( Node );
                }
                //  If it's not in view, already has been viewed,
                //  and we want to repeat the action each time,
                //  then make sure we remove the class to make it
                //  repeat
                else if ( Node.hasClass( Options.class ) && Options.repeat )
                {
                    Node.removeClass( Options.class );
                    Options.hide( Node );
                }
            });
        };
        
        //  Bind the events provided to the check elements
        //  function so they can trigger
        $( window ).bind( Options.binds , this.checkElements );
        
        //  If the window get's resized, we want to make sure
        //  we update our information to determine if it's
        //  in view of the user.
        $( window ).resize( function( e ) {
            WindowHeight = e.currentTarget.innerHeight;
        });
        
        return this;
    };
}( jQuery ) );