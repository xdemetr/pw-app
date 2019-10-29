export default interface ITokenJWT {
  id: number,
  username: string,
  jwtToken: string,
  exp: number,
  iat: number,
  balance: number
}
