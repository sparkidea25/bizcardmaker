/* fileread directive
 * for uploading files
 */

app.directive('drag', ['$document', function ($document) {
	'use strict';

	return {
		link: function (scope, element) {
			var startX = 0, startY = 0, x = 0, y = 0;
      var minX = 0, maxX = 0, minY = 0, maxY = 0;

      var startX = 0, startY = 0, x = 0, y = 0;
      var minX = 0, maxX = 0, minY = 0, maxY = 0;

      var dragSize, containerSize, dragStartY, dragStartX;

      var drag = element.find('.drag-handle');
      var container = $('.card-content');
      
      var grid = 10;

      setTimeout( function () {
        dragSize = getElementSize(drag);
        containerSize = getElementSize(container);
        setContainment();
        
      }, 1000);

      var setContainment = function (argument) {
                
        dragStartY = drag.offset().top;
        dragStartX = drag.offset().left;

        minY = dragStartY - container.offset().top;
        minY = 0 - maxGrid(minY);

        maxY = (container.offset().top + containerSize.height) - dragStartY - dragSize.height;
        maxY = maxGrid(maxY);

        minX = dragStartX - container.offset().left;
        minX =  0 - maxGrid(minX);

        maxX = (container.offset().left + containerSize.width) - dragStartX - dragSize.width;
        maxX = maxGrid(maxX);
      }

      var getElementSize = function (elem) {
        return {
          width: elem.width(),
          height: elem.height()
        }
      }

      var restrictGrid = function (val) {
        return (val % grid == 0) ? val : val - val%grid; 
      }

      var maxGrid = function (val) {
        return Math.floor(val/grid) * grid;
      };

      drag.on('mousedown', function (e) {

        startX = e.pageX - x;
        startY = e.pageY - y;

        $document.on('mousemove', mousemove);
        $document.on('mouseup', mouseup);
      });

      var mousemove = function (e) {

        x = e.pageX - startX;
        y = e.pageY - startY;
        
        x = restrictGrid(x);
        y = restrictGrid(y);

        if (x < minX) {
          x = minX;
        }
        if (x > maxX) {
          x = maxX;
        }
        if (y < minY) {
          y = minY;
        }
        if (y > maxY) {
          y = maxY;
        }
        
        element.css('webkitTransform', 'translate(' + x + 'px ,' + y + 'px)');  
        
      };

      var mouseup = function (e) {
        $document.off('mousemove', mousemove);
        $document.off('mouseup', mouseup);
      }

		}
	};
}]);