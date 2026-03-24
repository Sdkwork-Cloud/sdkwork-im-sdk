import Foundation

public class ContactsApi {
    private let client: HttpClient
    
    public init(client: HttpClient) {
        self.client = client
    }

    /// 创建联系人
    public func contactControllerCreate(body: ContactControllerCreateRequest) async throws -> Contact? {
        let response = try await client.post(ApiPaths.backendPath("/contacts"), body: body)
        return response as? Contact
    }

    /// 获取用户的联系人列表
    public func contactControllerGetByUserId(params: [String: Any]? = nil) async throws -> ContactControllerGetByUserIdResponse? {
        let response = try await client.get(ApiPaths.backendPath("/contacts"), params: params)
        return response as? ContactControllerGetByUserIdResponse
    }

    /// 获取联系人详情
    public func contactControllerGetById(id: String) async throws -> Contact? {
        let response = try await client.get(ApiPaths.backendPath("/contacts/\(id)"))
        return response as? Contact
    }

    /// 更新联系人
    public func contactControllerUpdate(id: String, body: ContactControllerUpdateRequest) async throws -> Contact? {
        let response = try await client.put(ApiPaths.backendPath("/contacts/\(id)"), body: body)
        return response as? Contact
    }

    /// 删除联系人
    public func contactControllerDelete(id: String) async throws -> Void {
        _ = try await client.delete(ApiPaths.backendPath("/contacts/\(id)"))
    }

    /// 批量删除联系人
    public func contactControllerBatchDelete() async throws -> Void {
        _ = try await client.delete(ApiPaths.backendPath("/contacts/batch"))
    }

    /// 设置/取消收藏
    public func contactControllerSetFavorite(id: String, body: ContactControllerSetFavoriteRequest) async throws -> Void {
        _ = try await client.put(ApiPaths.backendPath("/contacts/\(id)/favorite"), body: body)
    }

    /// 设置备注
    public func contactControllerSetRemark(id: String, body: ContactControllerSetRemarkRequest) async throws -> Void {
        _ = try await client.put(ApiPaths.backendPath("/contacts/\(id)/remark"), body: body)
    }

    /// 添加标签
    public func contactControllerAddTag(id: String, body: ContactControllerAddTagRequest) async throws -> Void {
        _ = try await client.post(ApiPaths.backendPath("/contacts/\(id)/tags"), body: body)
    }

    /// 移除标签
    public func contactControllerRemoveTag(id: String, tag: String) async throws -> Void {
        _ = try await client.delete(ApiPaths.backendPath("/contacts/\(id)/tags/\(tag)"))
    }

    /// 搜索联系人
    public func contactControllerSearch(userId: String, params: [String: Any]? = nil) async throws -> ContactControllerSearchResponse? {
        let response = try await client.get(ApiPaths.backendPath("/contacts/search/\(userId)"), params: params)
        return response as? ContactControllerSearchResponse
    }

    /// 获取联系人统计
    public func contactControllerGetStats(userId: String) async throws -> Void {
        _ = try await client.get(ApiPaths.backendPath("/contacts/stats/\(userId)"))
    }
}
