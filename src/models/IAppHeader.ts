export default interface IAppHeader {
  auth: {
    profile: {
      name?: string,
      balance?: number
    }
    isAuth?: boolean,
  },
  logoutUser: () => void
}
