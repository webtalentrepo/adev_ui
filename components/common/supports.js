export const filereader = !!(window.File && window.FileList && window.FileReader)

export const canvas2d = !!window.CanvasRenderingContext2D;

export const fileinput = (() => {
  if (navigator.userAgent.match(/(Android (1.0|1.1|1.5|1.6|2.0|2.1))|(Windows Phone (OS 7|8.0))|(XBLWP)|(ZuneWP)|(w(eb)?OSBrowser)|(webOS)|(Kindle\/(1.0|2.0|2.5|3.0))/)) {
    return false
  }
  const elem = document.createElement('input');
  elem.type = 'file';
  return !elem.disabled;
})()

export const draganddrop = (() => {
  const div = document.createElement('div')
  return (('draggable' in div) || ('ondragstart' in div && 'ondrop' in div)) && !('ontouchstart' in window || navigator.msMaxTouchPoints)
})()
