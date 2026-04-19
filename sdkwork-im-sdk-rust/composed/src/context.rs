use sdkwork_im_sdk_generated::{ImTransportClient, SdkworkConfig, SdkworkError};

#[derive(Clone)]
pub struct ImSdkContext {
  transport_client: ImTransportClient,
}

impl ImSdkContext {
  pub fn new(transport_client: ImTransportClient) -> Self {
    Self { transport_client }
  }

  pub fn new_with_base_url(base_url: impl Into<String>) -> Result<Self, SdkworkError> {
    let transport_client = ImTransportClient::new(SdkworkConfig::new(base_url))?;
    Ok(Self::new(transport_client))
  }

  pub fn transport_client(&self) -> &ImTransportClient {
    &self.transport_client
  }

  pub fn set_auth_token(&self, token: impl Into<String>) -> &Self {
    self.transport_client.set_auth_token(token);
    self
  }
}

