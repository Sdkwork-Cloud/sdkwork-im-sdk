use crate::ImSdkContext;
use sdkwork_im_sdk_generated::{InboxResponse, SdkworkError};

#[derive(Clone)]
pub struct ImInboxModule {
  context: ImSdkContext,
}

impl ImInboxModule {
  pub(crate) fn new(context: ImSdkContext) -> Self {
    Self { context }
  }

  pub async fn get(&self) -> Result<InboxResponse, SdkworkError> {
    self.context.transport_client().inbox().get_inbox().await
  }
}

