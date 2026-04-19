use crate::ImSdkContext;
use sdkwork_im_sdk_generated::{PresenceDeviceRequest, PresenceSnapshotView, SdkworkError};

#[derive(Clone)]
pub struct ImPresenceModule {
  context: ImSdkContext,
}

impl ImPresenceModule {
  pub(crate) fn new(context: ImSdkContext) -> Self {
    Self { context }
  }

  pub async fn heartbeat(
    &self,
    body: PresenceDeviceRequest,
  ) -> Result<PresenceSnapshotView, SdkworkError> {
    self.context.transport_client().presence().heartbeat(&body).await
  }

  pub async fn me(&self) -> Result<PresenceSnapshotView, SdkworkError> {
    self.context.transport_client().presence().get_presence_me().await
  }
}

