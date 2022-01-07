function goToElement(id) {
      element = document.getElementById(id);
      element.scrollIntoView({ behavior: 'smooth'});
      console.log('go');
}

function test()  
{
      console.log('test is ok for paageFunction.js');
}

//#region ============ HTML FILE INCLUDER
function includeHTML() {
      var z, i, elmnt, file, xhttp;
      /* Loop through a collection of all HTML elements: */
      z = document.getElementsByTagName("*");
      for (i = 0; i < z.length; i++) {
        elmnt = z[i];
        /*search for elements with a certain atrribute:*/
        file = elmnt.getAttribute("w3-include-html");
        if (file) {
          /* Make an HTTP request using the attribute value as the file name: */
          xhttp = new XMLHttpRequest();
          xhttp.onreadystatechange = function() {
            if (this.readyState == 4) {
              if (this.status == 200) {elmnt.innerHTML = this.responseText;}
              if (this.status == 404) {elmnt.innerHTML = "Page not found.";}
              /* Remove the attribute, and call this function once more: */
              elmnt.removeAttribute("w3-include-html");
              includeHTML();
            }
          }
          xhttp.open("GET", file, true);
          xhttp.send();
          /* Exit the function: */
          return;
        }
      }
    }

//#endregion


    //#region ====================== TEXT FIT ======================

    (function(){

      var addEvent = function (el, type, fn) {
        if (el.addEventListener)
          el.addEventListener(type, fn, false);
        else
          el.attachEvent('on'+type, fn);
      };
      
      var extend = function(obj,ext){
        for(var key in ext)
          if(ext.hasOwnProperty(key))
            obj[key] = ext[key];
        return obj;
      };
    
      window.fitText = function (el, kompressor, options) {
    
        var settings = extend({
          'minFontSize' : -1/0,
          'maxFontSize' : 1/0
        },options);
    
        var fit = function (el) {
          var compressor = kompressor || 1;
    
          var resizer = function () {
            el.style.fontSize = Math.max(Math.min(el.clientWidth / (compressor*10), parseFloat(settings.maxFontSize)), parseFloat(settings.minFontSize)) + 'px';
          };
    
          // Call once to set.
          resizer();
    
          // Bind events
          // If you have any js library which support Events, replace this part
          // and remove addEvent function (or use original jQuery version)
          addEvent(window, 'resize', resizer);
          addEvent(window, 'orientationchange', resizer);
        };
    
        if (el.length)
          for(var i=0; i<el.length; i++)
            fit(el[i]);
        else
          fit(el);
    
        // return set of elements
        return el;
      };
    })();


    //#endregion