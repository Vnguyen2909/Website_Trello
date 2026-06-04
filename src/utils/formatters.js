export const formatcapitalizeFirstLetterter = (val) => {
    if(!val) return ''
    return `${val.charAt(0).toUpperCase()}${val.slice(1)}`
}

export const generatePlaceholderCard = (column) => {
    return {
        _id: `${column._id}-placeholder-card`,
        boardId: column.boardId,
        columnId: column._id,
        FE_PlaceholderCard: true
    }
}

// Ky thuat dung css pointer-event den chan Spam Click tai bat ky cho co hanh dong click goi API
// Tan dung Axios Interceptors va CSS Pointer-event xu ly toan bo du an
export const interceptorLoadingElements = (calling) => {
  // DOM lay toan bo phan tu tren Page co classname'interceptor-loading'
  const elements = document.querySelectorAll('.interceptor-loading')
  for (let i = 0; i < elements.length; i++) {
    if (calling) {
      // Neu trong thoi gian cho goi API (calling === true) se lam mo phan tu va chan Click bang CSS Pointer-events
      elements[i].style.opacity = '0.5'
      elements[i].style.pointerEvents = 'none'
    } else {
      // Nguoc lai tra ve nhu ban dau
      elements[i].style.opacity = 'initial'
      elements[i].style.pointerEvents = 'initial'
    }
  }
}
