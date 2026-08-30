const ua = typeof navigator !== 'undefined' ? navigator.userAgent.toLowerCase() : ''
const android = ua.includes('android')
const windows = ua.includes('windows nt')
const safari = ua.includes('safari') && !ua.includes('chrome') && !ua.includes('android')
const ipad = ua.includes('ipad') || (ua.includes('macintosh') && typeof document !== 'undefined' && 'ontouchend' in document)

const checkDevice = {
  isAndroid: android,
  isWindows: windows,
  isSafari: safari,
  isIpad: ipad,
}


export default (context, inject) => {
  inject('checkDevice', checkDevice)
}
