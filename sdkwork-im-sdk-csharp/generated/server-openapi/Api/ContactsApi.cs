using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Backend.Http;
using Backend.Models;

namespace Backend.Api
{
    public class ContactsApi
    {
        private readonly HttpClient _client;

        public ContactsApi(HttpClient client)
        {
            _client = client;
        }

        /// <summary>
        /// 创建联系人
        /// </summary>
        public async Task<Contact?> ContactControllerCreateAsync(ContactControllerCreateRequest body)
        {
            return await _client.PostAsync<Contact>(ApiPaths.BackendPath("/contacts"), body);
        }

        /// <summary>
        /// 获取用户的联系人列表
        /// </summary>
        public async Task<ContactControllerGetByUserIdResponse?> ContactControllerGetByUserIdAsync(Dictionary<string, object>? query = null)
        {
            return await _client.GetAsync<ContactControllerGetByUserIdResponse>(ApiPaths.BackendPath("/contacts"), query);
        }

        /// <summary>
        /// 获取联系人详情
        /// </summary>
        public async Task<Contact?> ContactControllerGetByIdAsync(string id)
        {
            return await _client.GetAsync<Contact>(ApiPaths.BackendPath($"/contacts/{id}"));
        }

        /// <summary>
        /// 更新联系人
        /// </summary>
        public async Task<Contact?> ContactControllerUpdateAsync(string id, ContactControllerUpdateRequest body)
        {
            return await _client.PutAsync<Contact>(ApiPaths.BackendPath($"/contacts/{id}"), body);
        }

        /// <summary>
        /// 删除联系人
        /// </summary>
        public async Task ContactControllerDeleteAsync(string id)
        {
            await _client.DeleteAsync<object>(ApiPaths.BackendPath($"/contacts/{id}"));
        }

        /// <summary>
        /// 批量删除联系人
        /// </summary>
        public async Task ContactControllerBatchDeleteAsync()
        {
            await _client.DeleteAsync<object>(ApiPaths.BackendPath("/contacts/batch"));
        }

        /// <summary>
        /// 设置/取消收藏
        /// </summary>
        public async Task ContactControllerSetFavoriteAsync(string id, ContactControllerSetFavoriteRequest body)
        {
            await _client.PutAsync<object>(ApiPaths.BackendPath($"/contacts/{id}/favorite"), body);
        }

        /// <summary>
        /// 设置备注
        /// </summary>
        public async Task ContactControllerSetRemarkAsync(string id, ContactControllerSetRemarkRequest body)
        {
            await _client.PutAsync<object>(ApiPaths.BackendPath($"/contacts/{id}/remark"), body);
        }

        /// <summary>
        /// 添加标签
        /// </summary>
        public async Task ContactControllerAddTagAsync(string id, ContactControllerAddTagRequest body)
        {
            await _client.PostAsync<object>(ApiPaths.BackendPath($"/contacts/{id}/tags"), body);
        }

        /// <summary>
        /// 移除标签
        /// </summary>
        public async Task ContactControllerRemoveTagAsync(string id, string tag)
        {
            await _client.DeleteAsync<object>(ApiPaths.BackendPath($"/contacts/{id}/tags/{tag}"));
        }

        /// <summary>
        /// 搜索联系人
        /// </summary>
        public async Task<ContactControllerSearchResponse?> ContactControllerSearchAsync(string userId, Dictionary<string, object>? query = null)
        {
            return await _client.GetAsync<ContactControllerSearchResponse>(ApiPaths.BackendPath($"/contacts/search/{userId}"), query);
        }

        /// <summary>
        /// 获取联系人统计
        /// </summary>
        public async Task ContactControllerGetStatsAsync(string userId)
        {
            await _client.GetAsync<object>(ApiPaths.BackendPath($"/contacts/stats/{userId}"));
        }
    }
}
