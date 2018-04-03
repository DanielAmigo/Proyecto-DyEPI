import { Directive, ElementRef, Renderer, Input } from '@angular/core';
import { FabButton } from 'ionic-angular';

/**
 * Generated class for the AutohideDirective directive.
 *
 * See https://angular.io/api/core/Directive for more info on Angular
 * Directives.
 */
@Directive({
  selector: '[autohide]', // Attribute selector
  host: {
    '(ionScroll)': 'onContentScroll($event)'
  }
})

export class AutohideDirective {

  fabToHide;
  oldScrollTop: number = 0;

  constructor(private renderer: Renderer, private element: ElementRef) {
    console.log('Hello AutohideDirective Directive');
  }

  ngOnInit() {
    this.fabToHide = this.element.nativeElement.querySelector("#fab");
    this.renderer.setElementStyle(this.fabToHide, "webkitTransition", "transform 500ms, opacity 500ms"); // Tiempo para aparecer al hacer scroll y aparece en tamaño tambien
  }

  onContentScroll(e) {      // NO FUNCIONA ESTA MIERDA
    if (e.scrollTop - this.oldScrollTop > 10) {
      console.log("DOWN " + e);
     this.renderer.setElementStyle(this.fabToHide, "opacity", "0");
     this.renderer.setElementStyle(this.fabToHide, "webkitTransform", "scale3d(.1, .1, .1");
    } else if (e.scrollTop - this.oldScrollTop < 0) {
      console.log("UP " + e);
     this.renderer.setElementStyle(this.fabToHide, "opacity", "1");
     this.renderer.setElementStyle(this.fabToHide, "webkitTransform", "scale3d(1, 1, 1");
    }

    this.oldScrollTop = e.scrollTop;
  }
}
