import MicroServiceProxy from '@app/common/micro.service.proxy';

const services = {
  Discord: MicroServiceProxy.microServiceQueue.DISCORD_SERVICE,
};

export function ReactionHandler(serviceName: string, cmd: string, data: any) {
  console.log(services[serviceName], cmd, data);
}
