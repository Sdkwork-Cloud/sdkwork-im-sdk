use crate::{ImSdkContext, QueryParams};
use sdkwork_im_sdk_generated::{
  AckRealtimeEventsRequest,
  RealtimeAckState,
  RealtimeEventWindow,
  RealtimeSubscriptionSnapshot,
  SdkworkError,
  SyncRealtimeSubscriptionsRequest,
};

#[derive(Clone)]
pub struct ImRealtimeModule {
  context: ImSdkContext,
}

impl ImRealtimeModule {
  pub(crate) fn new(context: ImSdkContext) -> Self {
    Self { context }
  }

  pub async fn sync_subscriptions(
    &self,
    body: SyncRealtimeSubscriptionsRequest,
  ) -> Result<RealtimeSubscriptionSnapshot, SdkworkError> {
    self
      .context
      .transport_client()
      .realtime()
      .sync_realtime_subscriptions(&body)
      .await
  }

  pub async fn list_events(
    &self,
    params: Option<&QueryParams>,
  ) -> Result<RealtimeEventWindow, SdkworkError> {
    self.context.transport_client().realtime().list_realtime_events(params).await
  }

  pub async fn ack_events(
    &self,
    body: AckRealtimeEventsRequest,
  ) -> Result<RealtimeAckState, SdkworkError> {
    self.context.transport_client().realtime().ack_realtime_events(&body).await
  }
}

