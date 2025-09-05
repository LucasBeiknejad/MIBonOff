import { TuyaContext  } from '@tuya/tuya-connector-nodejs';
import 'dotenv/config'

const context = new TuyaContext({
  baseUrl: 'https://openapi.tuyaeu.com',
  accessKey: process.env.ACCESS_KEY,
  secretKey: process.env.ACCESS_SECRET
});

const device_id = 'bf8f7ee9806fbd01e8edr7'

const command = async(x) => {
  console.log('Setting power state: ', x)

  await context.request({
    path: `/v2.0/cloud/thing/${device_id}/shadow/properties/issue`,
    method: 'POST',
    body: {properties: `{\"switch_1\":${ x }}`}
  });

}

const cycles = 0

async function onOff() {
  command(false)

  console.log(cycles++, ' - Cycles ran')

  setTimeout(() => { command(true)}, 8 * 1000)

  setTimeout(() => { onOff() }, 10 * 60 * 1000)
}

onOff()
