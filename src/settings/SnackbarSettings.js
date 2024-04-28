export const SnackbarSettings = {
  maxSnack: 1,
  className: 'custom-shadow-sm bg-gradient-to-r from-violet-600 to-indigo-600',
  style: {
    borderRadius: '3px',
    border: '1px solid rgba(0, 0, 0, .1)',
    boxShadow: '0 4px 30px rgba(0, 0, 0, .1)',
    fontSize: '1.0625em', // 17px
    color: 'white',
    textAlign: 'right',
    padding: '0.75em',
  },
  preventDuplicate: true,
  anchorOrigin: {
    vertical: 'bottom',
    horizontal: 'right'
  },
}