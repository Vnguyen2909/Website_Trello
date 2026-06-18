/* eslint-disable react-hooks/exhaustive-deps */
import { useCallback } from 'react'
import { debounce } from 'lodash'

export const useDebounceFn = (fnToDebounce, delay = 500) => {
  //Tra loi luon neu delay nhan vao khong phai number
  if (isNaN(delay)) {
    throw new Error('Delay value should be a number.')
  }
  //Tuong tu cung tra loi neu fnToDebounce khong phai la 1 function
  if (!fnToDebounce || (typeof fnToDebounce !== 'function')) {
    throw new Error('Debounce must have a function')
  }

  //Boc cai thu thi debounce tu lodash vao useCallback de tranh re-render nhieu lan, ma chi re-render khi fnToDebounce hoac delay thay doi
  return useCallback(debounce(fnToDebounce, delay), [fnToDebounce, delay])
}
