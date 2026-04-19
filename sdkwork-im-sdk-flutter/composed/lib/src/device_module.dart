import 'package:im_sdk_generated/im_sdk_generated.dart';

import 'context.dart';
import 'types.dart';

class ImDevicesModule {
  final ImSdkContext context;

  ImDevicesModule(this.context);

  Future<RegisteredDeviceView?> register(RegisterDeviceRequest body) {
    return context.transportClient.device.register(body);
  }

  Future<DeviceSyncFeedResponse?> getSyncFeed(
    String deviceId, [
    ImQueryParams? params,
  ]) {
    return context.transportClient.device.getDeviceSyncFeed(deviceId, params);
  }
}
