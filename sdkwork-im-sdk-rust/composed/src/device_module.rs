use crate::{ImSdkContext, QueryParams};
use sdkwork_im_sdk_generated::{
  DeviceSyncFeedResponse,
  RegisterDeviceRequest,
  RegisteredDeviceView,
  SdkworkError,
};

#[derive(Clone)]
pub struct ImDevicesModule {
  context: ImSdkContext,
}

impl ImDevicesModule {
  pub(crate) fn new(context: ImSdkContext) -> Self {
    Self { context }
  }

  pub async fn register(
    &self,
    body: RegisterDeviceRequest,
  ) -> Result<RegisteredDeviceView, SdkworkError> {
    self.context.transport_client().device().register(&body).await
  }

  pub async fn sync_feed(
    &self,
    device_id: impl AsRef<str>,
    params: Option<&QueryParams>,
  ) -> Result<DeviceSyncFeedResponse, SdkworkError> {
    let device_id = device_id.as_ref().to_string();
    self
      .context
      .transport_client()
      .device()
      .get_device_sync_feed(&device_id, params)
      .await
  }
}

