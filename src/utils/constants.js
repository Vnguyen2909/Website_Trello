let apiRoot = ''

if(process.env.BUILD_MODE === 'dev') {
  apiRoot = 'http://localhost:8017'
}

if(process.env.BUILD_MODE === 'production') {
  apiRoot = 'http://localhost:8000'
}


export const API_ROOT = apiRoot

export const DEFAULT_PAGE = 1
export const DEFAULT_ITEM_PER_PAGE = 12

export const BOARD_INVITATION_STATUS = {
  PENDING: "PENDING",
  ACCEPTED: "ACCEPTED",
  REJECTED: "REJECTED",
};