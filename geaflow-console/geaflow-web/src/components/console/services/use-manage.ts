/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

import request from "./request";
import { HTTP_SERVICE_URL } from "../../constants";
import { message } from "antd";
import $i18n from "@/components/i18n";

/**
 * 获取用户
 */
export const getUsers = async (params: any) => {
  const response = await request(`${HTTP_SERVICE_URL}/api/users`, {
    method: "get",
    credentials: "include",
    withCredentials: true,
    params: params,
  });

  if (!response?.success) {
    message.error(
      $i18n.get(
        {
          id: "openpiece-geaflow.geaflow.services.use-manage.QueryFailedResponsemessage",
          dm: "查询失败: {responseMessage}",
        },
        { responseMessage: response?.message }
      )
    );
    return [];
  }
  return response?.data?.list;
};

/**
 * 新增用户
 */
export const getCreateUsers = async (params: any) => {
  const response = await request(`${HTTP_SERVICE_URL}/api/users`, {
    method: "post",
    credentials: "include",
    withCredentials: true,
    params: params,
  });

  if (!response?.success) {
    message.error(
      $i18n.get(
        {
          id: "openpiece-geaflow.geaflow.services.use-manage.FailedToAddResponsemessage",
          dm: "新增失败: {responseMessage}",
        },
        { responseMessage: response?.message }
      )
    );
    return [];
  }
  return response;
};

/**
 * 删除用户
 */
export const deleteUser = async (userId: string) => {
  const response = await request(`${HTTP_SERVICE_URL}/api/users/${userId}`, {
    method: "delete",
  });

  if (!response?.success) {
    message.error(
      $i18n.get(
        {
          id: "openpiece-geaflow.geaflow.services.function-manage.FailedToDeleteResponsemessage",
          dm: "删除失败：{responseMessage}",
        },
        { responseMessage: response?.message }
      )
    );
    return [];
  }
  return response;
};

/**
 * 更新用户
 */
export const updateUser = async (userId: string, params: any) => {
  const response = await request(`${HTTP_SERVICE_URL}/api/users/${userId}`, {
    method: "put",
    data: params,
  });

  if (!response?.success) {
    message.error(response?.message);
    return [];
  }
  return response;
};
