# declarative-interactions

Working demo here: http://codepen.io/MadeByMike/pen/ef973bcd7a0cf11ed60382fecf97760a?editors=101

For a while I've been thinking about developing a standard way to define simple interactions on web elements. Rather than writing the same scripts again and again (with slight differences) to solve the same interaction problems or plonking in a bunch of libraries to do the same thing. I think the interaction could be described with HTML data attributes and a very small library could then apply the interaction.

An example might be to fade in a message when a link is clicked (and hide the link). The interaction could be defined as follows:
```
<a id="hide-me" href="javascript:;" data-show="#show-this" data-hide="#hide-me">Show me something</a>
   
<div id="show-this" data-method="fade">
  <p>Wow! Where did I come form?</p>
</div>
```
The example above is pretty simple but the mark-up could get more complex to define an 'accordion' type interaction. This would require a method for grouping elements and for this I'm suggesting a data-group attribute.
``` 
<a href="javascript:;" data-show="#pane1">Item 1</a>
   
<div id="pane1" data-method="slide" data-group="accordion">
  <p>Hello Tab 1</p>
</div>

<a href="javascript:;" data-show="#pane2">Item 2</a>
   
<div id="pane2" data-method="slide" data-group="accordion">
  <p>Hello Tab 2</p>
</div>
 ```  
I need to define the full range of data attributes (write a spec) and there are multiple ways this could be done. This is where I hope group input and testing will help.

Here is my draft:

Attributes on the initiating element:
```
data-toggle="%selector%"
data-hide="%selector%"
data-show="%selector%"
data-add-class="%class-name%"
data-remove-class="%class-name%"
data-toggle-class="%class-name%"
data-trigger="%trigger%"
```
Attributes on the target element:
```
data-group="%group-name%"
data-method="%method%"
data-delay="%delay%"
data-duration="%duration%"
```
Definitions:
```
%trigger% - "click", "dblclick", "hover", "mouseover", "mouseleave"
%method% - "fade", "slide", "show", "hide"
%selector% - query selector
%group-name% - string
%class-name% - string
```
I workshoped some of these ideas at a code night with some friends but this thinking ultimately failed to work for all cases when tasked with producing simple patterns such as accordians, tooltips, modals and other common patterns. We tried other methods such as data-target=".target" data-action="fade". Nothing we could think of worked in all cases. 


I'll post code samples shortly.

Shortly:

http://codepen.io/MadeByMike/pen/ef973bcd7a0cf11ed60382fecf97760a?editors=101
http://codepen.io/MadeByMike/pen/f44f17470c77c4d9b695772da83daccf


