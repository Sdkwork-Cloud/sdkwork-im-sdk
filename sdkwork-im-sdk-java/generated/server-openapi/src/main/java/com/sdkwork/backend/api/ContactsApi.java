package com.sdkwork.backend.api;

import com.sdkwork.backend.http.HttpClient;
import com.sdkwork.backend.model.*;
import java.util.List;
import java.util.Map;

public class ContactsApi {
    private final HttpClient client;
    
    public ContactsApi(HttpClient client) {
        this.client = client;
    }

    /** 创建联系人 */
    public Contact contactControllerCreate(ContactControllerCreateRequest body) throws Exception {
        return (Contact) client.post(ApiPaths.backendPath("/contacts"), body);
    }

    /** 获取用户的联系人列表 */
    public ContactControllerGetByUserIdResponse contactControllerGetByUserId(Map<String, Object> params) throws Exception {
        return (ContactControllerGetByUserIdResponse) client.get(ApiPaths.backendPath("/contacts"), params);
    }

    /** 获取联系人详情 */
    public Contact contactControllerGetById(String id) throws Exception {
        return (Contact) client.get(ApiPaths.backendPath("/contacts/" + id + ""));
    }

    /** 更新联系人 */
    public Contact contactControllerUpdate(String id, ContactControllerUpdateRequest body) throws Exception {
        return (Contact) client.put(ApiPaths.backendPath("/contacts/" + id + ""), body);
    }

    /** 删除联系人 */
    public Void contactControllerDelete(String id) throws Exception {
        client.delete(ApiPaths.backendPath("/contacts/" + id + ""));
        return null;
    }

    /** 批量删除联系人 */
    public Void contactControllerBatchDelete() throws Exception {
        client.delete(ApiPaths.backendPath("/contacts/batch"));
        return null;
    }

    /** 设置/取消收藏 */
    public Void contactControllerSetFavorite(String id, ContactControllerSetFavoriteRequest body) throws Exception {
        client.put(ApiPaths.backendPath("/contacts/" + id + "/favorite"), body);
        return null;
    }

    /** 设置备注 */
    public Void contactControllerSetRemark(String id, ContactControllerSetRemarkRequest body) throws Exception {
        client.put(ApiPaths.backendPath("/contacts/" + id + "/remark"), body);
        return null;
    }

    /** 添加标签 */
    public Void contactControllerAddTag(String id, ContactControllerAddTagRequest body) throws Exception {
        client.post(ApiPaths.backendPath("/contacts/" + id + "/tags"), body);
        return null;
    }

    /** 移除标签 */
    public Void contactControllerRemoveTag(String id, String tag) throws Exception {
        client.delete(ApiPaths.backendPath("/contacts/" + id + "/tags/" + tag + ""));
        return null;
    }

    /** 搜索联系人 */
    public ContactControllerSearchResponse contactControllerSearch(String userId, Map<String, Object> params) throws Exception {
        return (ContactControllerSearchResponse) client.get(ApiPaths.backendPath("/contacts/search/" + userId + ""), params);
    }

    /** 获取联系人统计 */
    public Void contactControllerGetStats(String userId) throws Exception {
        client.get(ApiPaths.backendPath("/contacts/stats/" + userId + ""));
        return null;
    }
}
