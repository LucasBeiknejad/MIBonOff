import { TuyaContext  } from '@tuya/tuya-connector-nodejs';

let on = true

const context = new TuyaContext({
  baseUrl: 'https://openapi.tuyaeu.com',
  accessKey: 'kjhsqngs3h4y8etwy8jt',
  secretKey: '10081f1482ec476290c4bf95f33e8ab7',
});

const device_id = 'bf8f7ee9806fbd01e8edr7'

command = (x) => await context.request({
  path: `/v2.0/cloud/thing/${device_id}/shadow/properties/issue`,
  method: 'POST',
  body: {properties: '{\"switch_1\":true}'}
});

async function switch() {
  command(on ? false : true)
  on = !on
  command(on ? false : true)

  setTimeout(switch, 600000)
}
