// success = boolean
const notifyOnCopy = (success, value) => {

  const notificationArea = document.getElementById('toasts')
  const notificationDuration = 5000
  const animationDuration = 350

  const notifictation = document.createElement('div')
        notifictation.classList.add('toast')
        notifictation.classList.add('clipboard-notification')

  let message, color

  message = `Copied ${value} to your clipboard.`
  color = 'green'

  if (!success) {
    message = `Couldn't copy ${value} to your clipboard.`
    color = 'red'
  }

  notifictation.innerText = message
  notifictation.setAttribute('style', `--status-color: var(--${color});`)

  notificationArea.appendChild(notifictation)
  setTimeout(() => notifictation.classList.add('visible'), 1)
  setTimeout(() => notifictation.classList.remove('visible'), notificationDuration - animationDuration)
  setTimeout(() => notifictation.remove(), notificationDuration)

}



const copyToClipboard = (value) => {

  if (!navigator.clipboard) {
    copyToClipboardFallback(value)
    return
  }

  try {
    navigator.clipboard.writeText(value)
    .then(() => notifyOnCopy(true, value))
  }
  catch {
    notifyOnCopy(false, value)
  }

}
