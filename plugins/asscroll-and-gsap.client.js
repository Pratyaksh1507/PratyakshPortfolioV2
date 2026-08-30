import ASScroll from '@ashthornton/asscroll'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { CustomEase } from '../vendor/CustomEase'
import { Draggable } from '../vendor/Draggable'
import { InertiaPlugin } from '../vendor/InertiaPlugin'
gsap.registerPlugin(CustomEase, Draggable, InertiaPlugin, ScrollTrigger);

const EASING = {
  transform: CustomEase.create('transform', 'M0,0 C0.44,0.05 0.17,1 1,1'),
  transformReverse: CustomEase.create('transformReverse', 'M0,0 C0,0.852 0.87,0.542 1,1'),
  colorAndOpacity: CustomEase.create('colorAndOpacity', 'M0,0 C0.26,0.16 0.1,1 1,1 '),
}

const ua = typeof navigator !== 'undefined' ? navigator.userAgent.toLowerCase() : ''
const ios = ua.includes("iphone") || ua.includes("ipad") || ua.includes("ipod")
const pinType = ios ? 'fixed' : 'transform';

const fixSection = (trigger, deveice, height) => {
  return gsap.to(trigger, {
    ease: 'none',
    scrollTrigger: {
      pin: true,
      pinType: pinType,
      trigger: trigger,
      start: 'start end',
      end: () => `+=${height - window.innerHeight}px`,
      scrub: true,
      invalidateOnRefresh: true,
    },
  })
}

let asscrollInstance = null;
let initialized = false;

function getASScroll() {
  if (!asscrollInstance && typeof document !== 'undefined') {
    const container = document.querySelector('.asscroll-container');
    const scroll = document.querySelector('.asscroll');
    if (container && scroll) {
      asscrollInstance = new ASScroll({
        containerElement: container,
        touchScrollType: 'scrollTop',
        scrollElements: scroll,
        ease: 0.09,
        customScrollbar: false,
      });

      if (!initialized) {
        initialized = true;
        ScrollTrigger.defaults({
          scroller: asscrollInstance.containerElement
        });
        ScrollTrigger.scrollerProxy(asscrollInstance.containerElement, {
          scrollTop(value) {
            if (arguments.length) {
              asscrollInstance.currentPos = value;
              return;
            }
            return asscrollInstance.currentPos;
          },
          getBoundingClientRect() {
            return { top: 0, left: 0, width: window.innerWidth, height: window.innerHeight }
          },
        });

        ScrollTrigger.addEventListener("refresh", () => {
          if (asscrollInstance && asscrollInstance.resize) {
            asscrollInstance.resize();
          }
        });
      }
    }
  }
  return asscrollInstance;
}

const asscrollProxy = new Proxy({}, {
  get(target, prop) {
    const instance = getASScroll();
    if (instance) {
      const val = instance[prop];
      if (typeof val === 'function') {
        return val.bind(instance);
      }
      return val;
    }
    if (prop === 'containerElement') return null;
    if (prop === 'currentPos' || prop === 'targetPos') return 0;
    if (prop === 'resize') return () => {};
    if (prop === 'enable' || prop === 'disable') return () => {};
    if (prop === 'on' || prop === 'off') return () => {};
    return undefined;
  },
  set(target, prop, value) {
    const instance = getASScroll();
    if (instance) {
      instance[prop] = value;
      return true;
    }
    return true;
  }
});

export default (context, inject) => {
  inject('asscroll', asscrollProxy);
  inject('gsap', gsap);
  inject('ScrollTrigger', ScrollTrigger);
  inject('Draggable', Draggable);
  inject('EASING', EASING);
  inject('fixSection', fixSection);
}
