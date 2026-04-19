use crate::ImSdkContext;
use sdkwork_im_sdk_generated::{
  PresenceDeviceRequest,
  PresenceSnapshotView,
  ResumeSessionRequest,
  SdkworkError,
  SessionResumeView,
};

#[derive(Clone)]
pub struct ImSessionModule {
  context: ImSdkContext,
}

impl ImSessionModule {
  pub(crate) fn new(context: ImSdkContext) -> Self {
    Self { context }
  }

  pub async fn resume(&self, body: ResumeSessionRequest) -> Result<SessionResumeView, SdkworkError> {
    self.context.transport_client().session().resume(&body).await
  }

  pub async fn disconnect(
    &self,
    body: PresenceDeviceRequest,
  ) -> Result<PresenceSnapshotView, SdkworkError> {
    self.context.transport_client().session().disconnect(&body).await
  }
}

