const root = document.documentElement
const viewportResize = () => {
  const width = `${window.innerWidth}`
  const height = `${window.innerHeight}`
  root.style.setProperty('--viewportWidth', `${width}px`)
  root.style.setProperty('--viewportHeight', `${height}px`)
}
viewportResize();
window.addEventListener('resize', viewportResize);

// SP用の縦リサイズ対応のHEIGHT
let spWidth = window.innerWidth
let spHeight = window.innerHeight
root.style.setProperty('--viewportSpHeight', `${spHeight}px`)

window.addEventListener('resize', () => {
  if (spWidth !== window.innerWidth) {
    spWidth = window.innerWidth
    spHeight = window.innerHeight
    root.style.setProperty('--viewportSpHeight', `${spHeight}px`)
  }
})
window.addEventListener('orientationchange', () => {
  setTimeout(viewportResize, 100)
})