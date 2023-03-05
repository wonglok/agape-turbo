export const AWSBackend = {
  development: {
    //
    rest: 'http://localhost:3333',
    ws: 'ws://localhost:3333',
  },
  staging: {
    rest: 'https://1fyh57enbl.execute-api.us-west-2.amazonaws.com',
    ws: 'wss://npux174kt1.execute-api.us-west-2.amazonaws.com/staging',
  },
  production: {
    rest: 'https://su4w18efdb.execute-api.us-west-2.amazonaws.com',
    ws: '	wss://3qiix3wdki.execute-api.us-west-2.amazonaws.com/production',
  },
}
