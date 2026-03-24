import 'base_http_client.dart';
import 'sdk_config.dart';

class HttpClient extends BaseHttpClient {
  HttpClient({
    required SdkConfig config,
  }) : super(config);
}
