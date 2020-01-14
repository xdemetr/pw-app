export default interface ITokenJWT {
  id: number,
  username: string,
  email: string,
  exp: number,
  iat: number,
  balance: number
}
