using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Backend.Http;
using Backend.Models;

namespace Backend.Api
{
    public class UsersApi
    {
        private readonly HttpClient _client;

        public UsersApi(HttpClient client)
        {
            _client = client;
        }

        /// <summary>
        /// 获取当前用户信息
        /// </summary>
        public async Task UserControllerGetCurrentAsync()
        {
            await _client.GetAsync<object>(ApiPaths.BackendPath("/users/me"));
        }

        /// <summary>
        /// 获取用户详情
        /// </summary>
        public async Task UserControllerGetByIdAsync(string id)
        {
            await _client.GetAsync<object>(ApiPaths.BackendPath($"/users/{id}"));
        }

        /// <summary>
        /// 更新用户资料
        /// </summary>
        public async Task UserControllerUpdateAsync(string id, UpdateProfileDto body)
        {
            await _client.PutAsync<object>(ApiPaths.BackendPath($"/users/{id}"), body);
        }

        /// <summary>
        /// 搜索用户
        /// </summary>
        public async Task UserControllerSearchAsync(Dictionary<string, object>? query = null)
        {
            await _client.GetAsync<object>(ApiPaths.BackendPath("/users"), query);
        }
    }
}
