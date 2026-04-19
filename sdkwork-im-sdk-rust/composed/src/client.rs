use crate::{
  ImConversationsModule,
  ImDevicesModule,
  ImInboxModule,
  ImMediaModule,
  ImMessagesModule,
  ImPresenceModule,
  ImRealtimeModule,
  ImRtcModule,
  ImSdkContext,
  ImSessionModule,
  ImStreamsModule,
};
use sdkwork_im_sdk_generated::{ImTransportClient, SdkworkConfig, SdkworkError};

#[derive(Clone)]
pub struct ImSdkClient {
  context: ImSdkContext,
}

impl ImSdkClient {
  pub fn new(transport_client: ImTransportClient) -> Self {
    Self {
      context: ImSdkContext::new(transport_client),
    }
  }

  pub fn new_with_base_url(base_url: impl Into<String>) -> Result<Self, SdkworkError> {
    let transport_client = ImTransportClient::new(SdkworkConfig::new(base_url))?;
    Ok(Self::new(transport_client))
  }

  pub fn context(&self) -> &ImSdkContext {
    &self.context
  }

  pub fn transport_client(&self) -> &ImTransportClient {
    self.context.transport_client()
  }

  pub fn session(&self) -> ImSessionModule {
    ImSessionModule::new(self.context.clone())
  }

  pub fn presence(&self) -> ImPresenceModule {
    ImPresenceModule::new(self.context.clone())
  }

  pub fn realtime(&self) -> ImRealtimeModule {
    ImRealtimeModule::new(self.context.clone())
  }

  pub fn devices(&self) -> ImDevicesModule {
    ImDevicesModule::new(self.context.clone())
  }

  pub fn inbox(&self) -> ImInboxModule {
    ImInboxModule::new(self.context.clone())
  }

  pub fn conversations(&self) -> ImConversationsModule {
    ImConversationsModule::new(self.context.clone())
  }

  pub fn messages(&self) -> ImMessagesModule {
    ImMessagesModule::new(self.context.clone())
  }

  pub fn media(&self) -> ImMediaModule {
    ImMediaModule::new(self.context.clone())
  }

  pub fn streams(&self) -> ImStreamsModule {
    ImStreamsModule::new(self.context.clone())
  }

  pub fn rtc(&self) -> ImRtcModule {
    ImRtcModule::new(self.context.clone())
  }

  pub fn set_auth_token(&self, token: impl Into<String>) -> &Self {
    self.context.set_auth_token(token);
    self
  }
}

